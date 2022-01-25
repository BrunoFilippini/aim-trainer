const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector('#startGameBtn')
const windowStart = document.querySelector('#windowStart')
const bigScore = document.querySelector('#bigScore')

let score = 0
let fail = 0

function restart () {
    score = 0
    fail = 0
}

class target {
    constructor() {
        this.level = 1000
        this.raio = Math.floor((canvas.width + canvas.height / 2) / 100);
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

    sorteiaPosicao(posicao) { 
        return Math.floor(Math.random() * posicao);
    }

    refreshScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    mudaAlvo() { 
     setInterval(() => {             
            /* this.refreshScreen() */

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

    fire(x, y) {
        addEventListener('click', (event) => {

            let alvoTodo = this.raio + Math.floor((canvas.width + canvas.height / 2) / 45)
            let alvoMid = this.raio + Math.floor((canvas.width + canvas.height / 2) / 70)
            let alvoCenter = this.raio

            let mouseX = event.pageX - canvas.offsetLeft;
            let mouseY = event.pageY - canvas.offsetTop;
            
                
            
        
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
                console.log("Centro")        

            } else {

                fail++
                console.log(`fail>  ${fail}`)
            } 

            scoreEl.textContent = score

               /*  xRandom = 0
                yRandom = 0 */
                this.endGame()
            
        })
    } 

    endGame() {
        if (fail > 3) {
            console.log("fim")
            windowStart.style.display = "flex"
            bigScore.innerHTML = score
            fail = 0
        }
    }
}  




const targete = new target ()

startGameBtn.addEventListener('click', () => {
    restart()
    windowStart.style.display = "none"
    targete.mudaAlvo()
})

console.log(targete) 

console.log(restart)
console.log(`fail> ${fail}`)
console.log(`score> ${score}`)