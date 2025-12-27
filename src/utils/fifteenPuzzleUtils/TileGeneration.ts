import { getTargetOrder } from "./GameModes";
import { FifteenTileType } from "@/types/fifteenPuzzle";

export const generateSolvableTiles = (rows: number, cols: number, gameMode: number) => {
    let tiles: FifteenTileType[] = [];
    const targetOrder = getTargetOrder(rows, cols, gameMode);
    const targetParity = getParity(targetOrder, rows, cols);

    do {
        tiles = shuffleTiles(targetOrder);
    } while (getParity(tiles, rows, cols) !== targetParity);

    return tiles;
};

const getParity = (tiles: FifteenTileType[], rows: number, cols: number) => {
    const inversions = countInversions(tiles);
    const emptyIndex = tiles.indexOf(null);
    const emptyRowFromBottom = rows - Math.floor(emptyIndex / cols);


    let parity = inversions;

    if (cols % 2 === 0) {
        parity += emptyRowFromBottom;
    }

    return parity % 2;
};

const countInversions = (tiles: FifteenTileType[]) => {
    const flatTiles = tiles.filter((tile) => tile !== null);
    let count = 0;

    for (let i = 0; i < flatTiles.length; i++) {
        for (let j = i + 1; j < flatTiles.length; j++) {
            if (flatTiles[i] > flatTiles[j]) count++;
        }
    }

    return count;
};

const shuffleTiles = (tiles: FifteenTileType[]) => {
    const shuffled = [...tiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};