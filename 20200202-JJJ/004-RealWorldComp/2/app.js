const navEl = document.querySelector(".nav");
const btnEl = document.querySelector(".btn");
const barEls = document.querySelectorAll(".bar");
const ctnEl = document.querySelector(".content");

btnEl.addEventListener("click", function () {
    navEl.classList.toggle("open");
    ctnEl.classList.toggle("shift");
    for (let bar of barEls) {
        bar.classList.toggle("change");
    }
})