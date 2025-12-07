export const getEmptyGrid = (size) =>
    Array.from({ length: size }, () => Array(size).fill(0));
