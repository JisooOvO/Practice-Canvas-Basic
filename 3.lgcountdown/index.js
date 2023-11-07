import Particle from "./js/Particle.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth
let canvasHeight = innerHeight
const interval = 1000/60

const particles = []

function init() {
    canvasWidth = innerWidth
    canvasHeight = innerHeight
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr, dpr)    
}

function createRing(){
    const PARTICLE_NUM = 800
    for (let i=0; i<PARTICLE_NUM ; i++){
        particles.push(new Particle())
    }
}

function render(){
    let now, delta
    let then = Date.now()
    
    const frame = () => {
        requestAnimationFrame(frame)
        now = Date.now()
        delta = now - then
    
        if(delta < interval) return

        //지우기
        ctx.clearRect(0,0,canvasWidth,canvasHeight)
        
        //파티클 배열의 뒷부분을 우선순회하면
        //Splice로 삭제되어 배열이 직접 수정되어도 배열 앞부분에 영향이 없음
        //앞부분을 우선 순회할 경우 중간에 요소 삭제시 배열이 이동하여 뒷 요소에 영향
        for(let i = particles.length - 1 ; i >= 0 ; i--){
            particles[i].update()
            particles[i].draw(ctx)

            if(particles[i].opacity < 0){
                particles.slice(i,1)
            }
        }
    
        then = now - (delta % interval)
    }
    
    requestAnimationFrame(frame)
}

window.addEventListener('load',()=>{
    init()
    render()
})

window.addEventListener('resize',init)

window.addEventListener('click',()=>{
    const texts = document.querySelectorAll('span')

    const countDownOption = {
        opacity : 1,
        scale : 1,
        duration : 0.4,
        ease : 'Power4.easeOut'
    }

    //gsap 라이브러리
    gsap.fromTo(texts[0], {opacity:0, scale:5}, {
        ...countDownOption
    })

    gsap.fromTo(texts[1], {opacity:0, scale:5},{
        ...countDownOption,
        delay : 1,
        onStart : () => texts[0].style.opacity = 0
    })

    gsap.fromTo(texts[2], {opacity:0, scale:5},{
        ...countDownOption,
        delay : 2,
        onStart : () => texts[1].style.opacity = 0
    })

    const ringImg = document.querySelector('#ring')

    gsap.fromTo(ringImg, {opacity : 1}, {
        opacity : 0,
        duration : 1,
        delay : 3,
        onStart : () => {
            createRing()
            texts[2].style.opacity = 0
        }
    })
})