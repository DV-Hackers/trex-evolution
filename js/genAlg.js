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
    for (let i = 0; i < this.agents.length; i++)
    {
      this.agents[i].calcFit(this.findPhrase);
    }
  }

  buildMatingPool()
  {
    this.matingPool = []; // empty the old pool
    
    let totalFit = 0;
    for (let k = 0; k < this.agents.length; k++)
    {
      totalFit += this.agents[k].fitness;
    }

    let amt = this.popAmt * 3;
    for (let i = 0; i < this.agents.length; i++)
    {
      let addAmt = this.agents[i].fitness / totalFit * amt;
      for (let j = 0; j < addAmt; j++)
        this.matingPool.push(this.agents[i]);
    }
  }

  reproduce()
  {
    for (let i = 0; i < this.agents.length; i++)
    {
      let parent1 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let parent2 = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let child = parent1.crossOver(parent2);
      child.mutate(this.mutationRate);
      return child;
    }
  }

  evalPop()
  {
    for (let i = 0; i < this.agents.length; i++)
    {
      if (this.agents[i].fitness === 1)
        return this.agents[i];
    }
    return null;
  }

  newPopulation()
  {
    let evaluation = this.evalPop();
    if (evaluation != null)
      return evaluation;

    this.buildMatingPool();
    let newPop = [];
    for (let i = 0; i < this.agents.length; i++)
    {
      let child = this.reproduce();

      newPop.push(child);
    }
    this.agents = newPop;
    this.calcFitness();
    return null;
  }
}


class Agent
{
  constructor(phraseLen)
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
      if (Math.random() < mutationRate)
      {
        this.phrase[i] = this.getRandomChar();
      }
    }
  }
}

//driver code
console.log("test");
let pop = new Population(400, 0.01, "hello world");
let eval = pop.evalPop();
let x = 0;
while (eval === null)
{
  eval = pop.newPopulation();
  x++;
}
console.log(eval);
console.log(x);
console.log(pop.matingPool.length);
