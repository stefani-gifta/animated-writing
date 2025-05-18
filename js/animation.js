const div = document.getElementById("text")
const text = div.textContent
div.innerHTML = "" // clear container

var i = 0
var speed = 30 // ms per character (lesser, faster)
var currentWord = ""
const triggerWords = ["cheers", "hit", "shrieking", "Year", "clinking", "bumping", "rained", "end", "walked", "ICU", "kids"]

function typeNext() {
    div.classList.add("hide-after")
    if(i < text.length) {
        const span = document.createElement("span")
        span.textContent = text[i]
        span.classList.add("fade-in") // smooth typewriting
        div.appendChild(span)
        requestAnimationFrame(() => span.classList.add("show"))

        let effectPlayed = 0
        if(/\w/.test(text[i])) { // if alphanumeric, append to current word
            currentWord += text[i]
        } else { // check current word
            console.log(currentWord)
            if(triggerWords.includes(currentWord)) {
                let sound = new Audio(`../sounds/${currentWord}.mp3`)
                let duration = 0
                sound.addEventListener('loadedmetadata', () => {
                    duration = sound.duration
                    fadeIn(sound, duration)
                })
                effectPlayed = 1
            }
            currentWord = ""
        }

        i++
        window.scrollBy(0, div.scrollHeight) // auto scroll
        if(".,!?\"*—".includes(text[i-1]) || effectPlayed == 1) {
            setTimeout(typeNext, speed + 1000) // wait 1s after punctuation
        } else {
            setTimeout(typeNext, speed)
        }
    } else {
        div.classList.remove("hide-after")
    }
}

typeNext()

let fadeInterval
function fadeIn(audio, duration) {
    audio.volume = 0
    audio.play()
    let currentVolume = 0
    const steps = (Math.min(duration/3, 2) * 100) // max 2 second fade in (200 * 10 = 2000 ms steps)
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