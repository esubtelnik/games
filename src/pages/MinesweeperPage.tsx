// src/pages/MinesweeperPage.tsx
'use client';
import { FC, useState, useEffect, useRef } from 'react';
import MinesweeperGrid from '@/components/minesweeperComponents/MinesweeperGrid';
import MinesweeperMenu from '@/components/minesweeperComponents/MinesweeperMenu';
import MinesweeperModal from '@/components/minesweeperComponents/MinesweeperModal';
import HomeButton from '@/components/HomeButton';
import {
  createEmptyGrid,
  placeMines,
  calculateNeighborMines,
  revealCell,
  toggleFlag,
  checkWin,
  revealAllMines,
  countFlags
} from '@/utils/minesweeperUtils/utils';
import {
  MinesweeperGridType,
  GameStatus,
  Difficulty,
  DIFFICULTY_CONFIGS
} from '@/types/minesweeper';
import cloneDeep from 'lodash/cloneDeep';

const MinesweeperPage: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [grid, setGrid] = useState<MinesweeperGridType>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = DIFFICULTY_CONFIGS[difficulty];
  const minesLeft = config.mines - countFlags(grid);

  const initializeGame = () => {
    const newGrid = createEmptyGrid(config.rows, config.cols);
    setGrid(newGrid);
    setGameStatus(GameStatus.IDLE);
    setElapsedTime(0);
    setIsFirstClick(true);
    setIsModalOpen(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStatus]);

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

  const handleCellRightClick = (row: number, col: number, e: React.MouseEvent) => {
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
      setIsModalOpen(true);
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-600 via-neutral-400 to-neutral-600 flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-4">
        Minesweeper
      </h1>

      <MinesweeperMenu
        difficulty={difficulty}
        setDifficulty={handleDifficultyChange}
        minesLeft={minesLeft}
        elapsedTime={elapsedTime}
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

      {isModalOpen && (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) && (
        <MinesweeperModal
          status={gameStatus}
          time={formatTime(elapsedTime)}
          onClose={() => setIsModalOpen(false)}
          onNewGame={initializeGame}
        />
      )}
    </div>
  );
};

export default MinesweeperPage;