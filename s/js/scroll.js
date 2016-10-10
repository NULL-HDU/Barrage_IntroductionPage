/**
 * Created by FusGoethe on 15/5/25.
 *
 * @author MephistoPheies
 */

/* deal windows scroll and windows screen change*/


(function(window){

    var Direction = window.Direction,
        TOPMARGIN = Direction.topMargin,
        HEADERCANVASWIDTH = Direction.headerCanvasWidth,
        HEADERCANVASHEIGHT = Direction.headerCanvasHeight,
        SECTION = Direction.section,
        ANIMATIONTIME = Direction.animationtime;


    function DealScroll(){

        //the space between divs
        this.space = TOPMARGIN;
        //get all divs
        this.screens; 
        //向下移动的按钮
        this.goTo;
        //转到游戏界面得按钮
        this.toPlays;

        //网页屏幕大小
        this.offsetHeight= window.screen.availHeight; 
    }




    /**modify all height of div
     */
    DealScroll.prototype.init= function(){


        //如果没有元素，则直接获取
        this.screens = document.body.querySelectorAll('.screen');
        this.goTo = document.body.querySelector('#goTo');
        this.toPlays = document.body.querySelectorAll('.toPlay');

        //给div设置高
        for(var i=0;i<this.screens.length;i++){
            this.screens[i].style.height = this.offsetHeight + 'px';
            this.screens[i].style.margin = this.space+' 0';
        }


        //给按钮做动画
        this.goTo.querySelector('p').style.left = document.body.offsetWidth /2 +'px';
        this.goTo.addEventListener("mousedown",this.__mouseDown(this.offsetHeight),false);


        for(var i=0;i<this.toPlays.length;i++)
            this.toPlays[i].addEventListener("mousedown",this.__mouseDown(this.offsetHeight*2),false);



        //modify body;
        document.body.style.height= 4* this.offsetHeight +'px';


        



    }






    //goTo按钮点击函数
    DealScroll.prototype.__mouseDown = function(height){
        return function (){

            //移动动画
            __sd(document.body.scrollTop,new Date(),height);
        
        }
    }

    /*--------------------------------------------------dependence fn----------------------------------------------------------*/

    /** 循环做动画
     *
     * @nstation 当前位置
     * @ntime    当前时间
     */
    function __sd(nstation,ntime,mstation){

        var A = (new Date() - ntime)/ANIMATIONTIME;

        //限定A的范围0~1
        A = A <0? 0: A >1 ? 1:A;
        A = A*A*(3-2*A);

        nstation = A*(mstation-nstation)+ nstation;

        //移动滚轮
        window.scrollTo(0,nstation);

        //结束动画
        if(A >=1 ) return;

        //动画循环
        setTimeout(function(){
            __sd(nstation,ntime,mstation);
        },50);


    }




    /*--------------------------------------------------explore API----------------------------------------------------------*/
    window.DealScroll = new DealScroll();

}(window))
