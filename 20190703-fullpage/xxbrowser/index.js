window.onload = function () {
    
    new fullpage('#fullpage', {
        //options here
        autoScrolling:true,
        sectionsColor: ['#0da5d6', '#2ab561', '#de8910', '#16ba9d', '#0da5d6'],
        verticalCentered: false,
        /**
         * 滚动完成后调用的函数
         * @param {*} origin Object 滚出去的那一个section的信息
         * @param {*} destination Object 滚进来的那个section的信息
         * @param {*} direction String 滚动方向 up/down
         * 第一次进入网页也会执行，但origin和direction为null，dest为当前section
         */
        afterLoad: function (origin, destination, direction) {
            console.log(origin, destination);
            destination.item.classList.add('current');
            if (null !== origin) {
                origin.item.classList.remove('current');
            }
        }

    });
}