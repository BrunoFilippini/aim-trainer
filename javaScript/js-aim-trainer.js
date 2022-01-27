// Select Canvas and Get Context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Width and Heigth Canvas variable
canvas.width = innerWidth
canvas.height = innerHeight

// Score and Fail information
const scoreEl = document.querySelector('#scoreEl')
const failEl = document.querySelector('#failEl')

// StartGame and Restart Btn
const startGameBtn = document.querySelector('#startGameBtn')
const restartGameBtn = document.querySelector('#restartGameBtn')

// HTML page Start Game
const windowStart = document.querySelector('#windowStart')

// Final Score Gamve Over
const bigScore = document.querySelector('#bigScore')

//Start Difficult Btn
const difficultEasyBtn = document.querySelector('#difficultEasy')
const difficultMidBtn = document.querySelector('#difficultMid')
const difficultHardBtn = document.querySelector('#difficultHard')

//Restart Difficult Btn
const difficultEasyRestartBtn = document.querySelector('#difficultEasyRestart')
const difficultMidRestartBtn = document.querySelector('#difficultMidRestart')
const difficultHardRestartBtn = document.querySelector('#difficultHardRestart')

// Score and fail counter
let fail = 0
let score = 0

// GameOver Reset
function reset() {
    score = 0
    fail = 0
}

// Randomize X and Y
function randomizeXY(position) { 
    return Math.floor(Math.random() * position);
}

// Arr X, Y
arrPosition = []

// Send two random positions
function sendXY() {
    arrPosition = []
    let xRandom = randomizeXY(canvas.width);
    let yRandom = randomizeXY(canvas.height);
    arrPosition.push(xRandom, yRandom)
}

// Class Game
class AimTrainer {
    constructor() {
        this.level = 1000
        this.radiusVariable = Math.floor((canvas.width + canvas.height / 2) / 100);
        this.intervalID = null
    }

    difficultEasy() {
        const id = setInterval(() => {
            sendXY()
            this.changeTarget()
            console.log(arrPosition)
        }, 1000); 
        this.intervalID = id
        console.log(this.difficultEasy)
    }

    difficultMid() {
        const id = setInterval(() => {
            sendXY()
            this.changeTarget()
            console.log(arrPosition)
        }, 800); 
        this.intervalID = id
        console.log(this.difficultMid)
    }

    difficultHard() {
        const id = setInterval(() => {
            sendXY()
            this.changeTarget()
            console.log(arrPosition)
        }, 500); 
        this.intervalID = id
        console.log(this.difficultHard)
    }

    clearDifficult(){
        clearInterval(this.intervalID)
    }

    clearStart() {
        reset()
    }
    
    circle(x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    createTarget(x, y) {
        let bordaRed = this.radiusVariable + Math.floor((canvas.width + canvas.height / 2) / 40);
        let bordaWhite = this.radiusVariable + Math.floor((canvas.width + canvas.height / 2) / 70);

        this.circle(x, y, bordaRed, 'green'); 
        this.circle(x, y, bordaWhite, 'white');
        this.circle(x, y, this.radiusVariable, 'red');
    }

    refreshScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    changeTarget() {            
        this.refreshScreen()
        this.createTarget(arrPosition[0], arrPosition[1]);     
    }

    fire() {
        addEventListener('click', (event) => {          
            let allTarget = this.radiusVariable + Math.floor((canvas.width + canvas.height / 2) / 45)
            let midTarget = this.radiusVariable + Math.floor((canvas.width + canvas.height / 2) / 70)
            let centerTarget = this.radiusVariable
            

            let mouseX = event.pageX - canvas.offsetLeft;
            let mouseY = event.pageY - canvas.offsetTop;
            
            let x = arrPosition[0]
            let y = arrPosition[1]        
        
            if ((mouseX > x - centerTarget) && (mouseX < x + centerTarget) && (mouseY > y - centerTarget)  && (mouseY < y + centerTarget)) {
                score += 100
                console.log("Centro")
                
            } else if ((mouseX > x - midTarget) && (mouseX < x + midTarget) && (mouseY > y - midTarget)  && (mouseY < y + midTarget)) {
                score += 50
                console.log("mid")

            } else if ((mouseX > x - allTarget) && (mouseX < x + allTarget) && (mouseY > y - allTarget)  && (mouseY < y + allTarget)) {
                score += 10   
                console.log("Borda")        

            } else {
                fail++
                console.log(`fail>  ${fail}`)
            } 
            scoreEl.textContent = score
            failEl.textContent = fail - 1    
            this.endGame() 
        })
    } 

    endGame() {
        if (fail > 3) {
            console.log("fim")
            windowRestart.style.display = "flex"
            bigScore.innerHTML = score
            reset()
        }
    }
}  

// NewGame
let newGame = new AimTrainer()
canvas.onclick = newGame.fire();


// START BTN
startGameBtn.disabled = true;

function enableStartBtn() {
    startGameBtn.disabled = false;
}

startGameBtn.addEventListener('click', () => {
    windowStart.style.display = "none"
    newGame.clearStart()
})

// RESTART BTN
windowRestart.style.display = "none"

restartGameBtn.disabled = true;
function enableRestartBtn() {
    restartGameBtn.disabled = false;
}

restartGameBtn.addEventListener('click', () => {
    windowRestart.style.display = "none"
    newGame.clearStart()
}) 
 
// Difficult Start Game
difficultEasyBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultEasy()
})

difficultMidBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultMid()
})

difficultHardBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultHard()
})

// Difficult Restart
difficultEasyRestartBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultEasy()
})

difficultMidRestartBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultMid()
})

difficultHardRestartBtn.addEventListener('click', () => {
    newGame.clearDifficult()
    newGame.difficultHard()
})
