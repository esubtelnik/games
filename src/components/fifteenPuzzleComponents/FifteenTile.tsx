import { FifteenTileType } from '@/types/fifteenPuzzle';
import React from 'react';

interface FifteenTileProps {
    tile: FifteenTileType;
    onClick: () => void;
}

const FifteenTile = ({ tile, onClick }: FifteenTileProps) => {
    if (tile === null) {
        return (
            <div className="h-16 w-16 bg-violet-300 rounded opacity-50" />
        );
    }

    return (
        <button
            onClick={onClick}
            className="h-16 w-16 text-lg font-bold rounded bg-violet-600 text-white hover:bg-violet-800 cursor-pointer"
        >
            {tile}
        </button>
    );
};

// ВАЖНО: Оборачиваем в React.memo!
export default React.memo(FifteenTile);