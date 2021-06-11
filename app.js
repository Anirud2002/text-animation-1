// selectors
const animation1 = document.querySelector(".animation-1")
const mainh1 = document.querySelector(".main h1")
const animatingH1 = document.querySelector(".animating-h1")
const colors = ["#f52e14", "#f59014", "#f5d314", "#a6f514", "#14f51b", "#14d7f5", "#c426f0"]
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

function startingAnimation(word){
    getLetters(word)
    getspans()
    textTween.fromTo(spanArray, {x: 100, autoAlpha: 0 , color: "transparent"}, {x: 0, autoAlpha: 1,color: chooseColor(), stagger: 0.1})
    .to(spanArray, {color:"transparent", stagger: 0.1, onComplete: ()=> fadeInWords()})
}

function chooseColor(){
    let index = Math.floor(Math.random() * colors.length)
    if(index === colorIndex){
        if(index === colors.length - 1){
            colorIndex = 0
            return colors[0]
        }
        colorIndex = index + 1
        return colors[colorIndex]
    }
    colorIndex = index
    return colors[colorIndex]
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