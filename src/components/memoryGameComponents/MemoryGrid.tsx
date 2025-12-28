'use client';
import { FC } from 'react';
import { MemoryGridType } from '@/types/memoryGame';
import MemoryCard from './MemoryCard';

interface IMemoryGridProps {
  grid: MemoryGridType;
  onCardClick: (cardId: number) => void;
  disabled: boolean;
  gridCols: number;
}

const MemoryGrid: FC<IMemoryGridProps> = ({
  grid,
  onCardClick,
  disabled,
  gridCols
}) => {
  if (!grid || grid.length === 0) {
    return (
      <div className="text-white text-xl">
        Loading game...
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 p-6 w-full max-w-6xl"
      style={{
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
      }}
    >
      {grid.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default MemoryGrid;