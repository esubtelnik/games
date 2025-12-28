'use client';
import { FC } from 'react';
import { Trophy, RotateCcw, Users } from 'lucide-react';
import { GameMode } from '@/types/memoryGame';

interface IMemoryModalProps {
  gameMode: GameMode;
  moves: number;
  time: string;
  winner?: number | null; // 0 = tie, 1 = player1, 2 = player2, null = single player
  player1Score?: number;
  player2Score?: number;
  onClose: () => void;
  onNewGame: () => void;
}

const MemoryModal: FC<IMemoryModalProps> = ({
  gameMode,
  moves,
  time,
  winner = null,
  player1Score = 0,
  player2Score = 0,
  onClose,
  onNewGame
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTitle = () => {
    if (gameMode === GameMode.SINGLE) {
      return 'Congratulations! 🎉';
    }
    if (winner === 0) {
      return "It's a Tie! 🤝";
    }
    return `Player ${winner} Wins! 🏆`;
  };

  const getTitleColor = () => {
    if (gameMode === GameMode.SINGLE) return 'text-purple-600';
    if (winner === 0) return 'text-yellow-600';
    if (winner === 1) return 'text-blue-600';
    return 'text-red-600';
  };

  const getIconBg = () => {
    if (gameMode === GameMode.SINGLE) return 'bg-purple-100';
    if (winner === 0) return 'bg-yellow-100';
    if (winner === 1) return 'bg-blue-100';
    return 'bg-red-100';
  };

  const getIconColor = () => {
    if (gameMode === GameMode.SINGLE) return 'text-purple-600';
    if (winner === 0) return 'text-yellow-600';
    if (winner === 1) return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed w-full h-full inset-0 flex flex-col items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className={`p-6 rounded-full ${getIconBg()}`}>
            {gameMode === GameMode.MULTIPLAYER ? (
              <Users className={`w-16 h-16 ${getIconColor()}`} />
            ) : (
              <Trophy className={`w-16 h-16 ${getIconColor()}`} />
            )}
          </div>
        </div>

        <h2 className={`text-4xl font-bold text-center mb-4 ${getTitleColor()}`}>
          {getTitle()}
        </h2>

        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          {gameMode === GameMode.MULTIPLAYER ? (
            <>
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-purple-200">
                <span className="text-gray-600 font-semibold">Player 1:</span>
                <span className={`text-2xl font-bold ${winner === 1 ? 'text-blue-600' : 'text-gray-600'}`}>
                  {player1Score} {winner === 1 && '🏆'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-purple-200">
                <span className="text-gray-600 font-semibold">Player 2:</span>
                <span className={`text-2xl font-bold ${winner === 2 ? 'text-red-600' : 'text-gray-600'}`}>
                  {player2Score} {winner === 2 && '🏆'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Time:</span>
                <span className="text-2xl font-bold text-purple-600">{time}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-semibold">Moves:</span>
                <span className="text-2xl font-bold text-purple-600">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Time:</span>
                <span className="text-2xl font-bold text-purple-600">{time}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors border-2 border-gray-300"
          >
            Close
          </button>
          <button
            onClick={onNewGame}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;