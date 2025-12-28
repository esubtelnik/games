
import { ICard, MemoryGridType, EMOJI_THEMES } from '@/types/memoryGame';

// export const shuffleArray = <T,>(array: T[]): T[] => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}


export const createGameGrid = (pairCount: number): MemoryGridType => {
  const themes = Object.values(EMOJI_THEMES);
  const theme = getRandomItem(themes);

  if (pairCount > theme.length) {
    throw new Error(
      `Недостаточно эмоджи в теме: нужно ${pairCount}, есть ${theme.length}`
    );
  }

  const selectedEmojis = shuffleArray(theme).slice(0, pairCount);

  const cards: ICard[] = selectedEmojis.flatMap((emoji, index) => [
    {
      id: index * 2,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: index * 2 + 1,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffleArray(cards);
};


export const flipCard = (grid: MemoryGridType, cardId: number): MemoryGridType => {
  return grid.map(card =>
    card.id === cardId ? { ...card, isFlipped: true } : card
  );
};

export const unflipCards = (grid: MemoryGridType, cardIds: number[]): MemoryGridType => {
  return grid.map(card =>
    cardIds.includes(card.id) ? { ...card, isFlipped: false } : card
  );
};

export const markCardsAsMatched = (grid: MemoryGridType, cardIds: number[]): MemoryGridType => {
  return grid.map(card =>
    cardIds.includes(card.id) ? { ...card, isMatched: true } : card
  );
};

export const getFlippedCards = (grid: MemoryGridType): ICard[] => {
  return grid.filter(card => card.isFlipped && !card.isMatched);
};

export const checkWin = (grid: MemoryGridType): boolean => {
  return grid.every(card => card.isMatched);
};

export const checkMatch = (card1: ICard, card2: ICard): boolean => {
  return card1.value === card2.value;
};