const contentEl = document.querySelector(".content");
const btnEl = document.querySelector(".btn");
const btnSpanEl = document.querySelectorAll(".btn>span");
const navEl = document.querySelector(".nav");

btnEl.onclick = function () {
    for (let bar of btnSpanEl) {
        bar.classList.toggle("change");
    }
    navEl.classList.toggle("open");
    contentEl.classList.toggle("shift");
}