import Board from './board'

function containsOnly(arr, val) {
  for (let item of arr) if (item !== val) return false
  return true
}

export default class Game {
  constructor(token1, token2, dim) {
    this.board = new Board(dim)
    this.token1 = token1
    this.token2 = token2
    this.nextPlayer = null
    this.winner = null
  }

  onPlayer1Turn(available) {
    throw new Error('replace this event handler with client code')
  }

  onPlayer2Turn(available) {
    throw new Error('replace this event handler with client code')
  }

  onGameOver(winner) {
    throw new Error('replace this event handler with client code')
  }

  start() {
    this.nextPlayer = 1
    while (!this._isGameOver()) {
      this._nextTurn()
      this._render()
    }
    this.onGameOver(this.winner)
  }

  play(cell, token) {
    if (this.nextPlayer === null) throw new Error('game not started')
    if (!this.board.isCellAvailable(cell)) throw new Error(`cell ${cell} has already been played`)
    this.board.setCell(cell, token)
  }

  _nextTurn() {
    if (this.nextPlayer === 1) {
      this.onPlayer1Turn(this.board.availableCells)
      this.nextPlayer = 2
    } else {
      this.onPlayer2Turn(this.board.availableCells)
      this.nextPlayer = 1
    }
  }

  _isGameOver() {
    this.winner = this._checkWinner()
    return this.winner !== null || this.board.isFull
  }

  _checkWinner() {
    return this._checkLines([
      ...this.board.horizontalLines,
      ...this.board.verticalLines,
      ...this.board.diagonalLines
    ])
  }

  _checkLines(lines) {
    for (let line of lines) {
      if (containsOnly(line, this.token1)) return this.token1
      if (containsOnly(line, this.token2)) return this.token2
    }
    return null
  }

  _render() {
    console.log(this.board.toString())
  }
}
