import { FifteenTileType } from "@/types/fifteenPuzzle";

export const canMoveTile = (index: number, emptyIndex: number, rows: number, cols: number) => {
    const rowDiff = Math.floor(index / cols) - Math.floor(emptyIndex / cols);
    const colDiff = (index % cols) - (emptyIndex % cols);

    const isAdjacent = (Math.abs(rowDiff) === 1 && colDiff === 0) || 
                       (Math.abs(colDiff) === 1 && rowDiff === 0);

    return isAdjacent;
};

export const moveTile = (
   tiles: FifteenTileType[],
   index: number,
   emptyIndex: number
) => {
   const newTiles = [...tiles];
   newTiles[emptyIndex] = tiles[index];
   newTiles[index] = null;
   return newTiles;
};
