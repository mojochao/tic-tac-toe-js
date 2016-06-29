import test from 'tape'

import Board from '../src/board'

test('Board test constructed isEmpty with dimension 3', (t) => {
  const board = new Board(3)
  t.equal(board.dimension, 3, 'Board dimension should equal 3')
  t.equal(board.isEmpty, true, 'Board should be isEmpty')
  t.equal(board.isFull, false, 'Board should not be isFull')
  const available = board.availableCells
  t.equal(board.availableCells.length, 9, 'Board should have 9 cells availableCells for play')
  t.equal(board.isCellAvailable(0), true, 'Cell 0 should not be occupied')
  board.setCell(0, 'x')
  t.equal(board.isCellAvailable(0), false, 'Cell 0 should now be occupied')
  t.equal(board.isEmpty, false, 'Board should not be isEmpty')
  t.end()
})

test('Board constructed with cells', (t) => {
  const cells = [
    'x', 'o', 'o',
    'o', 'x', 'x',
    'x', 'o', 'x'
  ]
  const horizontals = [
    [ 'x', 'o', 'o' ],
    [ 'o', 'x', 'x' ],
    [ 'x', 'o', 'x' ]
  ]
  const verticals = [
    [ 'x', 'o', 'x' ],
    [ 'o', 'x', 'o' ],
    [ 'o', 'x', 'x' ]
  ]
  const diagonals = [
    [ 'x', 'x', 'x' ],
    [ 'x', 'x', 'o']
  ]
  const board = new Board(cells)
  t.equal(board.dimension, 3, 'Board dimension should equal 3')
  t.equal(board.isEmpty, false, 'Board should not be isEmpty')
  t.equal(board.isFull, true, 'Board should be isFull')
  t.deepEqual(board.horizontalLines, horizontals, 'Board should have correct horizontal lines')
  t.deepEqual(board.verticalLines, verticals, 'Board should have correct vertical lines')
  t.deepEqual(board.diagonalLines, diagonals, 'Board should have correct diagonal lines')
  t.end()
})