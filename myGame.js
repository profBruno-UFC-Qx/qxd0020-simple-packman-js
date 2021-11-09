class Map {
    constructor(canvas, tileSize) {
        this.height = canvas.getAttribute("height");
        this.width = canvas.getAttribute("width");
        this.tileSize = tileSize;
        this.canvas = canvas;
        this.chars = [];

        this.draw = this.draw.bind(this);
    }

    addChar(char) {
        this.chars.unshift(char);
    }

    draw (){
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, this.width, this.height);

        for (let posY = 0; posY < this.height; posY += this.tileSize) {
            for (let posX = 0; posX < this.width; posX += this.tileSize) {
                ctx.moveTo(posX, posY);
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.strokeRect(posX, posY, this.tileSize, this.tileSize);
            }
        }

        for(let char of this.chars) {
            char.draw(ctx);
        }

        window.requestAnimationFrame(this.draw);
    }

    move(char, direction) {
        let x = char.posX;
        let y = char.posY;

        switch (direction) {
            case "cima":
                y -= char.stepSize;
                break;
            case "baixo":
                y += char.stepSize;
                break;
            case "direita":
                x += char.stepSize;
                break;
            case "esquerda":
                x-= char.stepSize;
                break;
        }

        if(this.canMove(x, y)) {
            char.mover(x, y, direction);
        }
    }

    canMove(x, y) {
        return (x > 0 && x < this.width && y > 0 && y < this.height);
    }

}

class Char {
    constructor(tileSize, size) {
        this.size = size;
        this.posY = tileSize/2;
        this.posX =tileSize/2;
        this.stepSize = tileSize;
        this.color = "rgb(255, 0 ,0)";
        this.direction = "direita";
    }

    mover(x, y, direction) {
        this.posX = x;
        this.posY = y;
        this.direction = direction;
        this.changeColor();
    }

    draw(ctx) {
        ctx.moveTo(this.posX, this.posY);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        switch (this.direction) {
            case "cima":
                ctx.arc(this.posX, this.posY, this.size/2, Math.PI * 1.25, Math.PI * 1.75, true);
                break;
            case "baixo":
                ctx.arc(this.posX, this.posY, this.size/2, Math.PI * 0.75, Math.PI * 0.25, false);
                break;
            case "direita":
                ctx.arc(this.posX, this.posY, this.size/2, Math.PI * 0.25, Math.PI * 1.75, false);
                break;
            case "esquerda":
                ctx.arc(this.posX, this.posY, this.size/2, Math.PI * 1.25, Math.PI * 0.75, false);
                break;
        }
        ctx.lineTo(this.posX, this.posY);
        ctx.fill();
    }

    changeColor() {
        this.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
}



window.onload = function () {
    let map = new Map(document.getElementById("canvas"), 600 / 15);
    let pacman = new Char(600 / 15, 30);
    map.addChar(pacman);
    map.draw();

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        const direction = {
            ArrowUp: "cima",
            ArrowDown: "baixo",
            ArrowLeft: "esquerda",
            ArrowRight: "direita"
        };

        map.move(pacman, direction[keyName]);


    }, false);
}

