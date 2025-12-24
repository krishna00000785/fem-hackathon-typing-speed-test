export const getBestScore = (key: string): number => {
  const value = localStorage.getItem(key);
  return value ? Number(value) : 0;
};

export const setBestScore = (key: string, score: number) => {
  localStorage.setItem(key, String(score));
};