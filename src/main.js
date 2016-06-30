import Game from './Game'

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const randomItem = arr => arr[randomInt(0, arr.length - 1)]

const game = new Game('x', 'o', 3)
game.onPlayerOneTurn = available => {
  game.takePlayerOneTurn(randomItem(available))
}
game.onPlayerTwoTurn = available => {
  game.takePlayerTwoTurn(randomItem(available))
}
game.onGameOver = winner => {
  const result = winner ? `${winner} wins` : 'draw'
  console.log(result)
}
game.start()
