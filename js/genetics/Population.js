//simport Brain from "./Brain.js"
const maxOldTopBrains = 50;

class Population
{
  constructor(popSize, mutRate, brainSeed)
  {
    this.size = popSize;
    this.mutationRate = mutRate;
    this.brains = [];
    this.oldTopBrains = [];

    let seedBrainCount = 0;
    if (brainSeed instanceof Array)
    {
      brainSeed.forEach(seed => this.brains.push(new Brain(seed)))
      seedBrainCount = brainSeed.length;
    }

    for (let i = 0; i < this.size - seedBrainCount; i++)
    {
      this.brains.push(new Brain());
    }
  }

  newGeneration()
  {
    this.processTopBrains();
    let newPop = Array.from(this.oldTopBrains); // initialize with the previous top scorers
    let parentPool = this.createParentPool();

    for (let i = newPop.length; i < this.size; i++)
    {
      let parent1Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      let parent2Index = parentPool[Math.floor(Math.random() * parentPool.length)];
      while (parent1Index === parent2Index)
        parent2Index = parentPool[Math.floor(Math.random() * parentPool.length)];

      let child = this.brains[parent1Index].reproduce(this.brains[parent2Index], this.mutationRate);
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

  processTopBrains()
  {
    let topBrain = this.brains[this.oldTopBrains.length];
    for (let j = this.oldTopBrains.length + 1; j < this.brains.length; j++)
    {
      if (this.brains[j].fitness > topBrain.fitness)
        topBrain = this.brains[j];
    }

    if (this.oldTopBrains.length === maxOldTopBrains) // max number of top brains reached
    {
      // find the worst top brain
      let lowestTopIndex = 0;
      for (let i = 1; i < this.oldTopBrains.length; i++)
      {
        if (this.oldTopBrains[i].fitness < this.oldTopBrains[lowestTopIndex].fitness)
        {
          lowestTopIndex = i;
        }
      }

      // replace the worst top brain with the most recent best, if it is better
      if (topBrain.fitness > this.oldTopBrains[lowestTopIndex].fitness)
      {
        this.oldTopBrains.splice(lowestTopIndex, 1);
        this.oldTopBrains.push(topBrain);
      }
    }
    else // max number of top brains not reached
      this.oldTopBrains.push(topBrain);
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
