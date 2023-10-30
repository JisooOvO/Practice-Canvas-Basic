//1장 --------------------------------------------------------------------------------------------------------------//
// 캔버스는 기본적으로 w300xh150
const canvas = document.querySelector("canvas");

// device pixel ratio : css에서 1픽셀을 그리는데 사용되는 실제 픽셀 개수
// dpr = 2 이면 1픽셀을 그리는데 가로 2 pixel, 세로 2 pixel (총 4 pixel 필요)
// dpr 출력
//console.log(window.devicePixelRatio);
const dpr = window.devicePixelRatio;

// 그림을 그릴 도구를 2D로 불러오기
const ctx = canvas.getContext('2d')

// 도구의 메서드는 [[Prototype]]에서 확인
console.log(ctx);

const canvasWidth = 300
const canvasHeight = 300

// 1. canvas 자체의 크기 조절 기능 사용
// 캔버스 자체의 크기는 100인데 css style을 통해 강제로 3배로 늘려서 흐릿하게 보이는 현상 발생
//canvas.width = 100
//canvas.height = 100

// dpr 크기에 맞게 canvas 크기 조절 -> dpr이 2 이상인 경우 캔버스가 커짐
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

// dpr 크기에 맞게 그림 크기 확장
ctx.scale(dpr, dpr); 

// 네모 그리기
// x축 시작, y축 시작, w너비, h높이
// ctx.fillRect(10,10,50,50);

// 2. css Style을 통해 캔버스 크기 조절 -> 강제로 CSS에 맞게 스타일을 줄임(dpr이 높은 경우 선명한 화질을 기대할 수 있음)
// 캔버스의 스타일 값과 캔버스 크기를 같게 맞춰야함
canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';

//2장 --------------------------------------------------------------------------------------------------------------//
// 경로를 그릴게!
//ctx.beginPath();

// 원 그리기
// x축 시작, y축 시작, 반지름 길이, 시작 각도, 끝나는 각도, 시계/반시계방향
// 단위로 radian 사용 => Math.PI/180 * 360
//ctx.arc(100,100,50,0,Math.PI/180 * 360);

// 색 채우기
//ctx.fillStyle = 'red';
//ctx.fill();

// 테두리 그리기
//ctx.strokeStyle = 'blue';
//ctx.stroke();

// 경로 종료
//ctx.closePath();

// 파티클 클래스 만들기
class Particle{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI/180 * 360);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();                
    }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x,y,radius);

//particle.draw();

// 1 프레임마다 실행하는 함수
// 애니메이션은 1프레임 마다 움직이는 사진의 집합
function animate() {
    // 프레임마다 실행
    // 현재 모니터 주사율만큼 실행(144hz라면 1초에 144번 실행)
    // 모니터마다 애니메이션 실행속도가 다르면 곤...란
    // fps : 초당 프레임 횟수

    // 내 모니터 주사율이 60hz라면 1/60s(약 16ms)마다 실행
    // 목표 fps = 10이라면 1초에 10번 프레임을 찍어야함(100ms 마다 프레임 실행 == interval)
    // fps는 높을수록 이미지가 부드럽게 나옴 ( 60 정도로 설정)
    // now    then    delta   interval    fps
    // 1000   1000    0       100         10
    // 1016   1000    16      100         10
    // 1032   1000    32      100         10
    // 1048   1000    48      100         10
    // 1064   1000    64      100         10
    // 1080   1000    80      100         10
    // 1096   1000    96      100         10
    // 1112   1100    112     100         10

    // delta > interval 일 때 애니메이션이 동작하면 됨
    // then = now - (delta % interval)

    window.requestAnimationFrame(animate);

    // 프레임마다 캔버스를 비우는 메서드
    // 미 호출시 캔버스를 덮어쓰는 효과(페인팅)
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    particle.draw();
}

animate();