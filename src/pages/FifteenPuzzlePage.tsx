"use client";
import React, { useState, useEffect, useRef } from "react";
import { useEvent } from "@/hooks/useEvent";
import FifteenBoard from "@/components/fifteenPuzzleComponents/FifteenBoard";
import FifteenMenu from "@/components/fifteenPuzzleComponents/FifteenMenu";
import FifteenModal from "@/components/fifteenPuzzleComponents/FifteenModal";
import { generateSolvableTiles } from "@/utils/fifteenPuzzleUtils/TileGeneration";
import { canMoveTile, moveTile } from "@/utils/fifteenPuzzleUtils/TileMovemen";
import { checkWin } from "@/utils/fifteenPuzzleUtils/VictotyCheck";
// import HomeButton from '@/components/shared/HomeButton';
import { ARROW_KEYS } from "@/constants/enums";
import { FifteenTileType } from "@/types/fifteenPuzzle";
import HomeButton from "@/components/HomeButton";

const FifteenPuzzlePage = () => {
   const [rows, setRows] = useState(4);
   const [cols, setCols] = useState(4);
   const [tiles, setTiles] = useState<FifteenTileType[]>([]);
   const [emptyIndex, setEmptyIndex] = useState<number>(15);
   const [gameMode, setGameMode] = useState(1);
   const [isWin, setIsWin] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [winTime, setWinTime] = useState<string>("");

   const [startTime, setStartTime] = useState<number | null>(null);
   const [elapsedTime, setElapsedTime] = useState<number>(0);
   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
   const [isPaused, setIsPaused] = useState<boolean>(false);

   const initialize = () => {
      const initialTiles = generateSolvableTiles(rows, cols, gameMode);
      setTiles(initialTiles);
      setEmptyIndex(initialTiles.indexOf(null));
      setIsWin(false);
      setIsModalOpen(false);
      setStartTime(null);
      setElapsedTime(0);
      setIsPaused(false);
   };

   useEffect(() => {
      initialize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [rows, cols, gameMode]);

   useEffect(() => {
      if (startTime !== null && !isPaused) {
         intervalRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
         }, 100);
         return () =>
            clearInterval(
               intervalRef.current as ReturnType<typeof setInterval>
            );
      }
   }, [startTime, isPaused]);

   useEffect(() => {
      setStartTime(null);
      setElapsedTime(0);
      setIsPaused(false);
   }, [gameMode]);

   const togglePause = () => {
      if (elapsedTime !== 0) {
         setIsPaused((prev) => !prev);

         if (!isPaused) {
            clearInterval(
               intervalRef.current as ReturnType<typeof setInterval>
            );
         } else {
            setStartTime(Date.now() - elapsedTime);
         }
      }
   };

   const formatTime = (time: number) => {
      if (time < 60000) {
         const seconds = Math.floor(time / 1000);
         const milliseconds = time % 1000;
         return `${seconds}:${milliseconds.toString().padStart(3, "0")}`;
      } else {
         const minutes = Math.floor(time / 60000);
         const seconds = Math.floor((time % 60000) / 1000);
         // const milliseconds = time % 1000; :${milliseconds.toString().padStart(3, '0')}
         return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
   };

   const moveHandler = (newIndex: number) => {
      if (isPaused || isWin || !canMoveTile(newIndex, emptyIndex, rows, cols))
         return;

      if (startTime === null) {
         setStartTime(Date.now());
      }

      const newTiles = moveTile(tiles, newIndex, emptyIndex);
      setTiles(newTiles);
      setEmptyIndex(newIndex);

      setTimeout(() => {
         if (checkWin(newTiles, rows, cols, gameMode)) {
            setIsWin(true);
            setIsModalOpen(true);
            setWinTime(formatTime(elapsedTime));
            setStartTime(null);
            setElapsedTime(0);
            setIsPaused(false);
         }
      }, 100);
   };

   const handleTileClick = (index: number) => {
      moveHandler(index);
   };

   const handleArrowPress = (event: KeyboardEvent) => {
      if (isPaused || isWin) return;

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
      initialize();
   };

   const handleSizeChange = (newRows: number, newCols: number) => {
      setRows(newRows);
      setCols(newCols);
      setIsWin(false);
      setStartTime(null);
      setElapsedTime(0);
      setIsPaused(false);
      setIsModalOpen(false);
   };

   useEvent("keydown", handleArrowPress);

   return (
      <div>
         <div className="flex flex-col items-center min-h-screen h-full bg-slate-700 space-y-10">
            <div className="bg-violet-200 p-1 rounded mt-7">
               <h1 className="text-center text-2xl font-bold text-violet-900">{`${rows}x${cols} Puzzle`}</h1>
            </div>

            <FifteenMenu
               rows={rows}
               cols={cols}
               handleSizeChange={handleSizeChange}
               gameMode={gameMode}
               setGameMode={setGameMode}
               elapsedTime={elapsedTime}
               formatTime={formatTime}
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
