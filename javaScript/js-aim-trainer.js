const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector('#startGameBtn')
const windowStart = document.querySelector('#windowStart')

let score = 0
let hard = 400
let mid = 600
let easy = 800


class target {
    constructor(level) {
        this.level = level
        this.raio = Math.floor((canvas.width + canvas.height / 2) / 100);
    }
    
    circle (x, y, rai, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, rai, 0, Math.PI * 2);
        ctx.fill();
    }

    alvos (x, y) {
        let bordaRed = this.raio + Math.floor((canvas.width + canvas.height / 2) / 40);
        let bordaWhite = this.raio + Math.floor((canvas.width + canvas.height / 2) / 70);

        this.circle(x, y, bordaRed, 'green'); 
        this.circle(x, y, bordaWhite, 'white');
        this.circle(x, y, this.raio, 'red');
        
    }

    sorteiaPosicao(posicao) { 
        return Math.floor(Math.random() * posicao);
    }

    mudaAlvo() { 
        setInterval(() => {  
            this.refreshScreen()

            let xRandom = this.sorteiaPosicao(canvas.width);
            let yRandom = this.sorteiaPosicao(canvas.height);
            this.alvos(xRandom, yRandom);
            this.fire(xRandom, yRandom)
        }, this.level); 
    }

 /*    dificuldade() {

        if (score <= 5000) {
        this.level = 1500

        } else if (score <= 2500) {

            this.level = 1000
            
        } else if (score <= 3500) {

            this.level = 500
        }
        console.log(this.dificuldade)
    };
 */

    refreshScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    fire(x, y) {
        addEventListener('click', (event) => {

            let alvoTodo = this.raio + Math.floor((canvas.width + canvas.height / 2) / 45)
            let alvoMid = this.raio + Math.floor((canvas.width + canvas.height / 2) / 70)
            let alvoCenter = this.raio

            let mouseX = event.pageX - canvas.offsetLeft;
            let mouseY = event.pageY - canvas.offsetTop;

            scoreEl.textContent = score
        
            if((mouseX > x - alvoCenter) && (mouseX < x + alvoCenter) && 
                (mouseY > y - alvoCenter)  && (mouseY < y + alvoCenter)) {
               
                score += 100
                

            } else if ((mouseX > x - alvoMid) && (mouseX < x + alvoMid) && 
                (mouseY > y - alvoMid)  && (mouseY < y + alvoMid)) {
               
                score += 50
            

            } else if ((mouseX > x - alvoTodo) && (mouseX < x + alvoTodo) && 
                (mouseY > y - alvoTodo)  && (mouseY < y + alvoTodo)) {
               
                score += 10            

            } else {
                console.log("errou!")
            }
        })
    }
}  


const targete = new target (easy)

startGameBtn.addEventListener('click', () => {
    targete.mudaAlvo()
    targete.fire()
    windowStart.style.display = "none"
})

console.log(targete) 
