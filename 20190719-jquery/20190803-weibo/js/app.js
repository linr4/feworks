$(function () {

    // $('.comment').on('input propertychange', function () {
    // 如果不用委托事件的话，无法让 Textarea 直接监听 input 这两个事件

    $('body').delegate('.comment', 'input propertychagne', function () {
        if ($(this).val().length > 0) {
            $('.send').prop('disabled', false);
        } else {
            $('.send').prop('disabled', true);
        }
    })

    $('.send').click(function () {
        var text = $('.comment').val();
        let template = `
                <div class="msg clearfix">
                    <p class="msg-text">${text}</p>
                    <p class="msg-ops">
                        <span class="msg-datetime">${curDT()}</span>
                        <span class="msg-handlers">
                            <a class="like" href="javascript:;">0</a>
                            <a class="dislike" href="javascript:;">0</a>
                            <a class= "delete" href="javascript:;">删除</a>
                        </span>
                    </p>
                </div>`;
        $('.messages').append(template);
    });

    // 这里如果不用事件委托，也是无法直接通过监听<a>标签点击事件来做操作的
    // 而且<a>标签的 href 必须要写上 javascript:; 否则会有默认行为
    $('body').delegate('.like', 'click', function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    $('body').delegate('.dislike', 'click', function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    $('body').delegate('.delete', 'click', function () {
        $(this).parents('.msg').remove();
    });

    function curDT() {
        let dt = new Date();
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let hour = dt.getHours();
        let minute = dt.getMinutes();
        let second = dt.getSeconds();
        
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
})