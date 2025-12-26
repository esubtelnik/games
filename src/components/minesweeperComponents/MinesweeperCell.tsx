// src/components/minesweeperComponents/MinesweeperCell.tsx
'use client';
import { FC } from 'react';
import { ICell } from '@/types/minesweeper';
import { Flag, Bomb } from 'lucide-react';

interface IMinesweeperCellProps {
  cell: ICell;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  isGameOver: boolean;
}

const MinesweeperCell: FC<IMinesweeperCellProps> = ({
  cell,
  onClick,
  onRightClick,
  isGameOver
}) => {
  const getNumberColor = (num: number) => {
    const colors: Record<number, string> = {
      1: 'text-blue-600',
      2: 'text-green-600',
      3: 'text-red-600',
      4: 'text-purple-600',
      5: 'text-orange-600',
      6: 'text-cyan-600',
      7: 'text-black',
      8: 'text-gray-600'
    };
    return colors[num] || 'text-gray-600';
  };

  const getCellContent = () => {
    if (cell.isFlagged && !cell.isRevealed) {
      return <Flag className="w-5 h-5 text-red-600" fill="currentColor" />;
    }

    if (cell.isRevealed) {
      if (cell.isMine) {
        return <Bomb className="w-5 h-5 text-red-600" />;
      }
      if (cell.neighborMines > 0) {
        return (
          <span className={`font-bold text-lg ${getNumberColor(cell.neighborMines)}`}>
            {cell.neighborMines}
          </span>
        );
      }
    }

    if (isGameOver && cell.isMine && !cell.isRevealed) {
      return <Bomb className="w-5 h-5 text-gray-500" />;
    }

    return null;
  };

  const getCellStyle = () => {
    if (cell.isRevealed) {
      return cell.isMine
        ? 'bg-red-200 border-red-300'
        : 'bg-gray-200 border-gray-300';
    }
    return 'bg-gradient-to-br from-neutral-400 to-neutral-500 hover:from-neutral-500 hover:to-neutral-600 border-neutral-600 shadow-md cursor-pointer';
  };

  return (
    <button
      onClick={onClick}
      onContextMenu={onRightClick}
      disabled={cell.isRevealed}
      className={`
        w-10 h-10 border-2 rounded-md flex items-center justify-center
        transition-all duration-150 active:scale-95
        ${getCellStyle()}
      `}
    >
      {getCellContent()}
    </button>
  );
};

export default MinesweeperCell;