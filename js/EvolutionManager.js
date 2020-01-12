class TrexManager
{
  constructor(numAgents, mutRate, neuralLayers)
  {
    this.population = [];
    this.distances = []
    this.mutationRate = mutRate;
    this.matingPool = [];
    this.gameObject = new Game(); // Game class needs to be created/finished

    for (let i = 0; i < numAgents; i++)
    {
      this.population.push(new NN(neuralLayers, activationFunction));
    }

    this.calcFitness();
  }

  activationFunction()
  {
    // for the neural network
  }

  startTrial(participantIndex)
  {
    gameObject.startGame();
    while (gameObject.isRunning())
    {
      let obType = gameObject.getNextObstacleType();
      let obDist = gameObject.getNextObstacleDist();
      let jumpDecision = this.population[participantIndex].ff([obType, obDist]);

      if (jumpDecision) // deciding to jump could be the number 1 or a range like 0.9 to 1
        gameObject.jump();
    }

    return gameObject.getFinalDistance();
  }

  calcFitness()
  {
    this.distances = [];
    for (let i = 0; i < this.population.length; i++)
    {
      let tempDist = startTrial(i);
      this.distances.push(tempDist);
    }
  }

  buildMatingPool()
  {
    this.matingPool = []; // empty the old pool

    let totalDist = 0;
    for (let k = 0; k < this.distances.length; k++)
    {
      totalDist += this.distances[k];
    }

    let amt = this.population.length * 3;
    for (let i = 0; i < this.population.length; i++)
    {
      let addAmt = this.distances[i] / totalDist * amt;
      for (let j = 0; j < addAmt; j++)
        this.matingPool.push(i);
    }
  }

  reproduce()
  {
    for (let i = 0; i < this.population.length; i++)
    {
      let parent1Index = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let parent2Index = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let child = this.population[parent1Index].crossOver(this.population[parent2Index]);
      child.mutate(this.mutationRate);

      return child;
    }
  }

  evalPop()
  {
    // no stopping condition
  }

  newPopulation()
  {
    this.buildMatingPool();
    let newPop = [];

    for (let i = 0; i < this.population.length; i++)
    {
      let child = this.reproduce();
      newPop.push(child);
    }

    this.population = newPop;
    this.calcFitness();
  }
}
