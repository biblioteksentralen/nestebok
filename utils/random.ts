export function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function seededRandomFromArray<T>(array: T[], seed: string): T {
  return array[Math.floor(seededRandom(seed) * array.length)];
}

// Returns a pseudo-random floating-point number in the range [0.0 -> 1.0] from a string seed
export function seededRandom(seed: string) {
  // Oversetter ikke-numeriske tegn til tall så de kan brukes som seed
  const numericSeed = Number(seed.replace(/\D/g, (match) => `${match.charCodeAt(0)}`));
  const x = Math.sin(numericSeed) * 3333;
  return x - Math.floor(x);
}
