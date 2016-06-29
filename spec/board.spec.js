import test from 'tape'

import Board from '../src/board'

test('Board test constructed empty with dimension 3', (t) => {
  const board = new Board(3)
  t.equal(board.dim, 3, 'Board dimension should equal 3')
  t.equal(board.empty, true, 'Board should be empty')
  t.equal(board.full, false, 'Board should not be full')
  const available = board.available
  t.equal(board.available.length, 9, 'Board should have 9 cells available for play')
  t.equal(board.isAvailable(0), true, 'Cell 0 should not be occupied')
  board.setCell(0, 'x')
  t.equal(board.isAvailable(0), false, 'Cell 0 should now be occupied')
  t.equal(board.empty, false, 'Board should not be empty')
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
  t.equal(board.dim, 3, 'Board dimension should equal 3')
  t.equal(board.empty, false, 'Board should not be empty')
  t.equal(board.full, true, 'Board should be full')
  t.deepEqual(board.horizontals, horizontals, 'Board should have correct horizontal lines')
  t.deepEqual(board.verticals, verticals, 'Board should have correct vertical lines')
  t.deepEqual(board.diagonals, diagonals, 'Board should have correct diagonal lines')
  t.end()
})