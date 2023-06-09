const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const chat = document.querySelector('.chat-container');
const inputField = document.querySelector("#input-section #input");
const btnClose = document.querySelector('.close-button');
const btnHelp = document.querySelector('.help-button');
const mousePosition = { x: - canvas.getBoundingClientRect().left, y: - canvas.getBoundingClientRect().top };
let eyeRadius = 10;
if (window.innerWidth < 430) {
    eyeRadius = 5
} else if (window.innerWidth < 769) {
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

    if (window.innerWidth < 430) {
        canvas.width = '100';
        canvas.height = '100';
    } else if (window.innerWidth < 769) {
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

    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            input != "" && output(input);
            inputField.value = "";
        }
    });

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
}

window.onload = main();

/* CHAT */

const userMessage = [
    ["hola", "che", "buenas"],
    ["seguro", "sí", "no"],
    ["Sos genio", "Sos nerd", "Sos inteligente"],
    ["te odio", "no me gustas"],
    ["Como estás", "Como es la vida", "Como están las cosas", "Como te va"],
    ["Como está el coronavirus", "Como está el covid-19", "Como está la situacion del covid-19"],
    ["Qué estás haciendo", "Qué está pasando", "Qué tal"],
    ["Cuántos años tienes"],
    ["Quién eres", "Sos humano", "Sos un bot", "Sos humano o un bot"],
    ["quien te creo", "quien te hizo", "quienes son tus creadores", "quien es tu creador"],
    ["decime tu nombre", "tu nombre", "Puedo saber tu nombre", "cual es tu nombre", "como te llamas"],
    ["te amo"],
    ["feliz", "bueno", "divertido", "maravilloso", "fantástico", "genial", "muy bien"],
    ["mal", "aburrido", "cansado"],
    ["ayúdame", "cuéntame una historia", "dime un chiste"],
    ["ah", "ok", "está bien", "bueno", "bienvenido"],
    ["gracias", "gracias a ti"],
    ["Qué debería comer hoy"],
    ["hermano"],
    ["qué", "por qué", "como", "donde", "cuándo"],
    ["coronavirus", "covid19", "coronavirus"],
    ["eres gracioso"],
    ["no sé"],
    ["aburrido"],
    ["estoy cansado"],
    ["donde veo mis favoritos"],
    ["ofertas"],
    ["como me logueo", "logueo", "login"],
    ["hacen factura"],
    ["instagram", "whatsapp", "redes", "wsp", "insta"],
    ["mouses", "monitores", "monitor", "placas de video", "placas", "memorias ram", "auriculares", "auris"],
    ["bueno chau", "chau", "nos vemos", "muchas gracias"],
    ["cual es la mejor comision"]
];
const botReply = [
    ["¡Hola!", "¡Hola!", "¡Hey!", "¡Hola!"],
    ["Está bien"],
    ["¡Sí, lo soy!"],
    ["Lo siento por eso. Pero me caes bien, amigo."],
    [
        "Bien... ¿cómo estás?",
        "Muy bien, ¿cómo estás tú?",
        "Fantástico, ¿cómo estás?"
    ],
    ["Mejorando. ¿Y allá?", "Más o menos bien.", "Sí, bien. ¡Mejor quédate en casa!"],

    [
        "Nada en particular",
        "A punto de ir a dormir",
        "¿Puedes adivinar?",
        "En realidad, no lo sé"
    ],
    ["Siempre soy joven."],
    ["Soy solo un bot", "Soy un bot. ¿Y tú qué eres?"],
    ["Puedes encontrar info de ellos en la sección ¿Quiénes somos?"],
    ["Amadeo Bot"],
    ["Yo también te amo", "Yo también"],
    ["¿Alguna vez te has sentido mal?", "Me alegra escucharlo"],
    ["¿Por qué?", "¿Por qué? ¡No deberías!", "Intenta ver la televisión", "Charla conmigo."],
    ["¿De qué se trata?", "Había una vez..."],
    ["Cuéntame una historia", "Cuéntame un chiste", "Háblame de ti"],
    ["De nada"],
    ["Briyani", "Hamburguesa", "Sushi", "Pizza"],
    ["¡Amigo!"],
    ["¿Sí?"],
    ["Por favor, quédate en casa"],
    ["Me alegra escucharlo"],
    ["Di algo interesante"],
    ["Lo siento por eso. ¡Vamos a charlar!"],
    ["Descansa un poco, ¡amigo!"],
    ["Debes loguearte para eso.", "Si ya estás logueado entra a favoritos en la sección superior."],
    ["Las mejores ofertas las tenemos en AMADEUS PC.", "Revisa nuestos productos!"],
    ["Haz click sobre el ícono de entrada si estas desde un celular.", "Haz click sobre Registrarse en la barra superior."],
    ["Emitimos factura a pedido del cliente."],
    ["Podés encontrarnos en nuestras redes que se ubican al final de la página."],
    ["Tenemos cantidad de productos, si está publicado podés comprarlo."],
    ["Vuelve prontos!", "Hasta la vista, baby!", "Sayonara"],
    ["La 18, obvio !"]
];

const alternative = [
    "Mi no entender",
    "No entiendo tu pregunta.",
    "Me programaron más o menos, escribi una palabra de lo que buscas",
    "Pregunta algo más...",
    "Reformulá tu pregunta, tampoco soy Chat GPT."
];

function sendMessage() {
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
}

function output(input) {
    let product;

    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

    text = text
        .replace(/[\W_]/g, " ")
        .replace(/por favor /g, "")
        .replace(/ por favor/g, "")
        .replace(/tienen /g, "")
        .replace("?", "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .trim();

    let comparedText = compare(userMessage, botReply, text);

    product = comparedText
        ? comparedText
        : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == string) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    //containMessageCheck(string);
    if (item) return item;
    else return containMessageCheck(string);
}

function containMessageCheck(string) {
    let expectedReply = [
        [
            "Adiós, amigo",
            "Chau, ¡nos vemos!",
            "Amigo, chau. Cuídate de tu salud en esta situación."
        ],
        ["Buenas noches, amigo", "Que descanses bien", "Dulces sueños"],
        ["¡Que tengas una tarde agradable!", "También buena tarde", "¡Tarde!"],
        ["Buenos días, ¡que tengas un gran día!", "¡Buen día, amigo!"],
        ["Buenas tardes", "Mediodía, ¡amigo!", "¡Tarde, amigo!"]
    ];
    let expectedMessage = [
        ["chau", "cuidate", "cuídate"],
["que descanses", "buenas noches"],
["buenas tardes", "buena tarde"],
["linda mañana", "buenos días"],
["descansa"]
    ];
    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
        if (expectedMessage[x].includes(string)) {
            items = expectedReply[x];
            item = items[Math.floor(Math.random() * items.length)];
        }
    }
    return item;
}
function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
}

btnClose.addEventListener('click', () => {
    clearCanvas();
    canvas.style.zIndex = '-999';
    btnHelp.style.display = 'inherit';
    btnClose.style.display = 'none';
    chat.style.display = 'none';
})

btnHelp.addEventListener('click', (e) => {
    canvas.style.zIndex = '1';
    btnClose.style.display = 'inherit';
    btnHelp.style.display = 'none';
})