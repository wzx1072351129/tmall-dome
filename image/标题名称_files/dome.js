/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-07-28 13:40:46
 * @version $Id$
 */
$(function(){
    var numX = 5,numY = 5,numZ = 5,sum;
    sum = numX * numY * numZ;   // 暂且认为li个数为 5*5*5 个

    Init();

    $("#styleBtn li").click(function(){
        var Btn=$(this).index();

        switch(Btn){
            case 0:

                break;
            case 1:

                break;
            case 2:
                Helix();
                break;
            case 3:
                Grid();
                break;
        }
    });

    // 螺旋分布
    function Helix(){
        var rotY=10;
        var tz=1000;
        var ty=10;

        var firstY=-1*Math.floor(sum/2)*ty;

        $("#main li").each(function(i){
            $(this).css({
                 "transform":"rotateY("+(i*rotY)+"deg) translateZ("+tz+"px) translateY("+(firstY+ty*i)+"px)"
            });
        });
    }

    // 矩阵分布
    function Grid(){
        var tx=400;     // 水平 垂直间隔
        var ty=400;
        var tz=800;

        var firstX=-2*tx;   //第一个li水平偏移量
        var firstY=-2*ty;   //第一个li垂直偏移量
        var firstZ=-2*tz;   //第一个li Z轴偏移量
        $("#main li").each(function(i){
            var _x=(i%(numX *numY))%numX;// x方向，要增加的倍数
            var _y=parseInt((i%(numX *numY))/numX);//y方向，要增加的倍数
            var _z=parseInt(i/(numX *numY));//z方向，要增加的倍数

            $(this).css({
                "transform":"translate3d("+(firstX+_x*tx)+"px,"+(firstY+_y*ty)+"px,"+(firstZ+_z*tz)+"px)"
            });
        })
    }

    // 初始随机分布
    function Init(){
        for(var i=0;i<sum;i++){
            var _x=Math.floor((Math.random()-0.5)*5000);
            var _y=Math.floor((Math.random()-0.5)*5000);
            var _z=Math.floor((Math.random()-0.5)*5000);

            var $li=$("<li></li>");
            $li.css({
               "transform":"translate3d("+_x+"px,"+_y+"px,"+_z+"px)"
            });
            $li.html(i+"");
            $("#main").append($li);
        }
        upset();
        setTimeout(function(){
            Grid();
        },300);
    }

    // 拖拽 滚轮
    (function(){
        var nowx,lastx,minusx=0;
        var nowy,lasty,minusy=0;
        var roX=0,roY=0;

        var m_z=-2000;

        var timer1,timer2;

        $("#warp").mousedown(function(ev){
            ev=ev||window.event;
            lastx=ev.clientX;
            lasty=ev.clientY;
            clearInterval(timer1);

            $(this).on("mousemove",function(ev){
                ev=ev||window.event;    //ev 事件对象存放事件的相关信息

                nowx=ev.clientX;        // ev.clientX  clientX属性存放鼠标x坐标
                nowy=ev.clientY;

                minusx=nowx-lastx;      // 两者差值
                minusy=nowy-lasty;

                roX-=minusy*0.2;
                roY+=minusx*0.2;

                console.log(minusy);
                $("#main").css({
                    "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
                lastx=nowx;             // 存放前一点的x坐标
                lasty=nowy;
            })
        }).mouseup(function(){
            $(this).off("mousemove");

            timer1=setInterval(function(){
                minusx*=0.9;
                minusy*=0.9;
                if((Math.abs(minusx)<0.5)&&(Math.abs(minusy)<0.5))clearInterval(timer1);
                roX-=minusy*0.2;
                roY+=minusx*0.2;

                $("#main").css({
                    "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
            },15);

        }).mousewheel(function(e,d){
            clearInterval(timer2);
            m_z+=d*60;
            m_z=Math.min(0,m_z);
            m_z=Math.max(-5000,m_z);
            $("#main").css({
                 "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
            });
            timer2=setInterval(function(){
                d*=0.9;
                if((Math.abs(d)<0.05)&&(Math.abs(d)<0.05))clearInterval(timer2);
                m_z+=d*50;
                m_z=Math.min(0,m_z);
                m_z=Math.max(-5000,m_z);
                console.log(d);
                $("#main").css({
                     "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
            });
        });
    })();
    function upset(){
       var oMain=document.getElementById("main");
       var oLi=oMain.getElementsByTagName("li");
       var arr=[];
       for (var i = 0;i<oLi.length; i++) {
           arr.push(oLi[i]);
       }
        arr.sort(function(){return 0.5-Math.random()});
        alert(arr);
        for(var i=0;i<arr.length;i++){
            // alert(arr[i]==arr[2]);
            oMain.append(arr[i]);
        }
    }
})
