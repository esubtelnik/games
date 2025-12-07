import { swipeLeft, swipeRight, swipeUp, swipeDown } from './SwipeFunctions';
import cloneDeep from 'lodash.clonedeep';

export const checkIfGameOver = (grid) => {
    const moves = [swipeLeft, swipeRight, swipeUp, swipeDown];
    return moves.every((move) => {
        const simulatedGrid = cloneDeep(grid);
        const result = move(
            simulatedGrid,
            () => {},
            () => {},
            () => {},
            true
        );
        return JSON.stringify(simulatedGrid) === JSON.stringify(result);
    });
};
