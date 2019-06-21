    //需要复制图片的第一张和最后一张
    var $images = $('.show > .window > .images >img')
    var $firstCopy = $images.eq(0).clone(true); //克隆第一张图片
    var $lastCopy = $images.eq($images.length - 1).clone(true);
    //将第一张和最后一张图片放入$images中
    var $imagesList = $('.show > .window > .images')

    //为下面的图片添加点击事件监听
    var $btnImages = $('.btn >.btnImages >div')
    //为第一个添加active

    //这里有两种特殊情况 1是从第一张跳转到最后一张  2是从最后一张到第一张
    //设置一个记录器
    var current = 0;
    //初始化
    initialLoad()

    bindEvent(); //点击事件


    //鼠标悬停停止轮播，鼠标划走开始轮播
    let timer = setInterval(function () {
        gotoSlide(current + 1)
    }, 3000)
    $('.show').on('mouseenter', function () {
        window.clearInterval(timer)
    }).on('mouseleave', function () {
        timer = setInterval(function () {
            gotoSlide(current + 1)
        }, 3000)
    })

    //监听页面是否可见
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            // console.log(document.hidden);
            // console.log( document.visibilityState );
            window.clearInterval(timer)
        } else {
            timer = setInterval(function () {
                gotoSlide(current + 1)
            }, 3000)
        }
    })

    //方法
    //给当前显示图片添加active
    function makeActive($node) {
        $node.siblings().removeClass('active')
        $node.addClass('active')
    }

    function initialLoad() {
        $imagesList.append($firstCopy)
        $imagesList.prepend($lastCopy)
        //将整个图片集向左移动920px；
        $imagesList.css({
            transform: 'translateX(-920px)'
        })
        $btnImages.eq(0).addClass('active')
    }

    function bindEvent() {
        $btnImages.on('click', function (e) {
            var $btnDiv = $(e.currentTarget)
            var index = $btnDiv.index()
            if (current === ($btnImages.length - 1) && index === 0) {

                $imagesList.css({
                    transform: `translateX(${-($btnImages.length + 1) * 920}px)`
                }).one('transitionend', function () {
                    $imagesList.hide().offset()
                    $imagesList.css({
                        transform: `translateX(${-(index+1)*920}px)`
                    }).show()
                })
                makeActive($(this))
            } else if (current === 0 && index === ($btnImages.length - 1)) {

                $imagesList.css({
                    transform: 'translateX(0px)'
                }).one('transitionend', function () {
                    $imagesList.hide().offset()
                    $imagesList.css({
                        transform: `translateX(${-(index+1)*920}px)`
                    }).show()
                })
                makeActive($(this))

            } else {

                $imagesList.css({
                    transform: `translateX(${-(index+1) * 920}px)`
                })
                makeActive($(this))
            }
            current = index;
        })

    }
    // 根据index的值跳转
    function gotoSlide(index) {
        if (index > $images.length - 1) {

            index = 0

        } else if (index < 0) {

            index = $images.length - 1

        }
        if (current === ($btnImages.length - 1) && index === 0) {
            console.log(1)
            $imagesList.css({
                transform: `translateX(${-($btnImages.length + 1) * 920}px)`
            }).one('transitionend', function () {
                $imagesList.hide().offset()
                $imagesList.css({
                    transform: `translateX(${-(index+1)*920}px)`
                }).show()
            })
            makeActive($btnImages.eq(index))
            
        } else if (current === 0 && index === ($btnImages.length - 1)) {
            console.log(2)
            $imagesList.css({
                transform: 'translateX(0px)'
            }).one('transitionend', function () {
                $imagesList.hide().offset()
                $imagesList.css({
                    transform: `translateX(${-(index+1)*920}px)`
                }).show()
            })
            makeActive($btnImages.eq(index))

        } else {
            console.log(3)
            $imagesList.css({
                transform: `translateX(${-(index+1) * 920}px)`
            })
            makeActive($btnImages.eq(index))
        }
        current = index;
    }