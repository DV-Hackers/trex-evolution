import Brain from "./Brain.js"

class Population
{
  constructor(popSize, mutRate)
  {
    this.size = popSize;
    this.mutationRate = mutRate;
    this.population = [];

    for (let i = 0; i < this.size; i++)
    {
      this.population.push(new Brain());
    }
  }

  newGeneration()
  {
    let parentPool = this.createParentPool();
    let newPop = [];

    for (let i = 0; i < this.size; i++)
    {
      let parent1Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      let parent2Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      let child = this.population[parent1Index].reproduce(this.population[parent2Index]);
      newPop.push(child);
    }

    this.population = newPop;
  }

  createParentPool()
  {
    let parentPool = [];

    let totalFitnessSum = 0;
    this.population.forEach(brain => totalFitnessSum += brain.getFitness());

    let parentPoolSize = this.size * 3;
    for (let i = 0; i < this.size; i++)
    {
      let addAmount = this.population[i].getFitness() / totalFitnessSum * parentPoolSize;
      for (let j = 0; j < addAmount; j++)
        parentPool.push(i);
    }

    return parentPool;
  }
}

// testing
/*
let pop = new Population(5, 0.50);
pop.population[0].setFitness(0.05);
pop.population[1].setFitness(0.1);
pop.population[2].setFitness(0.1);
pop.population[3].setFitness(0.25);
pop.population[4].setFitness(0.5);

pop.population.forEach(brain => console.log(brain.getFitness()));
pop.newGeneration();
pop.population.forEach(brain => console.log(brain.getFitness()));
*/
