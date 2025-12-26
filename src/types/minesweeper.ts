export interface ICell {
   isMine: boolean;
   isRevealed: boolean;
   isFlagged: boolean;
   neighborMines: number;
}

export type MinesweeperGridType = ICell[][];

export enum GameStatus {
   IDLE = "idle",
   PLAYING = "playing",
   WON = "won",
   LOST = "lost",
}

export enum Difficulty {
   EASY = "easy",
   MEDIUM = "medium",
   HARD = "hard",
   CUSTOM = "custom",
}

export interface IDifficultyConfig {
   rows: number;
   cols: number;
   mines: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, IDifficultyConfig> = {
   [Difficulty.EASY]: { rows: 8, cols: 8, mines: 10 },
   [Difficulty.MEDIUM]: { rows: 16, cols: 16, mines: 40 },
   [Difficulty.HARD]: { rows: 16, cols: 30, mines: 99 },
   [Difficulty.CUSTOM]: { rows: 10, cols: 10, mines: 15 },
};
