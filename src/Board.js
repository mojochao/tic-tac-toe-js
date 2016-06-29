export default class Board {
  constructor(obj) {
    if (typeof obj === 'number') {
      this.dimension = obj
      this.cells = new Array(this.dimension * this.dimension)
    } else {
      this.cells = obj
      this.dimension = Math.sqrt(this.cells.length)
      const decimals = this.dimension - Math.floor(this.dimension)
      if (decimals !== 0) throw new Error('number of cells must be square')
    }
  }

  get horizontalLines() {
    const arr = []
    for (let i = 0; i < this.cells.length; i += this.dimension) {
      const line = this.cells.slice(i, i + this.dimension)
      arr.push(line)
    }
    return arr
  }

  get verticalLines() {
    const arr = []
    for (let i = 0; i < this.dimension; ++i) {
      const line = [ this.cells[i], this.cells[i + this.dimension], this.cells[i + this.dimension * 2] ]
      arr.push(line)
    }
    return arr
  }

  get diagonalLines() {
    const line1 = []
    for (let i = 0; i < this.cells.length; i += this.dimension + 1) {
      line1.push(this.cells[i])
    }
    const line2 = []
    for (let i = this.cells.length - this.dimension; i > 0; i -= this.dimension - 1) {
      line2.push(this.cells[i])
    }
    return [ line1, line2 ]
  }

  get isEmpty() {
    return this.availableCells.length === this.cells.length
  }

  get isFull() {
    return this.availableCells.length === 0
  }

  get availableCells() {
    const arr = []
    for (let i = 0; i < this.cells.length; ++i) {
      if (this.cells[i] === undefined) arr.push(i)
    }
    return arr
  }

  isCellAvailable(idx) {
    if (idx >= this.cells.length) throw new RangeError(idx)
    return this.availableCells.indexOf(idx) !== -1
  }

  getCell(idx) {
    if (idx >= this.cells.length) throw new RangeError(idx)
    return this.cells[idx]
  }

  setCell(idx, val) {
    if (idx >= this.cells.length) throw new RangeError(idx)
    this.cells[idx] = val
  }

  toString() {
    let str = ''
    this.horizontalLines.forEach((line) => {
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
