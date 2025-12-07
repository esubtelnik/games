import React from 'react';
import Tile from './Tile';
import { TwentyFortyEightGridType } from '@/types/twentyFortyEight';


interface GridProps {
  data: TwentyFortyEightGridType;
}

const Grid = ({ data }: GridProps) => {
  return (
    <div
      className="bg-[#bbada0] p-5 rounded-lg"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${data.length}, 1fr)`,
        gridTemplateColumns: `repeat(${data[0].length}, 1fr)`,
        gap: '15px',
      }}
    >
      {data.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((digit, colIndex) => (
            <div
              key={colIndex}
              className="flex items-center justify-center"
            >
              <Tile num={digit} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Grid;
