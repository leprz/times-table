export interface Equation {
  operandA: number;
  operandB: number;
  product: number;
}

export class MultiplicationGenerator {
  private static generate(
    multiplicand: number,
    multiplier: number
  ): Equation {
    return {
      operandA: multiplicand,
      operandB: multiplier,
      product: multiplicand * multiplier,
    };
  }

  static list(
    minMultiplicand: number,
    maxMultiplicand: number,
    minMultiplier: number,
    maxMultiplier: number,
    count = 1
  ): Equation[] {
    return Array.from({ length: count }, (_, index) => {
      if (minMultiplicand === maxMultiplicand) {
        return MultiplicationGenerator.generate(
          minMultiplicand,
          minMultiplier + index
        );
      }

      if (minMultiplier === maxMultiplier) {
        return MultiplicationGenerator.generate(
          minMultiplicand + index,
          minMultiplier
        );
      }

      const multiplicand =
        Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) +
        minMultiplicand;
      const multiplier =
        Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
        minMultiplier;
      return MultiplicationGenerator.generate(multiplicand, multiplier);
    });
  }
}

export class Randomizer {
  static randomizeArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
