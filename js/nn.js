import Matrix from "./matrix.js"

class LiteNN
{
  constructor(layers, activation)
  {
  /*
  layers - a list of ints that signify the number of activations in each layer, first element represents input, last represents output
  activation - activation function for the nn, takes in one number and returns another number
  */
    this.activation = activation;
    this.biases = [new Matrix(layers[1], 1, true)];
    this.weights = [new Matrix(layers[1], layers[0])];

    for (var i = 1; i < layers.length - 1; i++)
    {
      this.weights.push(new Matrix(layers[i+1], layers[i]));
      this.biases.push(new Matrix(layers[i+1], 1, true));
    }
  }

  ff(x)
  {
    /*
    x - list representing input into nn
    */
    let input = Matrix.arrayToMatrixVector(x); // inputs has to be a matrix to use the matrix class for multiplication
      console.log('ff input: '); input.display();
    let layerOutput = input; // equals input to start
    let vectActivation = Matrix.vectorize(activation);

    for (let i = 0; i < this.weights.length; i++)
    {
      // local variable to store the output at each layer of the neural network
      let tempOut;
      // do the matrix mult of inputs and the correct weight matrix, include activation and biases
      tempOut = this.weights[i].mult(layerOutput);
      tempOut.add(this.biases[i]);
      tempOut = vectActivation(tempOut);

      layerOutput = tempOut;

      // testing console logs
      console.log('layer ' + (i+1) + ' output: ');
      layerOutput.display();
    }

    return layerOutput;
  }

  crossover(other) {}
  mutate() {}
}

// testing
let layers = [3, 2, 1];
function activation (x)
{
  return x + 1;
}
let nn = new LiteNN(layers, activation);

let inputs = [10, 20, 30];
let output = nn.ff(inputs);
output.display();
