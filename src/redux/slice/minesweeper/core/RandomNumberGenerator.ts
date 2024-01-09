export class RandomNumberGenerator {
  private seedDescendant: number;
  private min: number;
  private max: number;

  constructor(seed: number, min: number, max: number) {
    console.assert(seed !== 0, "seed cannot be 0, defaulting to 1");
    this.seedDescendant = seed === 0 ? 1 : seed;
    this.min = min;
    this.max = max;
  }

  public generate(): number {
    this.seedDescendant = (this.seedDescendant * 9301 + 49297) % 233280;
    const rnd = this.seedDescendant / 233280;
    return this.min + rnd * (this.max - this.min);
  }
}
