import CanvasOption from "./script/CanvasOption.js";
import Particle from "./script/Particle.js";
import { hypotenuse, randomNumBetween } from "./script/Utils.js";

class Canvas extends CanvasOption{
    constructor(){
        super();
        this.particles = [];
    }

    init(){
        //dpr init
        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;
        this.canvas.width = this.canvasWidth * this.dpr;
        this.canvas.height = this.canvasHeight * this.dpr;
        this.ctx.scale(this.dpr,this.dpr);
        this.canvas.style.width = this.canvasWidth + 'px';
        this.canvas.style.height = this.canvasHeight + 'px';

        this.createParticles();
    }

    createParticles(){
        const PARTICLE_NUM = 400;
        const x = randomNumBetween(0,this.canvasWidth);
        const y = randomNumBetween(0,this.canvasHeight);
        for(let i=0 ; i < PARTICLE_NUM ; i++){
            //랜덤 반지름
            const r = randomNumBetween(2,100) * hypotenuse(innerWidth,innerHeight) * 0.0001;
            const angle = Math.PI / 180 * randomNumBetween(0, 360);
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            const opacity = randomNumBetween(0.6,0.9);

            this.particles.push(new Particle(x,y,vx,vy, opacity))
        }
    }

    render(){ 
        let now,delta;
        let then = Date.now();

        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if(delta < this.interval) return;

            // 알파값을 바꿔서 잔상이 보이는 효과
            this.ctx.fillStyle = this.bgColor + '40'; // #00000010 
            this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

            this.particles.forEach((particle,idx) => {
                particle.update();
                particle.draw();

                //파티클 배열에서 제거
                if(particle.opacity < 0) this.particles.splice(idx, 1);
            })

            then = now - (delta % this.interval);    
        }
        requestAnimationFrame(frame);
    }
}

const canvas = new Canvas();

window.addEventListener('load', ()=>{
    canvas.init();
    canvas.render();
})

window.addEventListener('resize', ()=>{
    canvas.init();
})

//---------------------------------------//