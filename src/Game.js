import Board from './Board'

// Returns list of integers between min and max (exclusive) by step
export const range = (min, max, step=1) => {
  const list = []
  let curr = min
  while (curr < max) {
    list.push(curr)
    curr += step
  }
  return list
}

// Returns true if array contains only value, false otherwise
export const containsOnly = (arr, val) => {
  for (let item of arr) if (item !== val) return false
  return true
}

// Returns list of win patterns for a board of size dim
export const winPatterns = (dim) => {
  const lines = []
  const length = dim * dim
  for (let row_index of range(0, length, dim)) {    // horizontals
    lines.push(range(row_index, row_index + dim))
  }
  for (let column_index of range(0, dim)) {         // verticals
    lines.push(range(column_index, length, dim))
  }
  lines.push(range(0, length, dim + 1))             // diagonals
  lines.push(range(dim - 1, length - dim + 1, dim - 1))
  return lines
}

export default class Game {
  constructor(token1, token2, dim) {
    this.board = new Board(dim)
    this.winPatterns = winPatterns(dim)
    this.token1 = token1
    this.token2 = token2
    this.nextPlayer = null
    this.winner = null
  }

  onPlayerOneTurn(available) {
    throw new Error('replace this event handler with client code')
  }

  onPlayerTwoTurn(available) {
    throw new Error('replace this event handler with client code')
  }

  onGameUpdate(board) {
    throw new Error('replace this event handler with client code')
  }

  onGameOver(winner) {
    throw new Error('replace this event handler with client code')
  }

  start() {
    this.nextPlayer = 1
    while (!this._isGameOver()) {
      this._nextTurn()
      this.onGameUpdate(this.board)
    }
    this.onGameOver(this.winner)
  }

  takePlayerOneTurn(cell) {
    this._playTurn(cell, this.token1)
  }

  takePlayerTwoTurn(cell) {
    this._playTurn(cell, this.token2)
  }

  _isGameOver() {
    this.winner = this._checkWinner()
    return this.winner !== null || this.board.isFull
  }

  _checkWinner() {
    for (let pattern of this.winPatterns) {
      let line = pattern.map((i) => this.board.cells[i])
      if (containsOnly(line, this.token1)) return this.token1
      if (containsOnly(line, this.token2)) return this.token2
    }
    return null
  }

  _nextTurn() {
    if (this.nextPlayer === 1) {
      this.onPlayerOneTurn(this.board.availableCells)
      this.nextPlayer = 2
    } else {
      this.onPlayerTwoTurn(this.board.availableCells)
      this.nextPlayer = 1
    }
  }

  _playTurn(cell, token) {
    if (this.nextPlayer === null) throw new Error('game not started')
    if (!this.board.isCellAvailable(cell)) throw new Error(`cell ${cell} has already been played`)
    this.board.setCell(cell, token)
  }

}
