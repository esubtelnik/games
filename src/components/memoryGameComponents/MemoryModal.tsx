'use client';
import { FC } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface IMemoryModalProps {
  moves: number;
  time: string;
  onClose: () => void;
  onNewGame: () => void;
}

const MemoryModal: FC<IMemoryModalProps> = ({
  moves,
  time,
  onClose,
  onNewGame
}) => {
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
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-purple-100">
            <Trophy className="w-16 h-16 text-purple-600" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="text-purple-600">Congratulations! 🎉</span>
        </h2>

        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-semibold">Moves:</span>
            <span className="text-2xl font-bold text-purple-600">{moves}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Time:</span>
            <span className="text-2xl font-bold text-purple-600">{time}</span>
          </div>
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