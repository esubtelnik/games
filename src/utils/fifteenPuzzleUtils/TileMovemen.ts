import { FifteenTileType } from "@/types/fifteenPuzzle";

export const canMoveTile = (index: number, emptyIndex: number, rows: number, cols: number) => {
    const validMoves = [
        emptyIndex - cols, 
        emptyIndex + cols, 
        emptyIndex - 1,    
        emptyIndex + 1,    
    ];

    if (index % cols === 0 && emptyIndex === index - 1) return false; 
    if (index % cols === cols - 1 && emptyIndex === index + 1) return false;

    return validMoves.includes(index);
};

export const moveTile = (tiles: FifteenTileType[], index: number, emptyIndex: number) => {
    const newTiles = [...tiles];
    newTiles[emptyIndex] = tiles[index];
    newTiles[index] = null;
    return newTiles;
};