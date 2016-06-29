export default class Board {
  constructor(d) {
    if (typeof d === 'number') {
      this.cells = new Array(d * d)
      this.dim = d
    } else {
      const dimension = Math.sqrt(d.length)
      const decimals = dimension - Math.floor(dimension)
      if (decimals !== 0) throw Error('must be square')
      this.cells = d
      this.dim = dimension
    }
  }

  get horizontals() {
    const arr = []
    for (let i = 0; i < this.cells.length; i += this.dim) {
      const line = this.cells.slice(i, i + this.dim)
      arr.push(line)
    }
    return arr
  }

  get verticals() {
    const arr = []
    for (let i = 0; i < this.dim; i++) {
      arr.push([this.cells[i], this.cells[i + this.dim], this.cells[i + this.dim * 2]])
    }
    return arr
  }

  get diagonals() {
    const diag1 = []
    for (let i = 0; i < this.cells.length; i += this.dim + 1) {
      diag1.push(this.cells[i])
    }
    const diag2 = []
    for (let i = this.cells.length - this.dim; i > 0; i -= (this.dim - 1)) {
      diag2.push(this.cells[i])
    }
    return [diag1, diag2]
  }

  get empty() {
    return this.available.length === 9
  }

  get full() {
    return this.available.length === 0
  }

  get available() {
    const arr = []
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === undefined) arr.push(i)
    }
    return arr
  }

  isAvailable(index) {
    if (index >= this.cells.length) throw RangeError(index)
    return this.available.indexOf(index) !== -1
  }

  setCell(index, value) {
    if (index >= this.cells.length) throw RangeError(index)
    this.cells[index] = value
  }

  toString() {
    let str = ''
    this.horizontals.forEach((line) => {
      for (let i = 0; i < this.dim; i++) {
        const cell = line[i]
        str += typeof cell === 'undefined' ? '_' : cell
        str += ' '
      }
      str += '\n'
    })
    return str
  }
}
