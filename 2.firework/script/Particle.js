import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption{
    constructor(x,y,vx,vy,opacity){
        super()
        this.x = x;
        this.y = y;
        // 1 프레임당 이동 거리
        // x = r cos@
        // y = r sin@
        // r, @ 값을 랜덤으로 구해야함
        this.vx = vx;
        this.vy = vy;
        this.opacity = opacity;
        this.gravity = 0.12;
        this.friction = 0.93;
    }

    update(){
        //중력 설정 -> 점점 내려옴 (y값 증가)
        this.vy += this.gravity;

        //마찰력 설정 -> 점점 느려짐
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.01;
    }

    draw(){
        this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,2,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}