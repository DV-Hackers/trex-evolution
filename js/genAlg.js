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
      agents.push(new Agent(phrase.length));
    }
    calcFitness();


    this.matingPool = [];
  }

  calcFitness()
  {
    for (let i = 0; i < this.agents.length; i ++)
    {
      agents[i].calcFit(this.findPhrase);
    }
  }

  buildMatingPool()
  {
    let amt = 100;
    for (let i = 0; i < popAmt; i++)
    {
      let addAmt = agents[i].fitness * amt;
      for (let j = 0; j < addAmt; j++)
        this.matingPool.push(agents[i]);
    }
  }

  reproduce(mr)
  {
    for (let i = 0; i < agents.length; i++)
    {
      let parent1 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let parent2 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let child = parent1.crossOver(parent2);
      child = child.mutate(mr);
    }
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
      phrase.pushback(getRandomChar());
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
    let child = new Agent(this.phase.length);
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
    for (let i = 0; i < this.phase.length; i++)
    {
      if (Math.random() <= mutationRate)
      {
        this.phrase[i] = getRandomChar();
      }
    }
  }
}

//driver code
console.log("hi");
