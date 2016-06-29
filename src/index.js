import Game from './game'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const DIM = 3
const PLAYER1 = 'x'
const PLAYER2 = 'o'

const game = new Game(PLAYER1, PLAYER2, DIM)
game.onPlayer1Turn = (available) => {
    const play = available[randomInt(0, available.length - 1)]
    game.playTurn(play, PLAYER1)
}
game.onPlayer2Turn = (available) => {
  const play = available[randomInt(0, available.length - 1)]
  game.playTurn(play, PLAYER2)
}
game.onGameOver = (winner) => {
  const player = winner === null ? 'no one' : `'${winner}'`
  console.log(`game over and winner is ${player}\n`)
}

console.log('game starting\n')
game.start()
