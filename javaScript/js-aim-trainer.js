const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight


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
        /* console.log(raio, diametro) */
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

    refreshScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    fire(x, y) {
        addEventListener('click', (event) => {

            let alvoTodo = this.raio + Math.floor((canvas.width + canvas.height / 2) / 45)

            let mouseX = event.pageX - canvas.offsetLeft;
            let mouseY = event.pageY - canvas.offsetTop;
        
            if((mouseX > x - alvoTodo) && (mouseX < x + alvoTodo) && 
            (mouseY > y - alvoTodo)  && (mouseY < y + alvoTodo)) {
               
               console.log("Acertou!")
            }
        })
    }
}  


const targete = new target (easy)
console.log(targete) 
targete.mudaAlvo()
targete.fire()



