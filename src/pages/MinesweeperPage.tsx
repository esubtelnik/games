"use client";
import { FC, useState, useEffect } from "react";
import MinesweeperGrid from "@/components/minesweeperComponents/MinesweeperGrid";
import MinesweeperMenu from "@/components/minesweeperComponents/MinesweeperMenu";
import MinesweeperModal from "@/components/minesweeperComponents/MinesweeperModal";
import HomeButton from "@/components/HomeButton";
import {
   createEmptyGrid,
   placeMines,
   calculateNeighborMines,
   revealCell,
   toggleFlag,
   checkWin,
   revealAllMines,
   countFlags,
} from "@/utils/minesweeperUtils/utils";
import {
   MinesweeperGridType,
   GameStatus,
   Difficulty,
   DIFFICULTY_CONFIGS,
} from "@/types/minesweeper";
import cloneDeep from "lodash/cloneDeep";
import { useGameTimer } from "@/hooks/useGameTimer";
import { IMinesweeperProgress } from "@/types/progress";
import { useAutoSave } from "@/hooks/useAutoSave";
import { GameType } from "@/types/entities";
import { useBestScore } from "@/hooks/useBestScoreuseBestScore";
import GameDashboard from "@/components/GameDashboard";
import { formatTime } from "@/utils/utils";

interface Props {
   initialData: IMinesweeperProgress | null;
}

const MinesweeperPage: FC<Props> = ({ initialData }) => {
   const [difficulty, setDifficulty] = useState<Difficulty>(
      initialData?.difficulty || Difficulty.EASY
   );
   const [grid, setGrid] = useState<MinesweeperGridType>(
      initialData?.grid || []
   );
   const [gameStatus, setGameStatus] = useState<GameStatus>(
      initialData?.gameStatus || GameStatus.IDLE
   );
   const [isFirstClick, setIsFirstClick] = useState(
      initialData?.isFirstClick ?? true
   );
   const [isModalOpen, setIsModalOpen] = useState(false);

   const config = DIFFICULTY_CONFIGS[difficulty];
   const minesLeft = config.mines - countFlags(grid);

   const { seconds, resetTimer, startTimer, formattedTime, togglePause } = useGameTimer({
      initialSeconds: initialData?.gameTimer?.seconds || 0,
      initialIsPaused: initialData?.gameTimer?.isPaused ?? true,
   });

   const autoSave = useAutoSave<IMinesweeperProgress>({
      gameType: GameType.MINESWEEPER,
      delay: 0,
   });

   const {
      bestScore,
      bestTime,
      isLoading: isBestScoreLoading,
      updateBestScore,
   } = useBestScore({
      gameType: GameType.MINESWEEPER,
      gameConfig: `${config.rows}x${config.cols}`,
   });

   const initializeGame = () => {
      const newGrid = createEmptyGrid(config.rows, config.cols);
      setGrid(newGrid);
      setGameStatus(GameStatus.IDLE);
      resetTimer();
      setIsFirstClick(true);
      setIsModalOpen(false);
   };

   useEffect(() => {
      if (grid.length) {
         initializeGame();
      }
   }, [difficulty]);

   useEffect(() => {
      if (gameStatus === GameStatus.PLAYING) {
         startTimer();
      }
   }, [gameStatus]);

   useEffect(() => {
      if (grid.length > 0) {
         const payload: IMinesweeperProgress = {
            grid: grid,
            difficulty: difficulty,
            gameStatus: gameStatus,
            isFirstClick: isFirstClick,
            gameTimer: {
               seconds: seconds,
               isPaused: gameStatus !== GameStatus.PLAYING,
            },
         };

         autoSave(payload);
      }
   }, [grid, difficulty, gameStatus, isFirstClick]);

   const handleCellClick = (row: number, col: number) => {
      if (
         gameStatus === GameStatus.WON ||
         gameStatus === GameStatus.LOST ||
         grid[row][col].isFlagged ||
         grid[row][col].isRevealed
      ) {
         return;
      }

      let newGrid = cloneDeep(grid);

      if (isFirstClick) {
         startTimer();
         newGrid = placeMines(newGrid, config.mines, row, col);
         newGrid = calculateNeighborMines(newGrid);
         setIsFirstClick(false);
         setGameStatus(GameStatus.PLAYING);
      }

      newGrid = revealCell(newGrid, row, col);

      if (newGrid[row][col].isMine) {
         newGrid = revealAllMines(newGrid);
         setGrid(newGrid);
         setGameStatus(GameStatus.LOST);
         setIsModalOpen(true);
         return;
      }

      setGrid(newGrid);

      if (checkWin(newGrid)) {
         setGameStatus(GameStatus.WON);
         setIsModalOpen(true);
      }
   };

   const handleCellRightClick = (
      row: number,
      col: number,
      e: React.MouseEvent
   ) => {
      e.preventDefault();

      if (
         gameStatus === GameStatus.WON ||
         gameStatus === GameStatus.LOST ||
         grid[row][col].isRevealed
      ) {
         return;
      }

      const newGrid = cloneDeep(grid);
      toggleFlag(newGrid, row, col);
      setGrid(newGrid);

      if (checkWin(newGrid)) {
         setGameStatus(GameStatus.WON);
      }
   };

   const handleDifficultyChange = (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
   };

   useEffect(() => {
      const handler = () => {
         if (grid.length > 0) {
            const payload = {
               grid: grid,
               difficulty: difficulty,
               gameStatus: gameStatus,
               isFirstClick: isFirstClick,
               gameTimer: {
                  seconds: seconds,
                  isPaused: true,
               },
            };

            navigator.sendBeacon(
               "/api/user/progress",
               JSON.stringify({
                  gameData: payload,
                  gameType: GameType.MINESWEEPER,
               })
            );
         }
      };

      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
   }, [grid, difficulty, gameStatus, isFirstClick, seconds]);

   useEffect(() => {
    if (gameStatus === GameStatus.WON) {
       handleGameEnd();
    }
 }, [gameStatus]);

 const handleGameEnd = async () => {
   setIsModalOpen(true);
   togglePause();
 
   const isNewRecord = await updateBestScore(undefined, seconds);
 
   if (isNewRecord) {
     alert("🎉 New record!");
   }
 };
 

   return (
      <div className="min-h-screen relative bg-gradient-to-br from-neutral-600 via-neutral-400 to-neutral-600 flex flex-col items-center justify-center p-8 gap-6">
        <GameDashboard
            showBestScore={false}
            bestScore={bestScore ?? 0}
            bestTime={bestTime ?? 0}
            className="bg-neutral-800 border-b-4 border-neutral-600 text-neutral-200"
            textClassName="text-neutral-200"
            valueClassName="text-neutral-200"
         />
         <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-4">
            Minesweeper
         </h1>

         <MinesweeperMenu
            difficulty={difficulty}
            setDifficulty={handleDifficultyChange}
            minesLeft={minesLeft}
            elapsedTime={formattedTime}
            onReset={initializeGame}
         />

         <MinesweeperGrid
            grid={grid}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
            isGameOver={gameStatus === GameStatus.LOST}
         />

         <div className="text-white text-sm ">
            Left click to reveal • Right click to flag
         </div>

         <HomeButton bg="bg-neutral-800" />

         {isModalOpen &&
            (gameStatus === GameStatus.WON ||
               gameStatus === GameStatus.LOST) && (
               <MinesweeperModal
                  status={gameStatus}
                  time={formattedTime}
                  onClose={() => setIsModalOpen(false)}
                  onNewGame={initializeGame}
               />
            )}
      </div>
   );
};

export default MinesweeperPage;
