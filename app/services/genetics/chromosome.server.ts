export class Chromosome {
  crossover(partner: Chromosome): Chromosome {
    const newGenes = new Map<string, string>();
    for (const [position, option] of this.genes) {
      if (Math.random() < 0.5) {
        newGenes.set(position, option);
      } else {
        newGenes.set(position, partner.getGene(position));
      }
    }
    return new Chromosome(
      newGenes,
      this.options.filter((o) => o !== 'X')
    );
  }
  // Properties for storing individual's genes
  private readonly genes = new Map<string, string>();
  private readonly options: string[];

  // Initialize the chromosome with random genes
  constructor(positions: string[], options: string[]);
  constructor(genes: Map<string, string>, options: string[]);

  constructor(
    positionsOrGenes: string[] | Map<string, string>,
    options: string[]
  ) {
    this.options = [
      ...options,
      ...Array.from('X'.repeat(Math.floor(options.length))),
    ];
    if (Array.isArray(positionsOrGenes)) {
      for (const position of positionsOrGenes) {
        this.genes.set(
          position,
          this.options[Math.floor(Math.random() * this.options.length)]
        );
      }
    } else {
      this.genes = positionsOrGenes;
    }
  }

  // Get the genes of the chromosome
  public getGenes(): Map<string, string[]> {
    const genes = new Map<string, string[]>();
    for (const option of this.options) {
      genes.set(option, []);
    }
    for (const [position, option] of this.genes) {
      genes.get(option)?.push(position);
    }
    return genes;
  }

  public getGene(position: string): string {
    return this.genes.get(position) ?? '';
  }
}
