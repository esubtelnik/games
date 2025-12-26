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
        relative w-24 h-32 rounded-xl transition-all duration-500 transform
        ${disabled || card.isMatched ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${card.isMatched ? 'opacity-50' : ''}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: isVisible ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg flex items-center justify-center border-4 border-purple-800"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)'
        }}
      >
        <div className="text-4xl">❓</div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg flex items-center justify-center border-4 border-purple-300"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className="text-5xl">{card.value}</div>
      </div>
    </button>
  );
};

export default MemoryCard;