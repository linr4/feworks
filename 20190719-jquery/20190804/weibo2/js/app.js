$(document).ready(function () {
    $('textarea').on('input propertychange', function () {
        if ($(this).val().length > 0) {
            $('input[type=button]').prop('disabled', false);
        } else {
            $('input[type=button]').prop('disabled', true);
        }
    });

    $('.send').on('click', function () {
        var weibo = '<div class="message">' + 
                        '<p class="wb-text">' + $('textarea').val() + '</p>' +
                        '<p>' +
                            '<span class="dt">' + curDT() + '</span>' +
                            '<span class="ops">' +
                                '<a class="like" href="javascript:;">0</a>' +
                                '<a class="dislike" href="javascript:;">0</a>' +
                                '<a class="delete" href="javascript:;">删除</a>' +
                            '</span>' +
                        '</p>' +
                    '</div>';
        $('.middle').append(weibo);
    });

    $('body').delegate('.like', 'click', function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    $('body').delegate('.dislike', 'click', function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    $('body').delegate('.delete', 'click', function () {
        $(this).parents('.message').remove();
    });
    

    function curDT () {
        var dt = new Date();
        return dt.getFullYear() + '-' + 
               (dt.getMonth() + 1) + '-' + 
               dt.getDate() + ' ' + 
               dt.getHours() + ':' +
               dt.getMinutes() + ':' +
               dt.getSeconds()
    }

});