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
import { api } from "@/lib/api-client";
import { GameType } from "@/types/entities";
import { useAutoSave } from "@/hooks/useAutoSave";

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
   };

   const saveProgress = async () => {
      await api.post("/api/user/progress", {
         gameData: { grid: data, score, gridSize, gameOver },
         gameType: GameType.TWENTY48,
      });
   };

   useEffect(() => {
      const handler = () => {
         const payload = {
            grid: data,
            score,
            gridSize,
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
   }, [data, score, gridSize, gameOver]);

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

      const moves = {
         [ARROW_KEYS.UP]: () => swipeUp(data, addNumber, setData, setScore),
         [ARROW_KEYS.DOWN]: () => swipeDown(data, addNumber, setData, setScore),
         [ARROW_KEYS.LEFT]: () => swipeLeft(data, addNumber, setData, setScore),
         [ARROW_KEYS.RIGHT]: () =>
            swipeRight(data, addNumber, setData, setScore),
      };

      const moveFunction = moves[event.keyCode as keyof typeof moves];
      if (moveFunction) {
         if (!gameOver) {
            setPreviousData(cloneDeep(data) as TwentyFortyEightGridType);
            setPreviousScore(score);
         }

         moveFunction();
         autoSave({
            grid: data,
            score,
            gridSize,
         });
         if (checkIfGameOver(data)) setGameOver(true);
      }
   };

   const undoMove = () => {
      if (previousData) {
         setData(previousData);
         setScore(previousScore);
         setPreviousData(null);
         setPreviousScore(0);
      }
   };

   const resetGame = () => {
      initialize();
      saveProgress();
   };

   useEffect(() => {
      if (initialData && data.flat().some((cell) => cell !== 0)) {
         return;
      }

      initialize();
   }, [gridSize]);

   useEffect(() => {
      if (gameOver || reached2048) {
         setIsModalOpen(true);
      }
   }, [gameOver, reached2048]);

   useEvent("keydown", handleKeyDown);

   return (
      <div className="flex flex-col justify-center items-center mt-20">
         <div>
            <Title score={score} />
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
