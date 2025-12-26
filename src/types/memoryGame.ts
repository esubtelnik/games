export interface ICard {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  
  export type MemoryGridType = ICard[];
  
  export enum GameStatus {
    IDLE = 'idle',
    PLAYING = 'playing',
    WON = 'won'
  }
  
  export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
  }
  
  export interface IDifficultyConfig {
    pairs: number;
    gridCols: number;
  }
  
  export const DIFFICULTY_CONFIGS: Record<Difficulty, IDifficultyConfig> = {
    [Difficulty.EASY]: { pairs: 6, gridCols: 4 },
    [Difficulty.MEDIUM]: { pairs: 8, gridCols: 4 },
    [Difficulty.HARD]: { pairs: 12, gridCols: 4 }
  };
  
  export const CARD_EMOJIS = [
    '🎮', '🎯', '🎲', '🎪', '🎨', '🎭',
    '🎸', '🎹', '🎺', '🎻', '🎬', '🎤',
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐',
    '🍕', '🍔', '🍟', '🌭', '🍿', '🧁',
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️',
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊'
  ];