const navEl = document.querySelector(".nav");
const btnEl = document.querySelector(".close");
const spansEl = document.querySelectorAll("span");
const contentEl = document.querySelector(".content");

btnEl.onclick = function () {
    navEl.classList.toggle("open");
    contentEl.classList.toggle("shift");
    for (let item of spansEl) {
        item.classList.toggle("change");
    }
}