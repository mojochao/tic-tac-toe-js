import Game from './Game'

function random(arr) {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
  return arr[randomInt(0, arr.length - 1)]
}

const dimension = 3
const playerOne = 'x'
const playerTwo = 'o'

const game = new Game(playerOne, playerTwo, dimension)
game.onPlayerOne = (available) => {
  game.play(random(available), playerOne)
}
game.onPlayerTwo = (available) => {
  game.play(random(available), playerTwo)
}
game.onGameOver = (winner) => {
  const player = winner === null ? 'no one' : `'${winner}'`
  console.log(`game over and winner is ${player}\n`)
}

console.log('game starting\n')
game.start()
