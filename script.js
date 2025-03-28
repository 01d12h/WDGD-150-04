// 🌌 캔버스 가져오기
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// 🌌 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🌟 별 객체 배열
let stars = [];
let numStars = 100;

// ⭐ 별 객체 생성 함수
function createStar() {
    return {
        x: Math.random() * canvas.width,  // 랜덤 X 위치
        y: Math.random() * canvas.height, // 랜덤 Y 위치
        radius: Math.random() * 2 + 1,    // 별 크기 (1~3px)
        opacity: Math.random(),           // 랜덤 밝기 (0~1)
        fadeSpeed: Math.random() * 0.02   // 밝기 변화 속도
    };
}

// ⭐ 별 초기화
for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}

// ⭐ 마우스를 따라 별똥별 저장할 배열
let shootingStars = [];

// ⭐ 별똥별 추가 함수 (마우스 이동 시 실행)
document.addEventListener("mousemove", function(event) {
    shootingStars.push({
        x: event.clientX,
        y: event.clientY,
        opacity: 1, // 별똥별의 초기 투명도
        fadeSpeed: 0.05 // 별똥별이 점점 사라지는 속도
    });
});

// ⭐ 별 & 별똥별 그리기 함수
function drawScene() {
    // 캔버스 지우기 (별똥별 흔적을 남기기 위해 완전 삭제 X)
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // 약간 투명한 배경으로 잔상이 남도록 설정
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ⭐ 반짝이는 별 그리기
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.opacity += star.fadeSpeed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.fadeSpeed *= -1;
        }
    });

    // ⭐ 별똥별 그리기
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let star = shootingStars[i];

        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.opacity -= star.fadeSpeed; // 점점 사라지게 설정
        if (star.opacity <= 0) {
            shootingStars.splice(i, 1); // 투명도가 0이 되면 배열에서 제거
        }
    }

    requestAnimationFrame(drawScene); // 반복 실행
}

// ⭐ 애니메이션 시작
drawScene();
