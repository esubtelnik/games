import { FifteenTileType } from "@/types/fifteenPuzzle";

export const getTargetOrder = (
   rows: number,
   cols: number,
   gameMode: number
) => {
   switch (gameMode) {
      case 2:
         return generateSnakeOrder(rows, cols);
      case 3:
         return generateSpiralOrder(rows, cols);
      default:
         return [
            ...Array.from({ length: rows * cols - 1 }, (_, i) => i + 1),
            null,
         ];
   }
};

const generateSnakeOrder = (rows: number, cols: number) => {
   const order: FifteenTileType[] = [];
   let counter = 1;
   for (let i = 0; i < rows; i++) {
      const row: FifteenTileType[] = [];
      for (let j = 0; j < cols; j++) {
         if (counter <= rows * cols - 1) {
            row.push(counter++);
         } else {
            row.push(null);
         }
      }
      if (i % 2 === 1) {
         row.reverse();
      }
      order.push(...row);
   }
   return order;
};

const generateSpiralOrder = (rows: number, cols: number) => {
   const order: FifteenTileType[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(null)
   );
   let counter = 1;
   let top = 0,
      bottom = rows - 1,
      left = 0,
      right = cols - 1;
   while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) {
         if (counter <= rows * cols - 1) {
            order[top][i] = counter++;
         } else {
            order[top][i] = null;
         }
      }
      top++;

      for (let i = top; i <= bottom; i++) {
         if (counter <= rows * cols - 1) {
            order[i][right] = counter++;
         } else {
            order[i][right] = null;
         }
      }
      right--;

      if (top <= bottom) {
         for (let i = right; i >= left; i--) {
            if (counter <= rows * cols - 1) {
               order[bottom][i] = counter++;
            } else {
               order[bottom][i] = null;
            }
         }
         bottom--;
      }

      if (left <= right) {
         for (let i = bottom; i >= top; i--) {
            if (counter <= rows * cols - 1) {
               order[i][left] = counter++;
            } else {
               order[i][left] = null;
            }
         }
         left++;
      }
   }
   return order.flat();
};
