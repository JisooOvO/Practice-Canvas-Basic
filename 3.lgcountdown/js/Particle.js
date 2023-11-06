export default class Particle {
    constructor(){
        this.x = innerWidth / 2
        this.y = innerHeight / 2
    }

    update(){}

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.closePath()
    }
}