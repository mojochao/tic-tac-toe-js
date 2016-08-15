export const EMPTY_CELL = '.'

export default class Board {
  constructor(dimension) {
    this.dimension = dimension
    this.cells = new Array(dimension * dimension).fill(EMPTY_CELL)
  }

  get isEmpty() {
    return this.availableCells.length === this.cells.length
  }

  get isFull() {
    return this.availableCells.length === 0
  }

  get availableCells() {
    const available = []
    for (let i = 0; i < this.cells.length; ++i) {
      if (this.cells[i] === EMPTY_CELL) available.push(i)
    }
    return available
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
    const rows = []
    for (let i = 0; i < this.dimension; i++) {
      rows.push(this.cells.slice(i * this.dimension, i * this.dimension + this.dimension).join(''))
    }
    return rows.join('\n') + '\n'
  }
}
