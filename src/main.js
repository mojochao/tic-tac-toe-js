import Game from './Game'

// Returns random integer between min and max (exclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

// Returns random item from array
const randomItem = (arr) => arr[randomInt(0, arr.length)]

const game = new Game('x', 'o', 3)
game.onPlayerOneTurn = (available) => game.takePlayerOneTurn(randomItem(available))
game.onPlayerTwoTurn = (available) => game.takePlayerTwoTurn(randomItem(available))
game.onGameUpdate = (board) => console.log(board.toString())
game.onGameOver = (winner) => console.log(winner ? `${winner} wins` : 'draw')
game.start()
