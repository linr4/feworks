(function () {
    let timerId = null;
    function moveElm(elm, tgtPos) {
        let curPos = parseInt(getComputedStyle(elm).marginLeft);
        clearInterval(timerId);
        timerId = setInterval(function () {
            let step = (tgtPos - curPos) * .05;
            if (Math.abs(tgtPos - curPos) > .05) {
                curPos += step;
            } else {
                curPos = tgtPos;
                clearInterval(timerId);
            }
            elm.style.marginLeft = curPos + 'px';
        }, 10);
    }

    window.moveElm = moveElm;
})();