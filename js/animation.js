const selectDiv = document.getElementById("story-select")
const textDiv = document.getElementById("text")

var text = ""

var i = 0
var speed = 30 // ms per character (lesser, faster)
var currentWord = ""

selectDiv.addEventListener("change", () => {
    const selected = selectDiv.value
    text = selected ? stories[selected] : "No story selected"

    i = 0
    textDiv.innerHTML = "" // clear previous story
    currentWord = ""
    typeNext()
})

const nonLowerCaseWords = ["Year"]
const soundEffects = {
    // trigger word: sound file name
  "cheers": "cheers",
  "hit": "whip",
  "bump": "hit",
  "bumping": "hit",
  "shrieking": "highpitch",
  "Year": "fireworks",
  "clinking": "clinking",
  "rained": "rain",
  "end": "end",
  "walk": "footsteps",
  "walked": "footsteps",
  "icu": "ambulance",
  "kids": "kids",
  "ding": "notif",
  "popped": "notif",
  "honk": "honk",
  "beep": "beep",
  "beating": "heartbeat",
  "click": "click",
  "correct": "correct",
  "shared": "swoosh",
  "texted": "swoosh",
  "sent": "swoosh",
  "capture": "camera",
  "screenshot": "camera"
}

var wordStartIndex = 0
function typeNext() {
    textDiv.classList.add("hide-after")
    if(i < text.length) {
        const span = document.createElement("span")
        span.textContent = text[i]
        span.classList.add("fade-in") // smooth typewriting
        textDiv.appendChild(span)
        requestAnimationFrame(() => span.classList.add("show"))

        let effectPlayed = 0
        if(/\w/.test(text[i])) { // if alphanumeric, append to current word
            if(currentWord === "") wordStartIndex = i
            currentWord += text[i]
        } else { // check current word
            console.log(currentWord)
            if(!nonLowerCaseWords.includes(currentWord)) {
                currentWord = currentWord.toLowerCase() // don't lowercase the words in nonLowerCaseWords[]
            }
            if(soundEffects[currentWord]) {
                for(let j = wordStartIndex; j < i; j++) { // highlight the word
                    textDiv.children[j].classList.add("highlight")
                }
                let sound = new Audio(`../sounds/${soundEffects[currentWord]}.mp3`)
                let fadeInDuration = 0
                sound.addEventListener('loadedmetadata', () => {
                    fadeInDuration = sound.duration
                    fadeInDuration = Math.min(fadeInDuration/3, 2) // explained in fadeIn() function
                    fadeIn(sound, fadeInDuration)
                    setTimeout(() => {
                        for(let j = wordStartIndex; j < i; j++) {
                            textDiv.children[j].classList.remove("highlight") // remove highlight while sound still playing
                        }
                    }, fadeInDuration * 500) // later add css transition too
                })
                effectPlayed = 1
            }
            currentWord = ""
        }

        i++
        window.scrollBy(0, textDiv.scrollHeight) // auto scroll
        if(".,!?\"*—".includes(text[i-1]) || effectPlayed == 1) {
            setTimeout(typeNext, speed + 1000) // wait 1s after punctuation
        } else {
            setTimeout(typeNext, speed)
        }
    } else {
        textDiv.classList.remove("hide-after")
    }
}

var fadeInterval
function fadeIn(audio, fadeInDuration) {
    audio.volume = 0
    audio.play()
    let currentVolume = 0
    const steps = fadeInDuration * 100 // max 2 second fade in (2 * 100 * 10 = 2000 ms steps)
                                       // but if duration is <1.5, take duration/3
    fadeInterval = setInterval(() => {
        currentVolume += 0.1 // 10 times
        if (currentVolume >= 1) {
            clearInterval(fadeInterval)
            currentVolume = 1
        }
        audio.volume = currentVolume
        console.log(audio.volume)
    }, steps)
}
