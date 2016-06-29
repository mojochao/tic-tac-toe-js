export default class Board {
  constructor(obj) {
    if (typeof obj === 'number') {
      const dimension = obj
      this.cells = new Array(dimension * dimension)
      this.dimension = dimension
    } else {
      this.cells = obj
      const dimension = Math.sqrt(this.cells.length)
      const decimals = dimension - Math.floor(dimension)
      if (decimals !== 0) throw new Error('number of cells must be square')
      this.dimension = dimension
    }
  }

  get horizontals() {
    const arr = []
    for (let i = 0; i < this.cells.length; i += this.dimension) {
      const line = this.cells.slice(i, i + this.dimension)
      arr.push(line)
    }
    return arr
  }

  get verticals() {
    const arr = []
    for (let i = 0; i < this.dimension; ++i) {
      const line = [ this.cells[i], this.cells[i + this.dimension], this.cells[i + this.dimension * 2] ]
      arr.push(line)
    }
    return arr
  }

  get diagonals() {
    const line1 = []
    for (let i = 0; i < this.cells.length; i += this.dimension + 1) {
      line1.push(this.cells[i])
    }
    const line2 = []
    for (let i = this.cells.length - this.dimension; i > 0; i -= (this.dimension - 1)) {
      line2.push(this.cells[i])
    }
    return [line1, line2]
  }

  get empty() {
    return this.available.length === 9
  }

  get full() {
    return this.available.length === 0
  }

  get available() {
    const arr = []
    for (let i = 0; i < this.cells.length; ++i) {
      if (this.cells[i] === undefined) arr.push(i)
    }
    return arr
  }

  isAvailable(index) {
    if (index >= this.cells.length) throw new RangeError(index)
    return this.available.indexOf(index) !== -1
  }

  setCell(index, value) {
    if (index >= this.cells.length) throw new RangeError(index)
    this.cells[index] = value
  }

  toString() {
    let str = ''
    this.horizontals.forEach((line) => {
      for (let i = 0; i < this.dimension; ++i) {
        const cell = line[i]
        str += typeof cell === 'undefined' ? '_' : cell
        str += ' '
      }
      str += '\n'
    })
    return str
  }
}
