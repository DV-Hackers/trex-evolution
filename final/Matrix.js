class Matrix
{
    constructor(rows, cols, zeroed)
    {
        this.rows = rows;
        this.cols = cols;
        this.mat = [];
        if (rows instanceof Matrix) // copy constructor condition
        {
          let oldMat = rows;
          this.rows = oldMat.rows;
          this.cols = oldMat.cols;
          for (let i = 0; i < this.rows; i++)
          {
            this.mat.push([]);
            for (let j = 0; j < this.cols; j++)
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

    scalarMult(scalar)
    {
      //this.mat.forEach(row => row.forEach(elem => elem = elem * scalar));

      for (let r = 0; r < this.rows; r++)
      {
        for (let c = 0; c < this.cols; c++)
        {
          this.mat[r][c] *= scalar;
        }
      }
    }

    /*
    applyActivation(activation)
    {
      for (let elem of this.mat)
      {
        elem = activation(elem);
      }
    }
    */

    static vectorize(fn)
    {
      function vectFn(matrix)
      {
        let tempMat = new Matrix(matrix); // suggestion: could make this alter the input arg instead of making a new matrix
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

/* may use later, but the constructor works for copying currently
    copy()
    {
      let copyMat = new Matrix(this.rows, this.cols, true); // an initially zero'd matrix
      copyMat.add(this);

      return copyMat;
    }
*/

    display()
    {
      for (let i = 0; i < this.mat.length; i++)
      {
        console.log(this.mat[i].join(', '));
      }
    }

  }
console.log("yes");
export default Matrix
