import { Registration, User } from '~/generated/prisma';
import { Chromosome } from '~/services/genetics/chromosome.server';
import { FitnessEvaluator } from '~/services/genetics/fitness.server';

export class Population {
  private readonly individuals: Chromosome[];
  private readonly populationSize: number;
  private fitnessEvaluator: FitnessEvaluator;

  // Initialize the population with a given size
  constructor(
    popSize: number,
    positions: string[],
    options: string[],
    registrations: (Registration & { user: User })[]
  ) {
    this.individuals = [];
    this.populationSize = popSize;
    this.fitnessEvaluator = new FitnessEvaluator(registrations);
    for (let i = 0; i < popSize; i++) {
      this.individuals[i] = new Chromosome(positions, options);
    }
  }

  public evaluateFitness(): number {
    let totalFitness = 0;
    for (const individual of this.individuals) {
      totalFitness += this.fitnessEvaluator.evaluateFitness(individual);
    }
    return totalFitness / this.populationSize;
  }

  public generateNewPopulation(): void {
    const matingPool = [];
    for (const individual of this.individuals) {
      const fitness = this.fitnessEvaluator.evaluateFitness(individual);
      for (let i = 0; i < fitness * 100; i++) {
        matingPool.push(individual);
      }
    }
    for (let i = 0; i < this.populationSize; i++) {
      const parent1 = matingPool[Math.floor(Math.random() * matingPool.length)];
      const parent2 = matingPool[Math.floor(Math.random() * matingPool.length)];
      this.individuals[i] = parent1.crossover(parent2);
    }
  }

  getFittest(): Chromosome {
    let fittest = this.individuals[0];
    for (const individual of this.individuals) {
      if (
        this.fitnessEvaluator.evaluateFitness(individual) >
        this.fitnessEvaluator.evaluateFitness(fittest)
      ) {
        fittest = individual;
      }
    }
    return fittest;
  }
}
