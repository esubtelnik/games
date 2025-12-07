import { FC } from 'react';
import SudokuCell from './SudokuCell';


interface ISudokuGridProps {
  grid: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
  initialEditableCells: boolean[][];
}

const   SudokuGrid: FC<ISudokuGridProps> = ({ grid, onCellChange, initialEditableCells }) => {
  if (!grid || grid.length !== 9 || grid.some(row => row.length !== 9)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gap-0 mx-auto border-8 border-dark-blue bg-white">
      {Array.from({ length: 3 }).map((_, blockRowIndex) => (
        <div key={blockRowIndex} className="flex">
          {Array.from({ length: 3 }).map((_, blockColIndex) => {
            const blockStartRow = blockRowIndex * 3;
            const blockStartCol = blockColIndex * 3;

            return (
              <div key={`${blockRowIndex}-${blockColIndex}`} className="grid grid-cols-3 grid-rows-3 border-2 border-dark-blue">
                {Array.from({ length: 3 }).map((_, rowIndex) =>
                  Array.from({ length: 3 }).map((_, colIndex) => {
                    const row = blockStartRow + rowIndex;
                    const col = blockStartCol + colIndex;
                    const value = grid[row][col];
                    const editable = initialEditableCells[row][col];
                    return (
                      <SudokuCell
                        key={`${row}-${col}`}
                        value={value}
                        editable={editable}
                        row={row}
                        col={col}
                        onChange={onCellChange}
                      />
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
