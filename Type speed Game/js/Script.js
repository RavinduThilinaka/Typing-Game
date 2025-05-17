const typingText = document.querySelector(".typing-text p");
inputField =  document.querySelector(".wrapper .input-field");
let charIndex = 0;

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraph.length);
    paragraph[randomIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown",() => inputField.focus());
    document.addEventListener("click",() => inputField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");

    let typedChar = inputField.value.split("")[charIndex];

    if(characters[charIndex].innerText === typedChar){

       characters[charIndex].classList.add("correct");
    }else{
       characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
    characters[charIndex].classList.add("active")
}

randomParagraph();
inputField.addEventListener("input",initTyping);