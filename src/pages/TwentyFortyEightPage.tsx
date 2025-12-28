"use client";
import React, { useEffect, useState } from "react";
import Grid from "@/components/twentyFortyEightComponents/Grid";
import {
   swipeLeft,
   swipeRight,
   swipeUp,
   swipeDown,
} from "@/utils/twentyFortyEightUtils/SwipeFunctions";
import cloneDeep from "lodash/cloneDeep";
import { useEvent } from "@/hooks/useEvent";
import Title from "@/components/twentyFortyEightComponents/Title";
import Menu from "@/components/twentyFortyEightComponents/Menu";
import WinOrLossModal from "@/components/twentyFortyEightComponents/WinOrLossModal";
import { checkIfGameOver } from "@/utils/twentyFortyEightUtils/GameUtils";
import { getEmptyGrid } from "@/utils/twentyFortyEightUtils/GridUtils";
import { ARROW_KEYS } from "@/constants/enums";
import { TwentyFortyEightGridType } from "@/types/twentyFortyEight";
import HomeButton from "@/components/HomeButton";
import { ITwentyFortyEightProgress } from "@/types/progress";
import { GameType } from "@/types/entities";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useBestScore } from "@/hooks/useBestScoreuseBestScore";
import GameDashboard from "@/components/GameDashboard";

const VICTORY_NUMBER = 2048;

interface Props {
   initialData: ITwentyFortyEightProgress | null;
}

const TwentyFortyEightPage = ({ initialData }: Props) => {
   const [gridSize, setGridSize] = useState(initialData?.gridSize || 4);
   const [data, setData] = useState<TwentyFortyEightGridType>(
      initialData?.grid || getEmptyGrid(gridSize)
   );
   const [gameOver, setGameOver] = useState(false);
   const [score, setScore] = useState(initialData?.score || 0);
   const [previousData, setPreviousData] =
      useState<TwentyFortyEightGridType | null>(null);
   const [previousScore, setPreviousScore] = useState(0);
   const [reached2048, setReached2048] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const autoSave = useAutoSave<ITwentyFortyEightProgress>({
      gameType: GameType.TWENTY48,
      delay: 0,
   });

   const {
      seconds,
      hasStarted,
      isPaused,
      togglePause,
      resetTimer,
      startTimer,
      formattedTime,
   } = useGameTimer({
      initialSeconds: initialData?.gameTimer?.seconds || 0,
      initialIsPaused: initialData?.gameTimer?.isPaused || true,
   });

   const {
      bestScore,
      bestTime,
      isLoading: isBestScoreLoading,
      updateBestScore,
   } = useBestScore({
      gameType: GameType.TWENTY48,
      gameConfig: `${gridSize}x${gridSize}`,
   });

   const initialize = () => {
      const newGrid = cloneDeep(getEmptyGrid(gridSize));
      addNumber(newGrid, 2);
      setData(newGrid);
      setGameOver(false);
      setReached2048(false);
      setIsModalOpen(false);
      setScore(0);
      setPreviousData(null);
      setPreviousScore(0);
      resetTimer();
   };

   useEffect(() => {
      const handler = () => {
         const payload = {
            grid: data,
            score,
            gridSize,
            gameTimer: { seconds, isPaused: true },
         };

         navigator.sendBeacon(
            "/api/user/progress",
            JSON.stringify({
               gameData: payload,
               gameType: GameType.TWENTY48,
            })
         );
      };

      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
   }, [data, score, gridSize, gameOver, seconds]);

   const addNumber = (Grid: TwentyFortyEightGridType, count = 1) => {
      let addedCount = 0;

      const emptyCells = Grid.flat().filter((cell: number) => cell === 0);
      if (emptyCells.length === 0) {
         setGameOver(checkIfGameOver(Grid));
         return;
      }

      while (addedCount < count) {
         const rand1 = Math.floor(Math.random() * gridSize);
         const rand2 = Math.floor(Math.random() * gridSize);

         if (Grid[rand1][rand2] === 0) {
            Grid[rand1][rand2] = Math.random() > 0.2 ? 2 : 4;
            addedCount++;
         }
      }

      if (!reached2048 && Grid.flat().includes(VICTORY_NUMBER)) {
         setReached2048(true);
      }
   };

   const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) {
         setIsModalOpen(true);
         return;
      }

      if (isModalOpen) {
         return;
      }
      if (hasStarted && isPaused) return;

      const moves = {
         [ARROW_KEYS.UP]: () => swipeUp(data, addNumber, setData, setScore),
         [ARROW_KEYS.DOWN]: () => swipeDown(data, addNumber, setData, setScore),
         [ARROW_KEYS.LEFT]: () => swipeLeft(data, addNumber, setData, setScore),
         [ARROW_KEYS.RIGHT]: () =>
            swipeRight(data, addNumber, setData, setScore),
      };

      const moveFunction = moves[event.keyCode as keyof typeof moves];
      if (moveFunction) {
         if (!hasStarted) {
            startTimer();
         }
         if (!gameOver) {
            setPreviousData(cloneDeep(data) as TwentyFortyEightGridType);
            setPreviousScore(score);
         }

         moveFunction();

         if (checkIfGameOver(data)) setGameOver(true);
      }
   };

   const undoMove = () => {
      if (hasStarted && isPaused) return;
      if (previousData) {
         setData(previousData);
         setScore(previousScore);
         setPreviousData(null);
         setPreviousScore(0);
      }
   };

   const resetGame = () => {
      initialize();
      autoSave({
         grid: data,
         score,
         gridSize,
         gameTimer: { seconds, isPaused: true },
      });
   };
   useEffect(() => {
      autoSave({
        grid: data,
        score,
        gridSize,
        gameTimer: { seconds, isPaused: true },
      });
    }, [data, score]);
    

   useEffect(() => {
      if (!initialData) {
        initialize();
        return;
      }
    
      if ( initialData.grid.flat().every(cell => cell === 0)) {
        initialize();
        return;
      }

    }, [initialData]);

   useEffect(() => {
      if (gameOver || reached2048) {
         setIsModalOpen(true);
      }
   }, [gameOver, reached2048]);

   useEvent("keydown", handleKeyDown);

   useEffect(() => {
      if ((gameOver || reached2048) && !isModalOpen) {
         handleGameEnd();
      }
   }, [gameOver, reached2048]);

   const handleGameEnd = async () => {
      togglePause();
      setIsModalOpen(true);

      const isNewRecord = await updateBestScore(score, seconds);

      if (isNewRecord) {
         alert("🎉 New record!");
      }
   };

   return (
      <div className="relative flex flex-col justify-center items-center min-h-screen">
         <GameDashboard
            bestScore={bestScore ?? 0}
            bestTime={bestTime ?? 0}
            className="bg-[#BBADA0] border-b-4 border-beige text-slate-800"
            textClassName="text-white"
            valueClassName="text-[#EEE4DA]"
         />
         <div className="mt-10">
            <Title
               score={score}
               time={formattedTime}
               isPaused={isPaused}
               togglePause={togglePause}
            />
            <Grid data={data} />

            <Menu
               undoMove={undoMove}
               resetGame={resetGame}
               gridSize={gridSize}
               setGridSize={setGridSize}
            />
         </div>
         {isModalOpen && (
            <WinOrLossModal
               result={gameOver ? "Loss" : "Win"}
               resetGame={resetGame}
               score={score}
               onClose={() => setIsModalOpen(!isModalOpen)}
            />
         )}
         <HomeButton bg={"bg-beige"} />
      </div>
   );
};

export default TwentyFortyEightPage;
