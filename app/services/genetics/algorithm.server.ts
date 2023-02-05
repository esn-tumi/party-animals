import { Registration, User } from '~/generated/prisma';
import { Population } from '~/services/genetics/population.server';
import { Chromosome } from '~/services/genetics/chromosome.server';

export class GeneticAlgorithm {
  private population: Population;

  constructor(
    popSize: number,
    positions: string[],
    options: string[],
    registrations: (Registration & { user: User })[]
  ) {
    console.log('Initializing population');
    console.log(`Population size: ${popSize}`);
    console.log(`Positions: ${positions.length}`);
    console.log(`Options: ${options.length}`);
    this.population = new Population(
      popSize,
      positions,
      options,
      registrations
    );
  }

  public run(numGenerations: number): void {
    let lastFitness = 0;
    for (let i = 0; i < numGenerations; i++) {
      const fitness = this.population.evaluateFitness();
      if (fitness === lastFitness) {
        console.log(`Fitness has not changed, stopping at generation ${i}`);
        break;
      }
      lastFitness = fitness;
      if (i % 50 === 0) {
        console.log(`Generation ${i}: ${fitness}`);
      }
      this.population.generateNewPopulation();
    }
  }

  public getFittest(): Chromosome {
    return this.population.getFittest();
  }
}
