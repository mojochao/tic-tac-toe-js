import test from 'tape'

import Board, { EMPTY_CELL } from '../src/board'

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
  t.equal(cell, EMPTY_CELL, 'Cell 0 should be empty')
  board.setCell(0, 'x')
  t.equal(board.isCellAvailable(0), false, 'Cell 0 should be occupied')
  t.equal(board.isEmpty, false, 'Board should not be empty')
  cell = board.getCell(0)
  t.equal(cell, 'x', 'Cell 0 should be "x" value')
  t.end()
})
