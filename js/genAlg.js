class Population
{
  constructor(pop, mutRate, phrase)
  {
    this.findPhrase = phrase;
    this.popAmt = pop;
    this.mutationRate = mutRate;

    this.agents = [];
    for (let i = 0; i < this.popAmt; i++)
    {
      this.agents.push(new Agent(phrase.length));
    }
    this.calcFitness();


    this.matingPool = [];
  }

  calcFitness()
  {
    let totalFit = 0;
    for (let i = 0; i < this.agents.length; i++)
    {
      this.agents[i].calcFit(this.findPhrase);
      totalFit += this.agents[i].fitness;
    }

    for (let i = 0; i < this.agents.length; i++)
    {
        this.agents[i].fitness = this.agents[i].fitness / totalFit;
    }
  }

  buildMatingPool()
  {
    let amt = 100;
    for (let i = 0; i < amt; i++)
    {
      let addAmt = this.agents[i].fitness * amt;
      for (let j = 0; j < addAmt; j++)
        this.matingPool.push(this.agents[i]);
    }
  }

  reproduce(mr)
  {
    for (let i = 0; i < this.agents.length; i++)
    {
      let parent1 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let parent2 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let child = parent1.crossOver(parent2);
      child.mutate(mr);
      return child;
    }
  }

  newPopulation()
  {
    let done = false;

      console.log(this.agents);
      this.calcFitness();
      this.buildMatingPool();
      let newPop = [];
      for (let i = 0; i < this.agents.length; i++)
      {
        let child = this.reproduce(this.mutationRate);

        newPop.push(child);
      }
      this.agents = newPop;
    }
  }


class Agent
{
  constructor (phraseLen)
  {
    this.fitness;
    this.phrase = [];
    for (let i = 0; i < phraseLen; i++)
    {
      this.phrase.push(this.getRandomChar());
    }
  }

  getRandomChar()
  {
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
    let charactersLength = characters.length;

    return characters[(Math.floor(Math.random() * charactersLength))];
  }

  calcFit(phrase)
  {
    let same = 0;
    for (let i = 0; i < phrase.length; i++)
    {
      if (phrase[i] === this.phrase[i])
        same++;
    }
    this.fitness = same / phrase.length;
  }


  crossOver(other)
  {
    let child = new Agent(this.phrase.length);
    for (let i = 0; i < this.phrase.length; i++)
    {
      if (Math.random() > 0.5)
      {
        child.phrase[i] = this.phrase[i];
      }
      else
      {
        child.phrase[i] = other.phrase[i];
      }
    }
    return child;
  }

  mutate(mutationRate)
  {
    for (let i = 0; i < this.phrase.length; i++)
    {
      if (Math.random() <= mutationRate)
      {
        this.phrase[i] = this.getRandomChar();
      }
    }
  }
}

//driver code
console.log("hi");
let pop = new Population(200, 0.01, "hello world");
pop.newPopulation();
for (let i = 0; i < 100; i++)
  pop.newPopulation();
