class Matrix
{
    constructor(rows, cols)
    {
        //This function "constructs" objects, so every time you call "new Matrix(..)" anywhere it executes this function
        //I want you to initialize a 2d array with the number of rows/cols specified by the parameters passed in. every value can just be 0 for now
        this.mat = [];
        if (cols != 0)
        {
          for (let r = 0; r < rows; r++)
          {
            this.mat.push([]);
            for (let c = 0; c < cols; c++)
            {
              this.mat[r].push(0);
            }
          }
        }
    }

    mult(vector)
    {
      //This function takes in a list of numbers and I want you to multiply the matrix in question by this vector and return the result
      //HINT: make sure to check that vector is the right length, and then just iterate through each row of the matrix and calculate the dot product
      let matCols = this.mat[0].length;
      let vectRows = vector.length;
      let product = [];
      let tempSum = 0;

      if (matCols === vectRows) //condition for matrix multiplication being possible
      {
        for (let r = 0; r < this.mat.length; r++)
        {
          for (let c = 0; c < this.mat[0].length; c++)
            tempSum += this.mat[r][c] * vector[c];
          product.push(tempSum);
          tempSum = 0;
        }
      }
      else
      {
        throw "vector rows are not equal to matrix columns";
      }

      return product;
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
      if (this.mat.length === inputMat.length && this.mat[0].length === inputMat[0].length)
      {
        for (let r = 0; r < this.mat.length; r++)
        {
          for (let c = 0; c < this.mat[0].length; c++)
          {
            this.mat[r][c] += inputMat[r][c];
          }
        }
      }
      else
      {
        throw "input array is not the same size as array property";
      }
    }
  }

  //testing
  const size = 2;
  let myMatrix = new Matrix(size, size);
  for (let i = 0; i < size; i++) //fill matrix with random vals, 0 - 10
  {
    for (let j = 0; j < size; j++)
    {
      myMatrix.set(i, j, Math.floor(Math.random() * 11));
    }
  }
  for (let i = 0; i < myMatrix.mat.length; i++) //print the matrix
  {
    console.log(myMatrix.mat[i].join(', '));
  }

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
  console.log('multiplication result: ' + myMatrix.mult(vect));

