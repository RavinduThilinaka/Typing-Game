const paragraph = [
  "In a world where technology had advanced beyond imagination, people lived in smart cities powered by renewable energy, artificial intelligence, and seamless communication networks.",
  "Cars drove themselves, homes anticipated their occupants' needs, and virtual assistants managed everything from groceries to appointments.",
  "Yet amidst all this progress, there remained a hunger for something more—something human.",
  "People yearned for authentic experiences, face-to-face conversations, and moments of stillness away from screens.",
  "This paradox puzzled many: how could a society so connected feel so alone?",

  "Amelia, a software engineer turned minimalist, had once been at the forefront of this digital revolution.",
  "She worked for a leading tech firm, developing virtual reality systems that blurred the lines between real and artificial.",
  "But after years of innovation, she began to feel disconnected from the world she helped create.",
  "One evening, as she walked through the quiet woods near her childhood home, she realized what she had lost—time, nature, and presence.",
  "She made a bold decision: to leave the city and start over in a small mountain village, where people still wrote letters, shared meals, and greeted each other with genuine smiles.",

  "Her days were simple now—tending a garden, reading by candlelight, teaching children how to code using paper and logic rather than screens.",
  "At first, many thought she had gone mad.",
  "But soon, others began to visit, drawn by curiosity and a longing for balance.",
  "Amelia's home became a place of learning, healing, and reconnection.",
  "She didn't reject technology; she simply redefined her relationship with it.",
  "She showed others how to use it wisely, without letting it consume their lives.",

  "One summer evening, as fireflies danced in the warm twilight and laughter echoed from the nearby riverbank, Amelia sat quietly with a journal in hand.",
  "She reflected on how far she had come—not in terms of wealth or status, but in clarity, peace, and joy.",
  "Her story spread beyond the village, reaching people across the globe who were also searching for a way to reclaim their lives.",
  "Schools invited her to speak, communities modeled programs after her ideas, and children wrote letters thanking her for reminding the world of what truly mattered.",

  "It wasn't about abandoning the future—it was about remembering the past, grounding the present, and moving forward with intention.",
  "Each person who visited her village left with a seed planted in their hearts, a new perspective that technology should enhance life, not replace it.",
  "In the quiet moments, surrounded by stars and the sound of wind through pine trees, Amelia felt whole.",
  "Her journey wasn't grand or dramatic, but it was meaningful.",
  "And sometimes, the most powerful revolutions begin not with noise and chaos, but with a whisper, a pause, a single step back into the rhythm of being human."
];

const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer;
const maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";
    paragraph[randomIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => inputField.focus());
    typingText.addEventListener("click",() => inputField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }

        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        } else {
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        mistakeTag.innerHTML = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeTag.innerText = timeLeft;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

// Create particles
function createParticles() {
    const colors = ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.7)'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.background = color;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        document.body.appendChild(particle);
    }
}

// Initialize the game
randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
createParticles();