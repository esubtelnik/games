"use client";
import React, { useState, useEffect } from "react";
import { useEvent } from "@/hooks/useEvent";
import FifteenBoard from "@/components/fifteenPuzzleComponents/FifteenBoard";
import FifteenMenu from "@/components/fifteenPuzzleComponents/FifteenMenu";
import FifteenModal from "@/components/fifteenPuzzleComponents/FifteenModal";
import { generateSolvableTiles } from "@/utils/fifteenPuzzleUtils/TileGeneration";
import { canMoveTile, moveTile } from "@/utils/fifteenPuzzleUtils/TileMovemen";
import { checkWin } from "@/utils/fifteenPuzzleUtils/VictotyCheck";
import { ARROW_KEYS } from "@/constants/enums";
import { FifteenTileType } from "@/types/fifteenPuzzle";
import HomeButton from "@/components/HomeButton";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useAutoSave } from "@/hooks/useAutoSave";
import { GameType } from "@/types/entities";
import { IFifteenPuzzleProgress } from "@/types/progress";
import { useBestScore } from "@/hooks/useBestScoreuseBestScore";
import GameDashboard from "@/components/GameDashboard";
import { formatTime } from "@/utils/utils";
interface Props {
   initialData: IFifteenPuzzleProgress | null;
}

const FifteenPuzzlePage = ({ initialData }: Props) => {
   const [rows, setRows] = useState(initialData?.rows || 4);
   const [cols, setCols] = useState(initialData?.cols || 4);
   const [tiles, setTiles] = useState<FifteenTileType[]>(
      initialData?.tiles || []
   );
   const [emptyIndex, setEmptyIndex] = useState<number>(
      initialData?.emptyIndex || 15
   );
   const [gameMode, setGameMode] = useState(initialData?.gameMode || 1);
   const [isWin, setIsWin] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [winTime, setWinTime] = useState<string>("");

   const autoSave = useAutoSave<IFifteenPuzzleProgress>({
      gameType: GameType.FIFTEEN_PUZZLE,
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
      initialSeconds: initialData?.gameTimer.seconds || 0,
      initialIsPaused: initialData?.gameTimer.isPaused || true,
   });

   const {
      bestScore,
      bestTime,
      isLoading: isBestScoreLoading,
      updateBestScore,
   } = useBestScore({
      gameType: GameType.FIFTEEN_PUZZLE,
      gameConfig: `${rows}x${cols}`,
   });

   const initialize = () => {
      const initialTiles = generateSolvableTiles(rows, cols, gameMode);
      setTiles(initialTiles);
      setEmptyIndex(initialTiles.indexOf(null));
      setIsWin(false);
      setIsModalOpen(false);

      resetTimer();
   };

   useEffect(() => {
      if (initialData && tiles.some((tile) => tile !== null)) {
         return;
      }

      initialize();
   }, []);

   const moveHandler = (newIndex: number) => {
      if (
         hasStarted &&
         (isPaused || isWin || !canMoveTile(newIndex, emptyIndex, rows, cols))
      )
         return;

      if (!hasStarted) {
         startTimer();
      }

      const newTiles = moveTile(tiles, newIndex, emptyIndex);
      setTiles(newTiles);
      setEmptyIndex(newIndex);

      autoSave({
         tiles: newTiles,
         emptyIndex: newIndex,
         rows,
         cols,
         gameMode,
         gameTimer: { seconds, isPaused: true },
      });

      setTimeout(() => {
         if (checkWin(newTiles, rows, cols, gameMode)) {
            setIsWin(true);
         }
      }, 100);
   };

   const handleTileClick = (index: number) => {
      moveHandler(index);
   };

   const handleArrowPress = (event: KeyboardEvent) => {
      if (hasStarted && isPaused) return;
      if (isWin) return;

      const keyCode = event.keyCode;
      let tileToMoveIndex;

      switch (keyCode) {
         case ARROW_KEYS.UP:
            if (emptyIndex + cols < tiles.length) {
               tileToMoveIndex = emptyIndex + cols;
            }
            break;
         case ARROW_KEYS.DOWN:
            if (emptyIndex - cols >= 0) {
               tileToMoveIndex = emptyIndex - cols;
            }
            break;
         case ARROW_KEYS.LEFT:
            if ((emptyIndex + 1) % cols !== 0) {
               tileToMoveIndex = emptyIndex + 1;
            }
            break;
         case ARROW_KEYS.RIGHT:
            if (emptyIndex % cols !== 0) {
               tileToMoveIndex = emptyIndex - 1;
            }
            break;
         default:
            return;
      }

      if (tileToMoveIndex !== undefined) {
         moveHandler(tileToMoveIndex);
      }
   };

   const shuffleBoard = () => {
      const initialTiles = generateSolvableTiles(rows, cols, gameMode);
      setTiles(initialTiles);
      setEmptyIndex(initialTiles.indexOf(null));
      setIsWin(false);
      setIsModalOpen(false);
   };

   const handleSizeChange = (newRows: number, newCols: number) => {
      setRows(newRows);
      setCols(newCols);

      const initialTiles = generateSolvableTiles(newRows, newCols, gameMode);
      setTiles(initialTiles);
      setEmptyIndex(initialTiles.indexOf(null));
      setIsWin(false);
      setIsModalOpen(false);

      resetTimer();
   };

   useEffect(() => {
      const handler = () => {
         const payload = {
            tiles: tiles,
            emptyIndex: emptyIndex,
            rows,
            cols,
            gameMode,
            gameTimer: { seconds, isPaused: true },
         };

         navigator.sendBeacon(
            "/api/user/progress",
            JSON.stringify({
               gameData: payload,
               gameType: GameType.FIFTEEN_PUZZLE,
            })
         );
      };

      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
   }, [tiles, rows, cols, gameMode, seconds]);

   useEvent("keydown", handleArrowPress);

   useEffect(() => {
      if (isWin && !isModalOpen) {
         handleGameEnd();
      }
   }, [isWin]);

   const handleGameEnd = async () => {
      togglePause();
      setWinTime(formatTime(seconds));
      setIsModalOpen(true);
    
      const isNewRecord = await updateBestScore(undefined, seconds);
    
      if (isNewRecord) {
        alert("🎉 New record! You win in the shortest time!");
      }
    
      resetTimer();
    };
    

   return (
      <div className="relative">
         <GameDashboard
            showBestScore={false}
            bestScore={bestScore ?? 0}
            bestTime={bestTime ?? 0}
            className="bg-violet-200 border-b-4 border-violet-600 text-violet-900"
            textClassName="text-violet-900"
            valueClassName="text-violet-900"
         />

         <div className="flex flex-col items-center min-h-screen h-full bg-slate-700 space-y-5 pt-16">
            <div className="bg-violet-200 p-1 rounded mt-7">
               <h1 className="text-center text-2xl font-bold text-violet-900">{`${rows}x${cols} Puzzle`}</h1>
            </div>

            <FifteenMenu
               rows={rows}
               cols={cols}
               handleSizeChange={handleSizeChange}
               gameMode={gameMode}
               setGameMode={setGameMode}
               formattedTime={formattedTime}
               isPaused={isPaused}
               togglePause={togglePause}
            />

            <FifteenBoard
               tiles={tiles}
               rows={rows}
               cols={cols}
               onTileClick={handleTileClick}
            />
            <div className="bg-violet-200 p-1 rounded w-28">
               <button
                  onClick={shuffleBoard}
                  className=" p-2 w-full  bg-violet-600 hover:bg-violet-700 text-white rounded"
               >
                  Shuffle
               </button>
            </div>
            <HomeButton bg={"bg-violet-600"} />
         </div>
         {isModalOpen && (
            <FifteenModal
               resetGame={shuffleBoard}
               time={winTime}
               onClose={() => setIsModalOpen(false)}
            />
         )}
      </div>
   );
};

export default FifteenPuzzlePage;
