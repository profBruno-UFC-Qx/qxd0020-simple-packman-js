const char = {
    size: 30,
    posY: 40/2,
    posX: 40/2,
    color: "rgb(255, 0 ,0)",

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
        this.changeColor();
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

    ctx.moveTo(char.posX, char.posY);
    ctx.beginPath();
    ctx.fillStyle = char.color;
    ctx.arc(char.posX, char.posY, char.size/2 ,0, Math.PI * 2);
    ctx.fill();

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



