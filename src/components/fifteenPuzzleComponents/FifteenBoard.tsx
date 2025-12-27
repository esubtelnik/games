import React, { useCallback } from 'react';
import FifteenTile from './FifteenTile';

const FifteenBoard = ({ tiles, rows, cols, onTileClick }) => {
    console.log(tiles);
    const handleTileClick = useCallback((index: number) => {
        if (tiles[index] !== null) {
            onTileClick(index);
        }
    }, [tiles, onTileClick]);

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
                    onClick={() => handleTileClick(index)}
                />
            ))}
        </div>
    );
};

export default FifteenBoard;