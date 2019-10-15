class Matrix {

}

class LiteNN {
constructor(layers, activation) {
/*
layers - a list of ints that signify the number of activations in each layer, first element represents input, last represents output
activation - activation function for the nn, takes in one number and returns another number
*/
  this.weights = {new Matrix(layers[1], layers[0])}

  for (var i = 0; i < layers.length - 1; i++) {
    if (i == layers.length-1)
      break
    this.weights.push(new Matrix(layers[i+1], layers[i]))
  }
}
ff(x) {
/*
x - list representing input into nn
*/
}

crossover(other) {}
mutate() {}
}
