class Matrix {

}

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
    let output = Matrix.arrayToMatrixVector(x); // inputs has to be a matrix to use the matrix class for multiplication

    for (let i = 0; i < this.weights.length; i++)
    {
      // local variable to store the output at each layer of the neural network
      let tempOut;
      // do the matrix mult of inputs and the correct weight matrix, include activation and biases
      tempOut = this.weights[i].mult(inputs);
      tempOut.add(biases[i]);
      tempOut.applyActivation(activation);

      inputs = tempOut;
    }

    return output;
  }

  crossover(other) {}
  mutate() {}
}
