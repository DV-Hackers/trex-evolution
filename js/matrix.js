class Matrix
{
    constructor(rows, cols)
    {
        //This function "constructs" objects, so every time you call "new Matrix(..)" anywhere it executes this function
        //I want you to initialize a 2d array with the number of rows/cols specified by the parameters passed in. every value can just be 0 for now
        /*this.mat = [];
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
        }*/
        this.mat = [[0, 3, 5], [5, 5, 2]]; //test data to test function mult
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

      return product;
    }
  }

  let myMatrix = new Matrix(3, 2);

  for (let i = 0; i < myMatrix.mat.length; i++)
  {
    console.log(myMatrix.mat[i].join(', '));
  }

  let vect = [3, 4, 3];
  console.log('vector to multiply by: ' + vect);
  console.log('multiplication result: ' + myMatrix.mult([3, 4, 3]));

