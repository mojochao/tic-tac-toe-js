import test from 'tape'

import Game, { range, winPatterns } from '../src/Game'

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

test('range', (t) => {
  const r0 = range(0, 3)
  t.deepEqual(r0, [0, 1, 2])
  t.end()
})

test('range not zero', (t) => {
  const r0 = range(4, 6)
  t.deepEqual(r0, [4, 5])
  t.end()
})

test('range with step', (t) => {
  const r0 = range(0, 9, 3)
  t.deepEqual(r0, [0, 3, 6])
  t.end()
})

test('win patterns 3x3', (t) => {
  const expected = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  t.deepEqual(winPatterns(3), expected)
  t.end()
})

test('win patterns 4x4', (t) => {
  const expected = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ]
  t.deepEqual(winPatterns(4), expected)
  t.end()
})