class Matrix
{
    constructor(rows, cols, zeroed)
    {
        //This function "constructs" objects, so every time you call "new Matrix(..)" anywhere it executes this function
        //I want you to initialize a 2d array with the number of rows/cols specified by the parameters passed in. every value can just be 0 for now
        this.rows = rows;
        this.cols = cols;
        this.mat = [];
        if (rows instanceof Matrix)
        {
          let oldMat = rows;
          for (let i = 0; i < oldMat.mat.length; i++)
          {
            this.mat.push([]);
            for (let j = 0; j < oldMat.mat[0].length; j++)
            {
              this.mat[i][j] = oldMat.mat[i][j];
            }
          }
          return;
        }

        if (cols != 0)
        {
          for (let r = 0; r < rows; r++)
          {
            this.mat.push([]);
            for (let c = 0; c < cols; c++)
            {
              if (zeroed) // to have an all 0 matrix, if desired
                this.mat[r].push(0);
              else
                this.mat[r].push(Math.random());

            }
          }
        }
    }

    static arrayToMatrixVector(arr)
    {
      let tempMatrix = new Matrix(arr.length, 1);
      for (let i = 0; i < arr.length; i++)
      {
        tempMatrix.set(i, 0, arr[i]);
      }

      return tempMatrix;
    }

    mult(vector)
    {
      //This function takes in a list of numbers and I want you to multiply the matrix in question by this vector and return the result
      //HINT: make sure to check that vector is the right length, and then just iterate through each row of the matrix and calculate the dot product
      let matCols = this.mat[0].length;
      let vectRows = vector.mat.length;
      let productMat = new Matrix(this.mat.length, vector.mat[0].length);
      let tempSum = 0;

      if (matCols === vectRows) //condition for matrix multiplication being possible
      {
        for (let r = 0; r < this.mat.length; r++)
        {
          for (let c = 0; c < this.mat[0].length; c++)
            tempSum += this.mat[r][c] * vector.mat[c][0];

          productMat.set(r, 0, tempSum);
          tempSum = 0;
        }
      }
      else
      {
        throw "vector rows are not equal to matrix columns";
      }

      return productMat;
    }

    get(r, c)
    {
      if (this.mat.length < r || this.mat[0].length < c)
      {
        throw "coordinates out of bound";
      }
      else
      {
        return this.mat[r][c];
      }
    }

    set(r, c, val)
    {
      if (this.mat.length < r || this.mat[0].length < c)
      {
        throw "coordinates out of bound";
      }
      else
      {
        this.mat[r][c] = val;
      }
    }

    add(inputMat)
    {
      if (this.mat.length === inputMat.mat.length && this.mat[0].length === inputMat.mat[0].length)
      {
        for (let r = 0; r < this.mat.length; r++)
        {
          for (let c = 0; c < this.mat[0].length; c++)
          {
            this.mat[r][c] += inputMat.mat[r][c];
          }
        }
      }
      else
      {
        throw "input array is not the same size as array property";
      }
    }

    divideAllElems(divisor)
    {
      for (let row of this.mat)
      {
        for (let elem of row)
          elem = elem / divisor;
      }
    }

    applyActivation(activation)
    {
      for (let elem of this.mat)
      {
        elem = activation(elem);
      }
    }

    static vectorize(fn)
    {
      function vectFn(matrix)
      {
        let tempMat = new Matrix(matrix);
        for (let i = 0; i < tempMat.mat.length; i++)
        {
          for (let j = 0; j < tempMat.mat[0].length; j++)
          {
            tempMat.mat[i][j] = fn(tempMat.mat[i][j]);
          }
        }
        return tempMat;
      }
      return vectFn;
    }

    getRows()
    {
        return this.rows;
    }

    getCols()
    {
      return this.cols;
    }

    display()
    {
      for (let i = 0; i < this.mat.length; i++)
      {
        console.log(this.mat[i].join(', '));
      }
    }

  }

  //testing
  /*const size = 3;
  let myMatrix = new Matrix(size, size);
  for (let i = 0; i < size; i++) //fill matrix with random vals, 0 - 10
  {
    for (let j = 0; j < size; j++)
    {
      myMatrix.set(i, j, Math.floor(Math.random() * 11));
    }
  }

  let newMatrix = new Matrix(myMatrix);
  myMatrix.display();
  console.log('\n');

  function fn(x)
  {
    return x + 1;
  }
  let fn1 = Matrix.vectorize(fn);
  let m = fn1(newMatrix);
  m.display();

  /*console.log('\n');
  for (let i = 0; i < newMatrix.mat.length; i++) //print the matrix
  {
    console.log(newMatrix.mat[i].join(', '));
  }*/
  /*
  myMatrix.add(myMatrix.mat);
  for (let i = 0; i < myMatrix.mat.length; i++) //print the matrix
  {
    console.log(myMatrix.mat[i].join(', '));
  }

  let vect = [];
  for (let i = 0; i < size; i++) //fill vector with random vals, 0 - 10
    vect.push(Math.floor(Math.random() * 11));

  myMatrix.mult(vect)
  console.log('vector to multiply by: ' + vect);
  console.log('multiplication result: ' + myMatrix.mult(vect));*/
export default Matrix