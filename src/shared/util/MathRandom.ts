export const MathRandom = (start: number, end: number) => {
  return Math.round(Math.random() * (end - start) + start);
};
