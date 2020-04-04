//import Matrix from "./Matrix.js"

const defaultLayers = [2, 2, 1];

class NeuralNetwork
{
  constructor(lay, act)
  {
    this.weights = [];
    this.biases = [];

    if (lay instanceof NeuralNetwork) // copy constructor condition
    {
      let oldNN = lay;
      //oldNN.weights.forEach(wt => this.weights.push(wt.copy()));
      //oldNN.biases.forEach(bs => this.biases.push(bs.copy()));
      oldNN.weights.forEach(wt => this.weights.push(new Matrix(wt)));
      oldNN.biases.forEach(bs => this.biases.push(new Matrix(bs)));
      this.layers = oldNN.layers;
      this.activation = oldNN.activation;
      return;
    }

    if (lay === undefined) // no layer configuration specified
      lay = defaultLayers;

    if (act === undefined) // no activation function specified
      act = Math.tanh;

    this.layers = lay;
    this.activation = act;
    for (let i = 0; i < this.layers.length - 1; i++)
    {
      this.weights.push(new Matrix(this.layers[i+1], this.layers[i]));
      this.biases.push(new Matrix(this.layers[i+1], 1/*, true*/));
    }
  }

  feedForward(x)
  {
    let input = Matrix.arrayToMatrixVector(x); // inputs has to be a matrix to use the matrix class for multiplication
      //console.log('ff input: '); input.display();
    let layerOutput = input; // equals input to start
    let vectActivation = Matrix.vectorize(this.activation);

    for (let i = 0; i < this.weights.length; i++)
    {
      // local variable to store the output at each layer of the neural network
      let tempOut;
      // do the matrix mult of inputs and the correct weight matrix, include activation and biases
      tempOut = this.weights[i].mult(layerOutput);
        //console.log('weights: ' + (i+1)); this.weights[i].display();
      tempOut.add(this.biases[i]);
        //console.log('biases: ' + (i+1)); this.biases[i].display();
      tempOut = vectActivation(tempOut);

      layerOutput = tempOut;

      // testing console logs
      //console.log('layer ' + (i+1) + ' output: ');
      //layerOutput.display();
    }

    return layerOutput;
  }

  crossOver(other)
  {
    //returns a new nn which is the average of this and other
    let child = new NeuralNetwork(this);

    let index = 0;
    child.weights.forEach(wt => {wt.add(other.weights[index++]); wt.scalarMult(0.5);}); // average weights
    index = 0;
    child.biases.forEach(bs  => {bs.add(other.biases[index++]);  bs.scalarMult(0.5);}); // average biases

    return child;
  }

  mutate(mutRate)
  {
      // call mutate one for each weight and bias matrix
      this.weights.forEach(wt => NeuralNetwork.mutateOneMatrix(wt, mutRate));
      this.biases.forEach(bs => NeuralNetwork.mutateOneMatrix(bs, mutRate));
  }

  static mutateOneMatrix(matrix, mutRate)
  {
    let rows = matrix.getRows();
    let cols = matrix.getCols();

    for (let i = 0; i < rows; i++)
    {
      for (let j = 0; j < cols; j++)
      {
        let mutChance = Math.random();
        if (mutChance < mutRate) // mutate the element
        {
          if (mutChance < mutRate/2)
            matrix.set(i, j, matrix.get(i, j) + Math.random()); // mutate by addition
          else
            matrix.set(i, j, matrix.get(i, j) - Math.random()); // mutate by subtraction
        }
      }
    }
  }

  serialize()
  {
    let serialNN = "";

    let layerConfig = this.layers.join(' ');
    serialNN += layerConfig + " @ ";

    this.weights.forEach(wMatrix => wMatrix.mat.forEach(row => row.forEach(elem => serialNN += elem + ' ')));
    this.biases.forEach(bMatrix  => bMatrix.mat.forEach(row => row.forEach(elem => serialNN += elem + ' ')));

    return serialNN;
  }

  static deserialize(serialNN)
  {
    let tokens = serialNN.split(' ');

    let layers = [];
    let index = 0;
    while (tokens[index] != '@')
      layers.push(parseInt(tokens[index++], 10));
    index++; // clear the '@' signal token

    let deserialNN = new NeuralNetwork(layers);

    // fill weight matrices
    deserialNN.weights.forEach(wMatrix =>
      {
        for (let r = 0; r < wMatrix.rows; r++)
        {
          for (let c = 0; c < wMatrix.cols; c++)
            wMatrix.mat[r][c] = parseFloat(tokens[index++]);
        }
      });

    // fill bias matrices
    deserialNN.biases.forEach(bMatrix =>
      {
        for (let r = 0; r < bMatrix.rows; r++)
        {
          for (let c = 0; c < bMatrix.cols; c++)
            bMatrix.mat[r][c] = parseFloat(tokens[index++]);
        }
      });

    return deserialNN;
  }

  display()
  {
    console.log("Displaying a NeuralNetwork:\n");
    console.log("layers: " + this.layers.join(', ') + '\n\n');

    for (let i = 0; i < this.weights.length; i++)
    {
      console.log("weight matrix " + (i+1) + ": \n");
      this.weights[i].display();
      console.log("bias matrix " + (i+1) + ": \n");
      this.biases[i].display();
      console.log('\n');
    }
  }
}

// testing
/*
let layers = [3, 2, 1];
function activation(x)
{
  return Math.tanh(x);
}
let nn = new NeuralNetwork(layers, activation);

let inputs = [1, 2, 3];
//let output = nn.feedForward(inputs);
//output.display();

nn.mutate(0.50);
console.log("Displaying nn (mutated): ");
nn.display();
let nn2 = new NeuralNetwork(layers);
console.log("Displaying nn2: ");
nn2.display();
let nnChild = nn.crossOver(nn2);
console.log("Displaying nnChild: ");
nnChild.display();
*/

/*let n = new NeuralNetwork();
n.display();
let nStr = n.serialize();
console.log(nStr);
let newN = NeuralNetwork.deserialize(nStr);
newN.display();*/

//export default NeuralNetwork
