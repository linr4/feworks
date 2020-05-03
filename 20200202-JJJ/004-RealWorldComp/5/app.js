window.onload = ()=> {
    const closeEl = document.querySelector('.close');
    const closeSpanEls = document.querySelectorAll('.close span');
    const navEl = document.querySelector('.nav');
    const contEl = document.querySelector('.content');

    closeEl.onclick = function change() {
        navEl.classList.toggle('open');
        contEl.classList.toggle('shift');
        for (let elm of closeSpanEls) {
            elm.classList.toggle('x');
            
        }
    }

}