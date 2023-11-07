import { hexToRgb, randomNumBetween } from "./utils.js"

export default class Particle {
    constructor(x,y, deg = 0, colors, shapes, spread = 30){
        // 나가는 곳 제한
        this.angle = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread)
        this.r = randomNumBetween(30,100)
        this.x = x * innerWidth
        this.y = y * innerHeight

        this.vx = this.r * Math.cos(this.angle)
        this.vy = this.r * Math.sin(this.angle)
        
        this.friction = 0.89
        this.gravity = 0.5

        this.width = 15
        this.height = 15

        this.opacity = 1

        this.widthDelta = randomNumBetween(0,360)
        this.heightDelta = randomNumBetween(0,360)

        this.rotation = randomNumBetween(0,360)
        this.rotationDelta = randomNumBetween(-1, 1)
        
        this.colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0']
        this.color = hexToRgb(
          this.colors[
          Math.floor(randomNumBetween(0, this.colors.length))
          ]
        )

        this.shapes = shapes || ['circle','square']
        this.shape = this.shapes[
            Math.floor(randomNumBetween(0, this.shapes.length))
        ]
    }

    update(){
        this.vy += this.gravity
        this.vx *= this.friction
        this.vy *= this.friction

        this.x += this.vx
        this.y += this.vy

        this.opacity -= 0.005

        this.widthDelta += 2
        this.heightDelta += 2
        this.rotation += this.rotationDelta
    }

    drawSquare(ctx){
        ctx.fillRect(
            this.x,
            this.y, 
            this.width * Math.cos(Math.PI / 180 * this.widthDelta ), 
            this.height * Math.sin(Math.PI / 180 * this.heightDelta )
            )
    }

    drawCircle(ctx){
        ctx.beginPath()
        // arc : 원
        // ellipse : 타원
        ctx.ellipse(
            this.x, 
            this.y,
            Math.abs(this.width * Math.cos(Math.PI / 180 * this.widthDelta)) / 2,
            Math.abs(this.height * Math.sin(Math.PI / 180 * this.heightDelta )) / 2,
            0, //회전각
            0, Math.PI * 2
        )
        ctx.fill()
        ctx.closePath()
    }

    draw(ctx){
        // 콘페티 회전
        ctx.translate(this.x + this.width * 2, this.y + this.height * 2)
        ctx.rotate(Math.PI / 180 * this.rotation)
        ctx.translate(-this.x - this.width , -this.y - this.height)

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`

        switch(this.shape){
            case 'square' : this.drawSquare(ctx); break
            case 'circle' : this.drawCircle(ctx); break
        }




        ctx.resetTransform()
    }
}