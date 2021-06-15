// selectors
const animation1 = document.querySelector(".animation-1")
const mainh1 = document.querySelector(".main h1")
const animatingH1 = document.querySelector(".animating-h1")
const colors = ["#14d7f5", "#f52e14", "#a6f514", "#f5d314"]
const normalWord = "WELCOME TO MY WEBSITE"
const words = normalWord.split(" ")
let span;
let spanArray;
let letters;
let wordIndex = 0;
let colorIndex = 0
const textTween = gsap.timeline()


function getLetters(word){
    letters = word.split("")
    animatingH1.textContent = null
    letters.map(letter => {
        return animatingH1.innerHTML += `<span>${letter}</span>`
    })
}

function getspans(){
    span = document.querySelectorAll("span")
    spanArray = Object.values(span)
}


function chooseColor(){
    if(colorIndex === colors.length - 1) colorIndex = 0
    else colorIndex = colorIndex + 1
    console.log(colorIndex)
    return colors[colorIndex]
}


function startingAnimation(word){
    getLetters(word)
    getspans()
    textTween.fromTo(spanArray, {x: 100, autoAlpha: 0 , color: "transparent"}, {x: 0, autoAlpha: 1,color: chooseColor(), stagger: 0.1})
    .to(spanArray, {color:"transparent", stagger: 0.1, onComplete: ()=> fadeInWords()})
}


function fadeInWords(){
        wordIndex = wordIndex + 1
        console.log(wordIndex)
        getLetters(words[wordIndex])
        getspans()
        textTween.fromTo(spanArray, {color: "transparent"}, {color: chooseColor(), stagger: 0.1})
        .to(spanArray, {color:"transparent", stagger: 0.1, onComplete: () => {
            if(wordIndex === words.length - 1){
                textTween.to(animation1, {y: "-100%"})
                .fromTo(mainh1, {y: 50, autoAlpha:0}, {y: 0, autoAlpha: 1, stagger: 0.1})
                return
            }
            fadeInWords()
        }})
}

window.addEventListener("load", ()=> {
    startingAnimation(words[0])
})