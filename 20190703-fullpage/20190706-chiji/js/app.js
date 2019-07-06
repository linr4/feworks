window.onload = function () {
    let toolbarEl = document.querySelector('.toolbar');
    let navEl = document.querySelector('.nav');
    new fullpage('#fullpage', {
        verticalCentered: false,
        sectionsColor: ['skyblue', 'turquoise', 'orangered', 'seagreen', 'wheat', 'yellowgreen', '#27292c'],
        onLeave: function (origin, destination, direction) {
            if (destination.isFirst) { // 当前在第一屏
                toolbarEl.style.display = 'block';
                navEl.style.top = '42px';
            } else { // 当前不在第一屏
                toolbarEl.style.display = 'none';
                navEl.style.top = '0';
            }
        },
    });
}