import React from 'react';
import FifteenTile from './FifteenTile';

const FifteenBoard = ({ tiles, rows, cols, onTileClick }) => {
    return (
        <div
            className='grid gap-2 bg-violet-200 p-4 rounded'
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {tiles.map((tile, index) => (
                <FifteenTile
                    key={index}
                    tile={tile}
                    onClick={() => tile !== null && onTileClick(index)}
                />
            ))}
        </div>
    );
};

export default FifteenBoard;
