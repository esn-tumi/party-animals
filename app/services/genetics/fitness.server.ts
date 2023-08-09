import { Registration, User } from '~/generated/prisma';
import { Chromosome } from '~/services/genetics/chromosome.server';

export class FitnessEvaluator {
  private registrations: Map<string, Registration & { user: User }>;
  readonly targetSize: number;

  constructor(
    registrations: (Registration & { user: User })[],
    targetSize = 22
  ) {
    this.targetSize = targetSize;
    this.registrations = new Map();
    for (const registration of registrations) {
      this.registrations.set(registration.id, registration);
    }
  }

  public evaluateFitness(chromosome: Chromosome): number {
    const groupAssignments = chromosome.getGenes();
    const groupFitness = new Map<string, number>();
    for (const [group, registrations] of groupAssignments) {
      if (group === 'X') {
        continue;
      }
      groupFitness.set(group, this.getGroupFitness(registrations));
    }
    return (
      Array.from(groupFitness.values()).reduce((a, b) => a + b, 0) /
      groupFitness.size
    );
  }

  private getGroupFitness(registrationIds: string[]) {
    let maxFitness = 200;
    let achievedFitness =
      200 - Math.abs(this.targetSize - registrationIds.length) * 10;
    const registrations = registrationIds.map((id) =>
      this.registrations.get(id)
    );

    // Check how many different countries are represented
    const countries = new Set<string>();
    for (const registration of registrations) {
      countries.add(registration?.country ?? '');
    }
    achievedFitness += countries.size * 3;
    maxFitness += registrations.length * 3;

    // Check if the genders are balanced
    const maleCount = registrations.filter(
      (registration) => registration?.gender === 'm'
    ).length;
    const otherCount = registrations.length - maleCount;
    maxFitness += 100;
    achievedFitness += Math.max(100 - Math.abs(maleCount - otherCount) * 5, 0);

    // Check if the group has many exchange students
    maxFitness += registrations.length * 3;
    registrations.forEach((registration) => {
      switch (registration?.status) {
        case 'l':
          achievedFitness += 1;
          break;
        case 'i':
          achievedFitness += 2;
          break;
        case 'o':
          achievedFitness += 2.5;
          break;
        case 'e':
          achievedFitness += 3;
          break;
        default:
          achievedFitness += 0;
      }
    });

    return Math.max(achievedFitness / maxFitness, 0);
  }
}
