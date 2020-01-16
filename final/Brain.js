import NeuralNetwork from "./NeuralNetwork.js"

class Brain
{
  constructor(nn)
  {
    this.fitness = 0;

    if (nn === undefined)
    {
      this.nn = new NeuralNetwork();
    }
    else
      this.nn = nn;
  }

  generateAction(/*obstacle*/ obType, obDist)
  {
    // uses NN feedforward with obstacle type and distance
    return this.nn.feedForward([obType, obDist]);
  }

  reproduce(other, mutationRate) //returns a new Brain
  {
    //new nn is result of crossover called with this.nn and other.nn
    let childNN = this.nn.crossOver(other.getNeuralNetwork());
    childNN.mutate(mutationRate);
    let childBrain = new Brain(childNN);

    return childBrain;
  }

  getFitness()
  {
    return this.fitness;
  }

  setFitness(fitness)
  {
    this.fitness = fitness;
  }

  getNeuralNetwork()
  {
    return this.nn;
  }
}

/*
let b1 = new Brain();
console.log('displaying b1 nn: ');
b1.getNeuralNetwork().display();

let b2 = new Brain();
console.log('displaying b2 nn: ');
b2.getNeuralNetwork().display();

let b3 = b1.reproduce(b2, 0.50);
console.log('displaying b3 nn: ');
b3.getNeuralNetwork().display();

b3.generateAction(2, 25);
*/

export default Brain
