//simport Brain from "./Brain.js"

class Population
{
  constructor(popSize, mutRate)
  {
    this.size = popSize;
    this.mutationRate = mutRate;
    this.brains = [];

    for (let i = 0; i < this.size; i++)
    {
      this.brains.push(new Brain());
    }
  }

  newGeneration()
  {
    console.log("new generation");
    let parentPool = this.createParentPool();
    let newPop = [];

    for (let i = 0; i < this.size; i++)
    {
      let parent1Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      let parent2Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      let child = this.brains[parent1Index].reproduce(this.brains[parent2Index]);
      newPop.push(child);
    }

    this.brains = newPop;
  }

  createParentPool()
  {
    let parentPool = [];

    let totalFitnessSum = 0;
    this.brains.forEach(brain => totalFitnessSum += brain.getFitness());

    let parentPoolSize = this.size * 3;
    for (let i = 0; i < this.size; i++)
    {
      let addAmount = this.brains[i].getFitness() / totalFitnessSum * parentPoolSize;
      for (let j = 0; j < addAmount; j++)
        parentPool.push(i);
    }

    return parentPool;
  }
}

// testing
/*
let pop = new brains(5, 0.50);
pop.brains[0].setFitness(0.05);
pop.brains[1].setFitness(0.1);
pop.brains[2].setFitness(0.1);
pop.brains[3].setFitness(0.25);
pop.brains[4].setFitness(0.5);

pop.brains.forEach(brain => console.log(brain.getFitness()));
pop.newGeneration();
pop.brains.forEach(brain => console.log(brain.getFitness()));
*/
