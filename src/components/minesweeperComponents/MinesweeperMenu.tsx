// src/components/minesweeperComponents/MinesweeperMenu.tsx
'use client';
import { FC } from 'react';
import { Bomb, Timer, RotateCcw } from 'lucide-react';
import Dropdown from '@/ui/Dropdown';
import { Difficulty } from '@/types/minesweeper';

interface IMinesweeperMenuProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  minesLeft: number;
  elapsedTime: number;
  onReset: () => void;
}

const difficultyOptions = [
  { label: 'Easy (8×8, 10 mines)', value: Difficulty.EASY.toString() },
  { label: 'Medium (16×16, 40 mines)', value: Difficulty.MEDIUM.toString() },
  { label: 'Hard (16×30, 99 mines)', value: Difficulty.HARD.toString() }
];

const MinesweeperMenu: FC<IMinesweeperMenuProps> = ({
  difficulty,
  setDifficulty,
  minesLeft,
  elapsedTime,
  onReset
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-neutral-600 p-6 rounded-xl shadow-lg w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Section */}
        <div className="flex gap-4 justify-center items-center">
          <div className="bg-neutral-700 px-4 py-3 rounded-lg flex items-center gap-2 min-w-[120px]">
            <Bomb className="w-5 h-5 text-red-400" />
            <span className="text-white font-bold text-lg">{minesLeft}</span>
          </div>
          
          <div className="bg-neutral-700 px-4 py-3 rounded-lg flex items-center gap-2 min-w-[120px]">
            <Timer className="w-5 h-5 text-blue-400" />
            <span className="text-white font-bold text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="flex justify-center items-center">
          <Dropdown
            className="bg-neutral-700 text-white rounded-lg px-4 py-4 hover:bg-neutral-500 outline-none text-sm font-bold w-full"
            dropdownClassName={{
              backgroundColor: 'bg-neutral-600',
              textColor: 'text-white',
              borderColor: 'border-neutral-500',
              selectedBackgroundColor: 'bg-neutral-700',
              hoverBackgroundColor: 'hover:bg-neutral-700/80',
            }}
            options={difficultyOptions}
            direction="down"
            selectedOption={difficulty.toString()}
            selectOption={(option: string) => setDifficulty(option as Difficulty)}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={onReset}
            className="bg-neutral-700 hover:bg-neutral-500 text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95 flex items-center gap-2 w-full justify-center"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinesweeperMenu;