import { FifteenTileType } from '@/types/fifteenPuzzle';
import React from 'react';

interface FifteenTileProps {
    tile: FifteenTileType;
    onClick: () => void;
}

const FifteenTile = ({ tile, onClick }: FifteenTileProps) => {
    return (
        <button
            onClick={onClick}
            className={`h-16 w-16 text-lg font-bold rounded ${
                tile === null
                    ? 'bg-violet-300'
                    : 'bg-violet-600 text-white hover:bg-violet-800'
            }`}
        >
            {tile}
        </button>
    );
};

export default FifteenTile;
