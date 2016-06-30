import test from 'tape'

import Board from '../src/board'

test('Board constructed with dimension 3', (t) => {
  const dimension = 3
  const board = new Board(dimension)
  t.equal(board.dimension, dimension, `Board dimension should equal ${dimension}`)
  t.equal(board.isEmpty, true, 'Board should be empty')
  t.equal(board.isFull, false, 'Board should not be full')
  const available = board.availableCells
  t.equal(board.availableCells.length, dimension * dimension, `Board should have ${dimension * dimension} cells available for play`)
  t.equal(board.isCellAvailable(0), true, 'Cell 0 should not be occupied')
  let cell = board.getCell(0)
  t.equal(cell, undefined, 'Cell 0 should be undefined value')
  board.setCell(0, 'x')
  t.equal(board.isCellAvailable(0), false, 'Cell 0 should now be occupied')
  t.equal(board.isEmpty, false, 'Board should not be isEmpty')
  cell = board.getCell(0)
  t.equal(cell, 'x', 'Cell 0 should be "x" value')
  t.end()
})

test('Board constructed with 9 cells', (t) => {
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
  const dimension = 3
  const board = new Board(cells)
  t.equal(board.dimension, dimension, `Board dimension should equal ${dimension}`)
  t.equal(board.isEmpty, false, 'Board should not be empty')
  t.equal(board.isFull, true, 'Board should be full')
  t.deepEqual(board.horizontalLines, horizontals, 'Board should have correct horizontal lines')
  t.deepEqual(board.verticalLines, verticals, 'Board should have correct vertical lines')
  t.deepEqual(board.diagonalLines, diagonals, 'Board should have correct diagonal lines')
  t.end()
})