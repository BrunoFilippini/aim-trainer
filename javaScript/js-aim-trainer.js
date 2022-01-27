const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const failEl = document.querySelector('#failEl')
const startGameBtn = document.querySelector('#startGameBtn')
const windowStart = document.querySelector('#windowStart')
const bigScore = document.querySelector('#bigScore')

const difficultEasyBtn = document.querySelector('#difficultEasy')
const difficultMidBtn = document.querySelector('#difficultMid')
const difficultHardBtn = document.querySelector('#difficultHard')


let fail = 0
let score = 0

function reset () {
    score = 0
    fail = 0
}

arrPosition = []

function sorteiaPosicao(posicao) { 
    return Math.floor(Math.random() * posicao);
}

function voltaXeY() {
    arrPosition = []
    let xRandom = sorteiaPosicao(canvas.width);
    let yRandom = sorteiaPosicao(canvas.height);
    arrPosition.push(xRandom, yRandom)
}

class target {
    constructor() {
        this.level = 1000
        this.raio = Math.floor((canvas.width + canvas.height / 2) / 100);
        this.intervalID = null
    }

    difficultEasy (){
        const id = setInterval(() => {
            voltaXeY()
            this.mudaAlvo()
            console.log(arrPosition)
        }, 1000); 
        this.intervalID = id
        console.log(this.difficultEasy)
    }

    difficultMid (){
        const id = setInterval(() => {
            voltaXeY()
            this.mudaAlvo()
            console.log(arrPosition)
        }, 800); 
        this.intervalID = id
        console.log(this.difficultMid)
    }

    difficultHard (){
        const id = setInterval(() => {
            voltaXeY()
            this.mudaAlvo()
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
    
    circle (x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    alvos (x, y) {
        
        let bordaRed = this.raio + Math.floor((canvas.width + canvas.height / 2) / 40);
        let bordaWhite = this.raio + Math.floor((canvas.width + canvas.height / 2) / 70);

        this.circle(x, y, bordaRed, 'green'); 
        this.circle(x, y, bordaWhite, 'white');
        this.circle(x, y, this.raio, 'red');
        
    }

    refreshScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    mudaAlvo() {            
        this.refreshScreen()
        this.alvos(arrPosition[0], arrPosition[1]);     
    }

    fire() {
        addEventListener('click', (event) => {
            
            let alvoTodo = this.raio + Math.floor((canvas.width + canvas.height / 2) / 45)
            let alvoMid = this.raio + Math.floor((canvas.width + canvas.height / 2) / 70)
            let alvoCenter = this.raio
            

            let mouseX = event.pageX - canvas.offsetLeft;
            let mouseY = event.pageY - canvas.offsetTop;
            
            let x = arrPosition[0]
            let y = arrPosition[1]        
        
            if((mouseX > x - alvoCenter) && (mouseX < x + alvoCenter) && 
                (mouseY > y - alvoCenter)  && (mouseY < y + alvoCenter)) {
               
                score += 100
                console.log("Centro")
                
                

            } else if ((mouseX > x - alvoMid) && (mouseX < x + alvoMid) && 
                (mouseY > y - alvoMid)  && (mouseY < y + alvoMid)) {
               
                score += 50
                console.log("mid")
            

            } else if ((mouseX > x - alvoTodo) && (mouseX < x + alvoTodo) && 
                (mouseY > y - alvoTodo)  && (mouseY < y + alvoTodo)) {
               
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
            windowStart.style.display = "flex"
            bigScore.innerHTML = score
            reset()
        }
    }
}  

let test = new target()
canvas.onclick = test.fire();

startGameBtn.disabled = true;

function enableStartBtn() {
    
        startGameBtn.disabled = false; //button is enabled
    
}


startGameBtn.addEventListener('click', () => {
    windowStart.style.display = "none"
    test.clearStart()
}) 

difficultEasyBtn.addEventListener('click', () => {
    test.clearDifficult()
    test.difficultEasy()
})

difficultMidBtn.addEventListener('click', () => {
    test.clearDifficult()
    test.difficultMid()
})

difficultHardBtn.addEventListener('click', () => {
    test.clearDifficult()
    test.difficultHard()
})