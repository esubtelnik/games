
'use client';
import { FC, useState, useEffect, useRef } from 'react';
import MemoryGrid from '@/components/memoryGameComponents/MemoryGrid';
import MemoryMenu from '@/components/memoryGameComponents/MemoryMenu';
import MemoryModal from '@/components/memoryGameComponents/MemoryModal';
import HomeButton from '@/components/HomeButton';
import {
  createGameGrid,
  flipCard,
  unflipCards,
  markCardsAsMatched,
  getFlippedCards,
  checkWin,
  checkMatch
} from '@/utils/memoryGameUtils/gameLogic';
import {
  MemoryGridType,
  GameStatus,
  Difficulty,
  DIFFICULTY_CONFIGS
} from '@/types/memoryGame';
import cloneDeep from 'lodash/cloneDeep';

const MemoryGamePage: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [grid, setGrid] = useState<MemoryGridType>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = DIFFICULTY_CONFIGS[difficulty];

  const initializeGame = () => {
    const newGrid = createGameGrid(config.pairs);
    setGrid(newGrid);
    setGameStatus(GameStatus.IDLE);
    setElapsedTime(0);
    setMoves(0);
    setMatches(0);
    setIsModalOpen(false);
    setIsProcessing(false);
    
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

  const handleCardClick = (cardId: number) => {
    if (isProcessing || gameStatus === GameStatus.WON) return;

    const clickedCard = grid.find(card => card.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    if (gameStatus === GameStatus.IDLE) {
      setGameStatus(GameStatus.PLAYING);
    }

    let newGrid = cloneDeep(grid);
    const flippedCards = getFlippedCards(newGrid);

    if (flippedCards.length >= 2) return;

    newGrid = flipCard(newGrid, cardId);
    setGrid(newGrid);

    const updatedFlippedCards = getFlippedCards(newGrid);

    if (updatedFlippedCards.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);

      const [card1, card2] = updatedFlippedCards;
      const isMatch = checkMatch(card1, card2);

      setTimeout(() => {
        let finalGrid = cloneDeep(newGrid);

        if (isMatch) {
          finalGrid = markCardsAsMatched(finalGrid, [card1.id, card2.id]);
          setMatches(prev => prev + 1);

          if (checkWin(finalGrid)) {
            setGameStatus(GameStatus.WON);
            setIsModalOpen(true);
          }
        } else {
          finalGrid = unflipCards(finalGrid, [card1.id, card2.id]);
        }

        setGrid(finalGrid);
        setIsProcessing(false);
      }, 1000);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-6xl font-bold text-white mb-4">
        🧠 Memory Game
      </h1>

      <MemoryMenu
        difficulty={difficulty}
        setDifficulty={handleDifficultyChange}
        moves={moves}
        matches={matches}
        totalPairs={config.pairs}
        elapsedTime={elapsedTime}
        onReset={initializeGame}
      />

      <MemoryGrid
        grid={grid}
        onCardClick={handleCardClick}
        disabled={isProcessing}
        gridCols={config.gridCols}
      />

      <div className="text-white text-sm opacity-70">
        Click cards to find matching pairs
      </div>

      <HomeButton bg="bg-purple-700" />

      {isModalOpen && gameStatus === GameStatus.WON && (
        <MemoryModal
          moves={moves}
          time={formatTime(elapsedTime)}
          onClose={() => setIsModalOpen(false)}
          onNewGame={initializeGame}
        />
      )}
    </div>
  );
};

export default MemoryGamePage;  