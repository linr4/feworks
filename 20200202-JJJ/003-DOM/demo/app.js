console.log("Hello");
console.log(" another line: ")

for (let i = 0; i < 10; i++) {
    console.log("Increasing: ", i);
}

let h1El = document.querySelector('h1');
h1El.style.color = 'lightgreen';

let content = document.createElement('p');
content.innerHTML = "This is the content in the p tag";

document.querySelector('body').appendChild(content);