$(function(){
    //头部搜索栏 和 左下侧导航 开始
    (function(){
        var fixSearch =document.getElementById("fixSearch");
        var m_body=document.getElementById("m_body");

        window.onscroll=function(){
            var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
            if(scrollTop>=700){
                fixSearch.style.top="0";
                m_body.style.width="36px";
                m_body.style.height="333px";
            }else{
                fixSearch.style.top="-50px";
                m_body.style.width="0";
                m_body.style.height="0";
            }
        }
    })();

    // banner 轮播图
    (function(){
        var timer=null;
        var index=0;

        autoTime();

        $(".m_b_btn").find("li").mouseover(function(){
            clearInterval(timer);

            $(this).addClass("sel").siblings().removeClass("sel");
            index=$(this).index();
            $(".m_b_img").find("li").eq(index).fadeIn(300).siblings().fadeOut(300);
            var background=$(this).attr("col");
            $(this).parents(".m_con_bg").css("background",background);
        })

        $(".m_b_btn").find("li").mouseout(function(){
            autoTime();
        })

        function autoTime(){
            timer=setInterval(function(){
                index++;

                index%=$(".m_b_img").find("li").length;

                var background=$(".m_b_btn").find("li").eq(index).attr("col");
                $(".m_con_bg").css("background",background);

                $(".m_b_btn").find("li").eq(index).addClass("sel").siblings().removeClass("sel");
                $(".m_b_img").find("li").eq(index).fadeIn(300).siblings().fadeOut(300);
            },2000)
        }
    })();

    //购物车
    (function(){

    /*$(window).click(function(){
        var shopCart_left=$("#shopCart").offset().left;
        var win_wid=$(window).width();

        var w=win_wid-shopCart_left-35;
        if(shopCart_left>w)$("#shopCart").css('right',-1*w+'px');
    })*/
        $("#shopCart .sc_left .l_ul .gouwu").click(function(){
            var shopCart_width=$("#shopCart").width();
            var shopCart_left=$("#shopCart").offset().left;
            var win_wid=$(window).width();

            var w=win_wid-shopCart_left-35;

            var k=-1;
            if(w>shopCart_width){
                k=0;
            }
            $("#shopCart").css('right',w*k+'px');
        });
    })();
})
/*#shopCart .sc_left .l_ul li:hover .exter{opacity:1;filter:alpha(opacity=100);left:-90px;}
$(this).find(".exter").css("display","none");*/