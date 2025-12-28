'use client';
import { FC } from 'react';
import { ICard } from '@/types/memoryGame';

interface IMemoryCardProps {
  card: ICard;
  onClick: () => void;
  disabled: boolean;
}

const MemoryCard: FC<IMemoryCardProps> = ({ card, onClick, disabled }) => {
  const isVisible = card.isFlipped || card.isMatched;

  return (
    <button
      onClick={onClick}
      disabled={disabled || card.isMatched || card.isFlipped}
      className={`
        relative w-20 h-28 md:w-24 md:h-32 [perspective:1000px] group
        ${card.isMatched ? 'opacity-60' : 'hover:-translate-y-1'}
        transition-all duration-300
      `}
    >
      <div
        className={`
          relative w-full h-full duration-500 [transform-style:preserve-3d]
          ${isVisible ? '[transform:rotateY(180deg)]' : ''}
        `}
      >
        <div
          className="absolute inset-0 [backface-visibility:hidden] bg-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_#fff_10px,_#fff_11px)]" />
          
          <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center shadow-inner">
             <span className="text-xl md:text-2xl text-slate-400 group-hover:scale-110 transition-transform">?</span>
          </div>
        </div>

        <div
          className={`
            absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] 
            rounded-xl border-4 flex items-center justify-center shadow-xl  bg-gray-100 
            ${card.isMatched ? 'border-emerald-500' : 'border-indigo-500'}
          `}
        >
          
          <span className="text-4xl md:text-5xl select-none z-10">
            {card.value}
          </span>
        </div>
      </div>
    </button>
  );
};

export default MemoryCard;