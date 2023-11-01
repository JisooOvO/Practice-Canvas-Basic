import CanvasOption from "./CanvasOption";

class Canvas extends CanvasOption{
    constructor(){
        super();
    }

    init(){
        //dpr init
        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;
        this.width = this.canvasWidth * this.dpr;
        this.height = this.canvasHeight * this.dpr;
        this.ctx.scale(this.dpr,this.dpr);
        this.style.width = this.canvasWidth + 'px';
        this.style.height = this.canvasHeight + 'px';
    }

    render(){ 
        let now,delta;
        let then = Date.now();

        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if(delta < this.interval) return;
            this.ctx.fillRect(100,100,200,200);
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