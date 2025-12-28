'use client';
import { FC } from 'react';
import { Trophy, Timer, RotateCcw, Zap, User, Settings2, Swords } from 'lucide-react';
import Dropdown from '@/ui/Dropdown';
import { Difficulty, GameMode } from '@/types/memoryGame';

interface IMemoryMenuProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  moves: number;
  matches: number;
  totalPairs: number;
  elapsedTime: string;
  onReset: () => void;
  currentPlayer?: 1 | 2;
  player1Score?: number;
  player2Score?: number;
}

const difficultyOptions = [
  { label: 'Easy: 6 pairs', value: Difficulty.EASY },
  { label: 'Medium: 8 pairs', value: Difficulty.MEDIUM },
  { label: 'Hard: 12 pairs', value: Difficulty.HARD }
];

const gameModeOptions = [
  { label: 'Single Player', value: GameMode.SINGLE },
  { label: 'Two Players', value: GameMode.MULTIPLAYER }
];

const MemoryMenu: FC<IMemoryMenuProps> = ({
  gameMode,
  setGameMode,
  difficulty,
  setDifficulty,
  moves,
  matches,
  totalPairs,
  elapsedTime,
  onReset,
  currentPlayer = 1,
  player1Score = 0,
  player2Score = 0
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
      
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-slate-900 border border-slate-700 p-2 rounded-xl">
        <div className="flex items-center gap-2 px-3 text-slate-400 border-r border-slate-700">
          <Settings2 size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Setup</span>
        </div>
        
        <div className="flex-1 flex gap-2">
          <Dropdown
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-3 rounded-lg border border-slate-600 transition-colors"
            options={gameModeOptions}
            direction="down"
            selectedOption={gameMode}
            selectOption={(option) => setGameMode(option as GameMode)}
          />
          <Dropdown
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-3 rounded-lg border border-slate-600 transition-colors"
            options={difficultyOptions}
            direction="down"
            selectedOption={difficulty}
            selectOption={(option) => setDifficulty(option as Difficulty)}
          />
        </div>

        <button
          onClick={onReset}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition-all flex items-center gap-2 px-4 shadow-lg active:translate-y-0.5"
        >
          <RotateCcw size={16} />
          <span className="text-xs font-bold uppercase">New Game</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        
        <div className="md:col-span-7 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex">
          {gameMode === GameMode.MULTIPLAYER ? (
            <div className="flex w-full divide-x divide-slate-700">
              <div className={`flex-1 p-3 flex items-center justify-between ${currentPlayer === 1 ? 'bg-indigo-600/20' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${currentPlayer === 1 ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className={`text-xs font-bold ${currentPlayer === 1 ? 'text-indigo-300' : 'text-slate-500'}`}>P1</span>
                </div>
                <span className="text-2xl font-black text-white">{player1Score}</span>
              </div>
              
              <div className="flex items-center px-2 bg-slate-800 text-slate-500">
                <Swords size={14} />
              </div>

              <div className={`flex-1 p-3 flex items-center justify-between ${currentPlayer === 2 ? 'bg-rose-600/20' : ''}`}>
                <span className="text-2xl font-black text-white">{player2Score}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${currentPlayer === 2 ? 'text-rose-300' : 'text-slate-500'}`}>P2</span>
                  <div className={`w-2 h-2 rounded-full ${currentPlayer === 2 ? 'bg-rose-400 animate-pulse' : 'bg-slate-600'}`} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Total Moves</p>
                  <p className="text-xl font-black text-white leading-none">{moves}</p>
                </div>
              </div>
              <div className="h-full w-px bg-slate-700 mx-4" />
              <div className="flex flex-1 items-center justify-end gap-3 text-right">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Progress</p>
                  <p className="text-xl font-black text-white leading-none">{matches} / {totalPairs}</p>
                </div>
                <Trophy size={20} className="text-emerald-400" />
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-5 bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-center gap-4">
          <Timer size={20} className="text-indigo-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold leading-none mb-1 text-center">Elapsed Time</span>
            <span className="text-2xl font-mono font-bold text-white tabular-nums">
              {elapsedTime}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MemoryMenu;