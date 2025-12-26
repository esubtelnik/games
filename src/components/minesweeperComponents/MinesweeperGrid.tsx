// src/components/minesweeperComponents/MinesweeperGrid.tsx
'use client';
import { FC } from 'react';
import { MinesweeperGridType } from '@/types/minesweeper';
import MinesweeperCell from '@/components/minesweeperComponents/MinesweeperCell';

interface IMinesweeperGridProps {
  grid: MinesweeperGridType;
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number, e: React.MouseEvent) => void;
  isGameOver: boolean;
}

const MinesweeperGrid: FC<IMinesweeperGridProps> = ({
  grid,
  onCellClick,
  onCellRightClick,
  isGameOver
}) => {
  if (!grid || grid.length === 0) {
    return (
      <div className="text-white text-xl">
        Loading game...
      </div>
    );
  }

  const cols = grid[0]?.length || 0;

  return (
    <div
      className="inline-block bg-neutral-700 p-3 rounded-lg shadow-2xl border-4 border-neutral-800"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '2px'
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <MinesweeperCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onRightClick={(e) => onCellRightClick(rowIndex, colIndex, e)}
            isGameOver={isGameOver}
          />
        ))
      )}
    </div>
  );
};

export default MinesweeperGrid;