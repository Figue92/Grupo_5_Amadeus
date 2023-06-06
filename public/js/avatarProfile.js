const canvas = document.querySelector('canvas');
const avatar = document.getElementById('addImage')
const inputs = document.querySelectorAll('.form-control');
const password = document.querySelectorAll('.password');
const ctx = canvas.getContext('2d');
const mousePosition = { x: - canvas.getBoundingClientRect().left, y: - canvas.getBoundingClientRect().top };
let eyeRadius = 10;
if (window.innerWidth < 325){
    eyeRadius = 5
} else if (window.innerWidth < 376){
    eyeRadius = 5
} else if (window.innerWidth < 430){
    eyeRadius = 7
} else if (window.innerWidth < 1030 && window.innerWidth > 800){
    eyeRadius = 7
}else{
    eyeRadius = 10
}

const imgRobot = new Image();
imgRobot.src = '/images/users/imgRobot.png'

const imgRobotWithoutEyes = new Image();
imgRobotWithoutEyes.src = '/images/users/imgRobotWithoutEyes.png'

const eyeRobot = new Image();
eyeRobot.src = '/images/users/eyeRobot.png';

function drawRobotWithoutEyes(image) {
    const scale = ((canvas.width) / 2) / image.width;
    const height = image.height * scale;
    const posX = (canvas.width / 2) - (canvas.width) / 4;
    ctx.drawImage(image, posX, 0, (canvas.width) / 2, height);
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
    if (window.innerWidth < 321) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 - 18,
                y: canvas.height / 2 - 20,
            },
            {
                x: canvas.width / 2 + 10,
                y: canvas.height / 2 - 20,
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
    }
    else if (window.innerWidth < 376) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 + 27,
                y: canvas.height / 2 + 18,
            },
            {
                x: canvas.width / 2 + 55,
                y: canvas.height / 2 + 18,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 25) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x - eyeRobot.width / 1.5,
                eyePosition.y - eyeRobot.height / 1.5,
                (canvas.width) / 25,
                height);
        }); 
    }
    else if (window.innerWidth < 430) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 + 25,
                y: canvas.height / 2 + 23,
            },
            {
                x: canvas.width / 2 + 55,
                y: canvas.height / 2 + 23,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 25) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x - eyeRobot.width / 1.5,
                eyePosition.y - eyeRobot.height / 1.5,
                (canvas.width) / 25,
                height);
        }); 
    } else if (window.innerWidth < 769) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 + 20,
                y: canvas.height / 2 + 12,
            },
            {
                x: canvas.width / 2 + 60,
                y: canvas.height / 2 + 12,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 25) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x - eyeRobot.width / 1.5,
                eyePosition.y - eyeRobot.height / 1.5,
                (canvas.width) / 25,
                height);
        }); 
    } else if (window.innerWidth < 1030) {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 + 25,
                y: canvas.height / 2 -5,
            },
            {
                x: canvas.width / 2 + 55,
                y: canvas.height / 2 -5,
            }
        ];
    
        const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
    
        const scale = ((canvas.width) / 25) / eyeRobot.width;
        const height = eyeRobot.height * scale;
    
        eyePositions.forEach((eyePosition) => {
            ctx.drawImage(eyeRobot,
                eyePosition.x - eyeRobot.width / 1.5,
                eyePosition.y - eyeRobot.height / 1.5,
                (canvas.width) / 25,
                height);
        }); 
    } else {
        const eyeOriginPositions = [
            {
                x: canvas.width / 2 - 33,
                y: canvas.height / 2 - 25,
            },
            {
                x: canvas.width / 2 + 15,
                y: canvas.height / 2 - 25,
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
    }
    
}

function resizeCanvas() {
    canvas.width = avatar.clientWidth;
    canvas.height = avatar.clientHeight;
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

function main() {
    resizeCanvas();
    imgRobot.addEventListener('load', () => {
        drawRobotWithoutEyes(imgRobot);
    });
    imgRobotWithoutEyes.addEventListener('load', () => {
        drawEyes();
        drawRobotWithoutEyes(imgRobotWithoutEyes);
    });


    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    password.forEach(inputPass => {
        inputPass.addEventListener('focus', () => {
            dontLook();
        })
    })

    password.forEach(inputPass => {
        inputPass.addEventListener('input', () => {
            dontLook();
        })
    })

    password.forEach(inputPass => {
        inputPass.addEventListener('blur', () => {
            render();
        })
    })
}

window.onload = main();

document.getElementById('avatarProfile').addEventListener('change', function(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imagenPreview = document.getElementById('imagen-preview-1');
        imagenPreview.src = e.target.result;
        imagenPreview.style.display = 'inherit';
        canvas.style.zIndex = '-1';
      };
      reader.readAsDataURL(input.files[0]);
    }
    clearCanvas();
    window.addEventListener('mousemove', () => clearCanvas());
    
  });