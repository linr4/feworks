console.log("Hello")
for (let i = 0; i < 10; i++) {
  console.log("increment " + i);
}

let h1El = document.querySelector('h1');
h1El.style.color = 'red';

content = document.createElement('p');
content.innerHTML = 'this is the content of the p tag';

document.querySelector('body').appendChild(content);