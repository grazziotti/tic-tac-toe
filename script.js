const tiles = Array.from(document.querySelectorAll('.game div'))
const restartButton = document.querySelector('.restart')
const announcer = document.querySelector('.announcer')

let gameOver = false
let currentPlayer = 'X'
let currentTile

const updateDisplay = () => {
    const displayPlayer =  document.querySelector('.display span')

    displayPlayer.removeAttribute('class')
    displayPlayer.innerText = currentPlayer
    displayPlayer.classList.add(`player${currentPlayer}`)
}

const announce = msg => announcer.innerHTML = msg

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    updateDisplay() 
}

const isTheGameOver = () => {

    const board = tiles.map( tile => tile.textContent)

    const combinations = [
        [board[0], board[1], board[2]],
        [board[3], board[4], board[5]],
        [board[6], board[7], board[8]],
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[2], board[5], board[8]],
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]]
    ]

    for(let i = 0; i < combinations.length; i++) {
        if (combinations[i].every( tile => tile === 'X') || combinations[i].every( tile => tile === 'O')) {
            const msg = `Player <span class="player${combinations[i][0]}">${combinations[i][0] }</span> Won`
            gameOver = true
            announce(msg)
        }
    }

    if (!board.includes('')) {
        gameOver = true
        announce('Tie')
    }
}

const draw = () => {
    currentTile.innerText = currentPlayer
    currentTile.classList.add(`player${currentPlayer}`)
}

const Empty = () => currentTile.textContent === '' 

const makePlay = () => {
    if (Empty() && !gameOver) {
        draw()
        isTheGameOver()
        changePlayer()   
    }
}
tiles.forEach( tile => tile.addEventListener('click', () => {
    currentTile = tile
    makePlay()
}))



const restartGame = () => {
    currentPlayer = 'X'
    gameOver = false
    
    tiles.forEach( tile => {
        tile.innerText = ''
        tile.removeAttribute('class')
    })

    announcer.innerText = ''

    updateDisplay()
}
restartButton.addEventListener('click', () => restartGame())
