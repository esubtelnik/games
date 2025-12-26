export interface IGame {
  id: number;
  type: GameType;
  name: string;
  icon: React.ElementType | React.ReactNode;
  description: string;
  color: string;
  route: string;
}

export enum GameType {
  TWENTY48 = "twentyFortyEight",
  SUDOKU = "sudoku",
  FIFTEEN_PUZZLE = "fifteenPuzzle",
  MEMORY_GAME = "memoryGame",
}

export interface IActiveSave {
  twentyFortyEight: boolean;
}