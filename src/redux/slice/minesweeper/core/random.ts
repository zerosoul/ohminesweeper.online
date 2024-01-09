import { RandomNumberGenerator } from "./types";

/** Create a random number generator callback. */
export function createRandomNumberGenerator(seed: number): RandomNumberGenerator {
  if (seed === 0) {
    console.warn("seed cannot be 0, defaulting to 1");
  }
  let seedDescendant = seed || 1;
  return (max: number = 1, min: number = 0) => {
    seedDescendant = (seedDescendant * 9301 + 49297) % 233280;
    const rnd = seedDescendant / 233280;
    return min + rnd * (max - min);
  };
}
