// src/components/minesweeperComponents/MinesweeperModal.tsx
'use client';
import { FC } from 'react';
import { Trophy, Bomb, RotateCcw } from 'lucide-react';
import { GameStatus } from '@/types/minesweeper';

interface IMinesweeperModalProps {
  status: GameStatus;
  time: string;
  onClose: () => void;
  onNewGame: () => void;
}

const MinesweeperModal: FC<IMinesweeperModalProps> = ({
  status,
  time,
  onClose,
  onNewGame
}) => {
  const isWin = status === GameStatus.WON;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed w-full h-full inset-0 flex flex-col items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className={`flex justify-center mb-6`}>
          <div className={`p-6 rounded-full ${isWin ? 'bg-green-100' : 'bg-red-100'}`}>
            {isWin ? (
              <Trophy className="w-16 h-16 text-green-600" />
            ) : (
              <Bomb className="w-16 h-16 text-red-600" />
            )}
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-4">
          {isWin ? (
            <span className="text-green-600">Victory! 🎉</span>
          ) : (
            <span className="text-red-600">Game Over!</span>
          )}
        </h2>

        <p className="text-center text-gray-600 text-xl mb-8">
          {isWin ? `You completed the game in ${time}!` : 'You hit a mine!'}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors border-2 border-gray-300"
          >
            Close
          </button>
          <button
            onClick={onNewGame}
            className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isWin ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinesweeperModal;