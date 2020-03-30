window.onload = function () {
    const navTriggerEl = this.document.querySelector(".hamburger");
    const navEl = this.document.querySelector(".nav");
    const contentEl = this.document.querySelector(".content");
    const hamburgerBarsEl = this.document.querySelectorAll("span");
    
    function toggleNav() {
        navEl.classList.toggle("open");
        contentEl.classList.toggle("shift");
        animateHamburger();
    }
    function animateHamburger () {
        for (let item of hamburgerBarsEl) {
            item.classList.toggle("change");
        }
    }

    navTriggerEl.addEventListener("click", toggleNav);

}