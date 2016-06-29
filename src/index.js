import Game from './Game'

function random(arr) {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
  return arr[randomInt(0, arr.length - 1)]
}

const dimension = 3
const player1 = 'x'
const player2 = 'o'

const game = new Game(player1, player2, dimension)
game.onPlayer1Turn = (available) => {
  game.play(random(available), player1)
}
game.onPlayer2Turn = (available) => {
  game.play(random(available), player2)
}
game.onGameOver = (winner) => {
  const player = winner === null ? 'no one' : `'${winner}'`
  console.log(`game over and winner is ${player}\n`)
}

console.log('game starting\n')
game.start()
