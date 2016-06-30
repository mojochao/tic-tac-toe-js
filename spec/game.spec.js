import test from 'tape'

import Game from '../src/Game'

const iterator = (arr) => arr[Symbol.iterator]()

test('Game where player one wins', (t) => {
  const turns = iterator([0, 3, 1, 4, 2])
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
  const turns = iterator([3, 0, 4, 1, 6, 2])
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
  const turns = iterator([4, 0, 3, 5, 2, 6, 7, 1, 8])
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
