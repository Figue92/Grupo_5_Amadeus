const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const chat = document.querySelector('.chat-container');
const mousePosition = { x: - canvas.getBoundingClientRect().left, y: - canvas.getBoundingClientRect().top };
let eyeRadius = 10;
if (window.innerWidth < 430){
    eyeRadius = 5
} else if(window.innerWidth < 769){
    eyeRadius = 8
} else {
    eyeRadius = 9
}


const imgRobot = new Image();
imgRobot.src = '/images/users/imgRobot.png'

const imgRobotWithoutEyes = new Image();
imgRobotWithoutEyes.src = '/images/users/imgRobotWithoutEyes.png'

const eyeRobot = new Image();
eyeRobot.src = '/images/users/eyeRobot.png';

function drawRobotWithoutEyes(image) {
    const scale = (canvas.width) / image.width;
    const height = image.height * scale;
    ctx.drawImage(image, 0, 0, canvas.width, height);
}

function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function getUnitVector(a, b) {
    const module = distance(a, b);
    return {
        x: (b.x - a.x) / module,
        y: (b.y - a.y) / module
    };
}

function getTranslatedPosition(eyePosition) {
    if (distance(eyePosition, mousePosition) <= eyeRadius) {
        return mousePosition;
    }
    const unitVector = getUnitVector(eyePosition, mousePosition);
    return {
        x: eyePosition.x + eyeRadius * Math.sin(unitVector.x),
        y: eyePosition.y + eyeRadius * Math.sin(unitVector.y),
    };
}

function drawEyes() {
    if (window.innerWidth < 430) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 - 15,
                y: canvas.height / 2 - 12,
            },
            {
                x: canvas.width / 2 + 9,
                y: canvas.height / 2 - 12,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 25) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x,
                eyePosition.y,
                (canvas.width) / 25,
                height);
        }); 
    } else if (window.innerWidth < 769) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 - 19,
                y: canvas.height / 2 - 17,
            },
            {
                x: canvas.width / 2 + 11,
                y: canvas.height / 2 - 17,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 18) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x,
                eyePosition.y,
                (canvas.width) / 18,
                height);
        }); 
    } else {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 - 22,
                y: canvas.height / 2 - 20,
            },
            {
                x: canvas.width / 2 + 13,
                y: canvas.height / 2 - 20,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 15) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x,
                eyePosition.y,
                (canvas.width) / 15,
                height);
        });
    }
    
}

function resizeCanvas() {
    
    if(window.innerWidth < 430) {
        canvas.width = '100';
        canvas.height = '100';
    } else if(window.innerWidth < 769) {
        canvas.width = '130';
        canvas.height = '130';
    } else /* if(window.innerWidth < 1440) */ {
        canvas.width = '150';
        canvas.height = '150';
    }
}

function dibujarCuadrado() {
    ctx.fillRect(mousePosition.x, mousePosition.y, 10, 10);
    console.log(mousePosition.x, mousePosition.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    clearCanvas()
    drawRobotWithoutEyes(imgRobot);
    drawEyes();
    drawRobotWithoutEyes(imgRobotWithoutEyes);
}

function dontLook() {
    clearCanvas()
    drawRobotWithoutEyes(imgRobot);
    drawRobotWithoutEyes(imgRobotWithoutEyes);
}

function onResize() {
    resizeCanvas();
    render();
}

function onMouseMove(e) {
    const canvasRect = canvas.getBoundingClientRect();
    mousePosition.x = e.clientX - canvasRect.left;
    mousePosition.y = e.clientY - canvasRect.top;
    render();
}

function onTouchMove(event) {
    mousePosition.x = event.touches[0].clientX;
    mousePosition.y = event.touches[0].clientY;
    render();
}

function toggleDisplay() {
    if (chat.style.display === "none") {
        chat.style.display = "inherit";
      } else {
        chat.style.display = "none";
      }
}

function main() {
    resizeCanvas();
    imgRobot.addEventListener('load', () => {
        drawRobotWithoutEyes(imgRobot);
    });
    imgRobotWithoutEyes.addEventListener('load', () => {
        drawEyes();
        drawRobotWithoutEyes(imgRobotWithoutEyes);
    });
    canvas.addEventListener('click', () => {
        toggleDisplay();
    })

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
}

window.onload = main();