import test from 'tape'

import Game from '../src/Game'

function* turnsWherePlayerOneWins() {
  const turns = [0, 3, 1, 4, 2] // player one wins on top horizontal line
  for (let turn of turns) yield turn
}

function* turnsWherePlayerTwoWins() {
  const turns = [3, 0, 4, 1, 6, 2] // player two wins on top horizontal line
  for (let turn of turns) yield turn
}

function* turnsWhereNoPlayerWins() {
  const turns = [4, 0, 3, 5, 2, 6, 7, 1, 8] // no player wins
  for (let turn of turns) yield turn
}

test('Game where player one wins', (t) => {
  const turns = turnsWherePlayerOneWins()
  const game = new Game('x', 'o', 3)
  game.onPlayerOneTurn = available => game.takePlayerOneTurn(turns.next().value)
  game.onPlayerTwoTurn = available => game.takePlayerTwoTurn(turns.next().value)
  game.onGameUpdate = board => undefined
  game.onGameOver = winner => {
    t.equal(winner, 'x', 'player one should win')
    t.end()
  }
  game.start()
})

test('Game where player two wins', (t) => {
  const turns = turnsWherePlayerTwoWins()
  const game = new Game('x', 'o', 3)
  game.onPlayerOneTurn = available => game.takePlayerOneTurn(turns.next().value)
  game.onPlayerTwoTurn = available => game.takePlayerTwoTurn(turns.next().value)
  game.onGameUpdate = board => undefined
  game.onGameOver = winner => {
    t.equal(winner, 'o', 'player two should win')
    t.end()
  }
  game.start()
})

test('Game where no player wins', (t) => {
  const turns = turnsWhereNoPlayerWins()
  const game = new Game('x', 'o', 3)
  game.onPlayerOneTurn = available => game.takePlayerOneTurn(turns.next().value)
  game.onPlayerTwoTurn = available => game.takePlayerTwoTurn(turns.next().value)
  game.onGameUpdate = board => undefined
  game.onGameOver = winner => {
    t.equal(winner, null, 'no player should win')
    t.end()
  }
  game.start()
})
