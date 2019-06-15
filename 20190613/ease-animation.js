let timerId = null;

function moveElm(elm, tgtPos) {
    let curPos = parseInt(getComputedStyle(elm).marginLeft); // current position of the element
    clearInterval(timerId);
    timerId = setInterval(function () {
        let step = (tgtPos - curPos) * .05; // ease movement, speed is decreasing during the move
        if (Math.abs(tgtPos - curPos) > .05) { // not too close to the end yet
            curPos += step;
        } else { // if current position is approaching to target very closely, stop it
            curPos = tgtPos;
            clearInterval(timerId);
        }
        elm.style.marginLeft = curPos + 'px'; // do the move
    }, 10);
}