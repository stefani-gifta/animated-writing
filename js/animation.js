const div = document.getElementById("text")
const text = div.textContent
div.innerHTML = "" // clear container

var i = 0
var speed = 30 // ms per character (lesser, faster)

function typeNext() {
    div.classList.add("hide-after")
    if(i < text.length) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.classList.add("fade-in"); // smooth typewriting
        div.appendChild(span);
        requestAnimationFrame(() => span.classList.add("show"));
        i++
        window.scrollBy(0, div.scrollHeight) // auto scroll
        if(".,!?\"*—".includes(text[i-1])) {
            setTimeout(typeNext, speed + 1000) // wait 1s after punctuation
        } else {
            setTimeout(typeNext, speed)
        }
    } else {
        div.classList.remove("hide-after")
    }
}

typeNext()
