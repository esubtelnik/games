'use client';
import { FC } from 'react';
import { Trophy, Timer, RotateCcw, Zap } from 'lucide-react';
import Dropdown from '@/ui/Dropdown';
import { Difficulty } from '@/types/memoryGame';

interface IMemoryMenuProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  moves: number;
  matches: number;
  totalPairs: number;
  elapsedTime: number;
  onReset: () => void;
}

const difficultyOptions = [
  { label: 'Easy (6 pairs)', value: Difficulty.EASY },
  { label: 'Medium (8 pairs)', value: Difficulty.MEDIUM },
  { label: 'Hard (12 pairs)', value: Difficulty.HARD }
];

const MemoryMenu: FC<IMemoryMenuProps> = ({
  difficulty,
  setDifficulty,
  moves,
  matches,
  totalPairs,
  elapsedTime,
  onReset
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-purple-800 p-6 rounded-xl shadow-lg border-4 border-purple-900 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stats */}
        <div className="bg-purple-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div className="flex flex-col">
            <span className="text-purple-300 text-xs">Moves</span>
            <span className="text-white font-bold text-lg">{moves}</span>
          </div>
        </div>

        <div className="bg-purple-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-green-400" />
          <div className="flex flex-col">
            <span className="text-purple-300 text-xs">Matches</span>
            <span className="text-white font-bold text-lg">{matches}/{totalPairs}</span>
          </div>
        </div>

        <div className="bg-purple-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-purple-300 text-xs">Time</span>
            <span className="text-white font-bold text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={onReset}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-95 flex items-center gap-2 w-full justify-center"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="mt-4">
        <Dropdown
          className="bg-purple-600 text-white rounded-lg px-4 py-3 hover:bg-purple-500 outline-none text-sm font-bold w-full"
          dropdownClassName={{
            backgroundColor: 'bg-purple-600',
            textColor: 'text-white',
            borderColor: 'border-purple-500',
            selectedBackgroundColor: 'bg-purple-700',
            hoverBackgroundColor: 'hover:bg-purple-700/80',
          }}
          options={difficultyOptions}
          direction="up"
          selectedOption={difficulty}
          selectOption={(option) => setDifficulty(option as Difficulty)}
        />
      </div>
    </div>
  );
};

export default MemoryMenu;