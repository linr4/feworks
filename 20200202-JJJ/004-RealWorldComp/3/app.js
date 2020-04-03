const navEl = document.querySelector(".nav");
const btnEl = document.querySelector(".xbtn");
const ctnEl = document.querySelector(".content");
const barsEl = document.querySelectorAll(".xbtn span");


btnEl.onclick = function () {
    for (let bar of barsEl) {
        bar.classList.toggle("change");
    }
    navEl.classList.toggle("open");
    ctnEl.classList.toggle("shift");
}

