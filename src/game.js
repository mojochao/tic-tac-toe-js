import Board from './board'

function containsAll(arr, val) {
  for (let item of arr) {
    if (item !== val) return false
  }
  return true
}

export default class Game {
  constructor(token1, token2, dim) {
    this.board = new Board(dim)
    this.token1 = token1
    this.token2 = token2
    this.nextPlayer = 1
    this.winner = null
  }

  onPlayer1Turn(available) {
    console.log('replace this event handler with client code')
  }

  onPlayer2Turn(available) {
    console.log('replace this event handler with client code')
  }

  onGameOver(winner) {
    console.log('replace this event handler with client code')
  }

  start() {
    while (!this._isGameOver()) {
      this._nextTurn()
      console.log(this.board.toString())
    }
    this.onGameOver(this.winner)
  }

  isValidPlay(cell) {
    return this.board.isAvailable(cell)
  }

  playTurn(cell, token) {
    if (this.board.isAvailable(cell)) {
      this.board.setCell(cell, token)
    } else {
      throw Error(`cell ${cell} is already taken`)
    }
  }

  _nextTurn() {
    if (this.nextPlayer === 1) {
      this.onPlayer1Turn(this.board.available)
      this.nextPlayer = 2
    } else {
      this.onPlayer2Turn(this.board.available)
      this.nextPlayer = 1
    }
  }

  _isGameOver() {
    this.winner = this._checkWinner()
    return this.winner !== null || this.board.full
  }

  _checkWinner() {
    return this._checkLines([
      ...this.board.horizontals,
      ...this.board.verticals,
      ...this.board.diagonals
    ])
  }

  _checkLines(lines) {
    for (let line of lines) {
      if (containsAll(line, this.token1)) return this.token1
      if (containsAll(line, this.token2)) return this.token2
    }
    return null
  }
}
