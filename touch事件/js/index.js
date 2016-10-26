$(function () {
    var $wrapper = $('#slider'),
        downX = 0,
        transformX = 0,
        $wrapperWidth = 0;

    $('#slider li').each(function(){
        $wrapperWidth += parseInt($(this).outerWidth());
    });

    $('#slider').width($wrapperWidth + 8*10);
    $wrapper.on('touchstart',function(ev){  //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
        ev.preventDefault();
        var touch = ev.originalEvent.changedTouches[0];  //取屏幕上第一个手指的坐标
        downX = touch.pageX;
        $wrapper.on('touchmove',function(ev){  //当手指在屏幕上滑动的时候连续地触发。
            ev.preventDefault();
            var touch = ev.originalEvent.changedTouches[0];
            if(transformX+touch.pageX - downX <= -$wrapperWidth+ $(window).width() - 70) return;
            if(transformX+touch.pageX - downX > 10) return;
            $(this).css('transform','translateX('+(transformX+touch.pageX - downX)+'px)');
        });
        $wrapper.on('touchend',function(ev){
            var touch = ev.originalEvent.changedTouches[0];
            transformX =transformX+ touch.pageX - downX;
            downX = touch.pageX;
        });
    });

    $('#nav li').off('click').on('click',function(){
        var $this = $(this).index();
        $('#wrapper li').eq($this).addClass('on').siblings('li').removeClass('on');
        var transWidth = -$('#slider li').eq(0).outerWidth();
        $wrapper.css('transform','translateX('+transWidth*$this+'px)');
    });
});