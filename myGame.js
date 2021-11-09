const char = {
    size: 30,
    posY: 40/2,
    posX: 40/2,
    color: "rgb(255, 0 ,0)",

    direction: "direita",

    mover: function(direction) {
        switch (direction) {
            case "cima":
                if(this.posY - 40 > 0) {
                    this.posY -= 40;
                }
                break;
            case "baixo":
                if(this.posY + 40 < 600) {
                    this.posY += 40;
                    this.rot = 90;
                }
                break;
            case "direita":
                if(this.posX + 40 < 600){
                    this.posX += 40;
                }
                break;
            case "esquerda":
                if(this.posX - 40 > 0 ) {
                    this.posX -= 40;
                }
                break;
        }
        this.direction = direction;
        this.changeColor();
    },

    draw: function(ctx) {
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
    },

    changeColor: function() {
        this.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
}

function draw() {
    let canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 600, 600);

    const size = 600 / 15;

    for (let posY = 0; posY < 600; posY += size) {
        for (let posX = 0; posX < 600; posX += size) {
            ctx.moveTo(posX, posY);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.strokeRect(posX, posY, size, size);
        }
    }

    char.draw(ctx);

    window.requestAnimationFrame(draw);

}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const direction = {
        ArrowUp: "cima",
        ArrowDown: "baixo",
        ArrowLeft: "esquerda",
        ArrowRight: "direita"
    };
    char.mover(direction[keyName]);

}, false);



