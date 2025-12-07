import { getTargetOrder } from "./GameModes";
import { FifteenTileType } from "@/types/fifteenPuzzle";

   export const checkWin = (tiles: FifteenTileType[], rows: number, cols: number, gameMode: number) => {
    const correctOrder = getTargetOrder(rows, cols, gameMode);
    return tiles.every((tile, index) => tile === correctOrder[index]);
};