import CanvasOption from "./script/CanvasOption.js";
import Particle from "./script/Particle.js";
import Tail from "./script/Tail.js";
import { hypotenuse, randomNumBetween } from "./script/Utils.js";
import Spark from "./script/Spark.js";

class Canvas extends CanvasOption{
    constructor(){
        super();
        this.particles = [];
        this.tails = [];
        this.sparks = [];
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

    createTail(){
        const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
        const vy = -20;
        const colorDeg = randomNumBetween(0,360);
        this.tails.push(new Tail(x,vy,colorDeg));
    }

    createParticles(x,y,colorDeg){
        const PARTICLE_NUM = 300;
        for(let i=0 ; i < PARTICLE_NUM ; i++){
            //랜덤 반지름
            const r = randomNumBetween(2,100) * hypotenuse(innerWidth,innerHeight) * 0.0001;
            const angle = Math.PI / 180 * randomNumBetween(0, 360);
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            const opacity = randomNumBetween(0.6,0.9);
            const _colorDeg = randomNumBetween(-20,20) + colorDeg;
            this.particles.push(new Particle(x,y,vx,vy, opacity, _colorDeg))
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

            // 파티클 개수에 따라 화면이 밝아지는 효과
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length/50000})`;
            this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

            if(Math.random() < 0.1){
                this.createTail();
            }

            // 꼬리 -> 파티클 -> 스파크 생성
            this.tails.forEach((tail,idx) => {
                tail.update();
                tail.draw();
                
                // 꼬리 스파크
                for(let i = 0 ; i < Math.round(-tail.vy * 0.5) ; i++){
                    const vx = randomNumBetween(-5, 5) * 0.05;
                    const vy = randomNumBetween(-5, 5) * 0.05;
                    const opacity = Math.min(-tail.vy, 0.5)
                    this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg))
                }

                if(tail.vy > -0.7){
                    this.tails.splice(idx,1);
                    this.createParticles(tail.x,tail.y,tail.colorDeg);
                }
            })

            this.particles.forEach((particle,idx) => {
                particle.update();
                particle.draw();

                // 스파크 개수 줄이기
                if(Math.random() < 0.1){
                    this.sparks.push(new Spark(particle.x,particle.y, 0, 0, 0.3))
                }

                //파티클 배열에서 제거
                if(particle.opacity < 0) this.particles.splice(idx, 1);
            })

            this.sparks.map((spark,idx)=>{
                spark.update();
                spark.draw();
                
                if(spark.opacity < 0){
                    this.sparks.splice(idx,1);
                }
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