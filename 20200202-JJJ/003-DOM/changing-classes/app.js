const pEl = document.querySelector('p');
const btnEl = document.querySelector('button');

// pEl.classList.add("red-giant")
// pEl.classList.remove("red-giant")
// pEl.classList.toggle("red-giant")

pEl.className = "red-giant"

btnEl.onclick = function () {
    pEl.classList.toggle("on");
}