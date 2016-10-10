
/** the engine of game
 *  this is the core of this work
 *
 *@author MephistoPheies
 */

(function(window){
    //所有点的仓库
    var __pointstore = {},
        __canvas={},
        __context={},
        __gamebutton={},
        __isGamePlay = false,                                           //游戏是否进行中
        __isDead = true,                                                //是否已经挂了
        __QUAD ,
        __gameTime = 0,
        //__gameAudio,

        Direction = window.Direction,
        Point = window.Point,
        PVector = window.PVector,

        STOPCOLOR = Direction.stopColor,
        STARTCOLOR = Direction.startColor,


        QUADOBJECTS = Direction.quadObjects,
        QUADLEVELS = Direction.quadLevels,

        TIMELOOP = Direction.timeAdustLoop,
        NPCLOOP = Direction.npcLoop,
        DRAWLOOP = Direction.drawLoop,

        SELFSPEED = Direction.selfSpeed,
        FONTPX = Direction.fontPX,
        SLOWRATE = Direction.slowRate,
        SPEED = Direction.speed,
        SELFSPEED = Direction.selfSpeed,

        TITLEBORDERCOLOR = Direction.titleBorderColor,
        AIMCOLOR = Direction.aimColor,
        SELFCOLOR = Direction.selfColor,
        NPCCOLOR = Direction.npcColor,
        PROTECTCOLOR = Direction.protectColor,
        TITLEPX = Direction.titlePX,
        TITLECOLOR = Direction.titleColor,

        SELFSIZE = Direction.selfSize,
        NPCNUMBER = Direction.npcNumber,
        NPCMAXSIZE = Direction.npcMaxSize,
        NPCMINSIZE = Direction.npcMinSize,
        PROTECTNUM = Direction.protectNum,
        PROTECTSIZE = Direction.protectSize,
        AIMSIZE = Direction.aimSize,

        INRATE = Direction.canvasInRate,
        SIZERATE = Direction.canvasSizeRate;


    //安装游戏
    function game_setup(){

        var __game_canvas = document.body.querySelector("#game_canvas");
        __canvas = document.body.querySelector("#game");
        __gamebutton.div = document.body.querySelector("#replay");
        __gamebutton.start = document.body.querySelector("#play");
        __gamebutton.stop = document.body.querySelector("#stop");
        //__gameAudio  = document.body.querySelector("#audio");

        //setup controlor
        __gamebutton.div.addEventListener("mousedown",E_game_control,false);

        __canvas.height =__game_canvas.offsetHeight*0.9;
        __canvas.width =__game_canvas.offsetWidth;

        //调整canvas大小
        __canvas.__osize = SIZERATE*Math.min(__canvas.offsetHeight,__canvas.offsetWidth);
        __canvas.__isize = __canvas.__osize*INRATE;


        //设置绘图环境
        __context = __canvas.getContext("2d");
        __context.translate(
                __canvas.offsetWidth/2 - __canvas.__osize/2,
                __canvas.offsetHeight/2- __canvas.__osize/2);

        __QUAD = new window.QUAD(
                {x:0,y:0,width:__canvas.__osize,height:__canvas.__osize},
                QUADOBJECTS,
                QUADLEVELS);

        setupInit();
        //drawTitle(1);

        window.addEventListener("keydown",E_game_restart,false);
    }



    /** draw the plane while begin
     */
    function setupInit(){

        //init button
        __gamebutton.start.style.display="block";
        __gamebutton.stop.style.display="none";
        __gamebutton.div.style.background=STARTCOLOR;

        
        drawBorder(STARTCOLOR);
        //drawTime(STOPCOLOR);

    }


    //draw game Title
    function drawTitle(item){
    
        var ir = __canvas.__isize/2,
            or = __canvas.__osize/2,
            txt;

        __context.font = "bold "+TITLEPX + "px sans-serif";
        __context.fillStyle = TITLECOLOR;
        __context.strokeStyle = TITLEBORDERCOLOR;
        __context.lineWidth = 5;


        switch(item){
        
            case 1:txt = "Save Your Ball!";break;
            case 2:txt = "Pause...";break;
            case 3:txt = "Ball is dead!";break;
        }
            
        var tml = __context.measureText(txt),
            x   = or - tml.width/2,                                        //调整位置
            y   = or/2 + TITLEPX/2;

        __context.strokeText(txt,x,y);
        __context.fillText(txt,x,y);

        __context.lineWidth = 1;                                            //将线得大小调回
    }

    //drawTime
    function drawTime(color){

        var ir = __canvas.__isize/2,
            or = __canvas.__osize/2;

        __context.font = "bold "+FONTPX + "px sans-serif";
        __context.fillStyle = color;

        var ms = __gameTime%1000 + '';
            
        switch(ms.length){
            case 1 : ms = "00" + ms;
                     break;
            case 2 : ms = "0" +ms;
                     break;
        }

        var txt = Math.floor(__gameTime/1000)+'.'+ms+"s",                                        //秒数字符画
            tml = __context.measureText(txt),
            x   = or - tml.width/2,                                        //调整位置
            y   = or + FONTPX/2;

        __context.fillText(txt,x,y);

    }


    /** we need face 
     *
     * @params color  border's color
     */
    function drawBorder(color){

            var ir = __canvas.__isize/2,
                or = __canvas.__osize/2;

            __context.save();
            __context.translate(or,or);

            __context.beginPath();                                                              //画核心
            __context.arc(0,0,ir,0,Math.PI*2,true);
            __context.closePath();
            __context.fillStyle =color; 
            __context.fill();

            __context.beginPath();                                                              //画边
            __context.lineWidth = 10;

            __context.strokeStyle = color;

            __context.arc(0,0,or,0,Math.PI*2,true);

            __context.closePath();
            __context.stroke();

            __context.restore();

            

    };


    /**game engine for calculate and draw
     *
     */
    function game_engine(){


        var i =0,
            ir = __canvas.__isize/2,
            or = __canvas.__osize/2;

        //close engine while not isGamePlay.
        if(!__isGamePlay) return;

        __context.clearRect(-1000,-1000,9999,9999);
        __QUAD.clear();

        drawBorder(STOPCOLOR);
        //drawTime(STARTCOLOR);                                                                   //画上时间

        //run npc point and draw npc point
        for(i=0;i<__pointstore.npc.length;i++){
            __QUAD.insert(__pointstore.npc[i]);
            __pointstore.npc[i]
                .run(ir,or)
                .draw(__context);
        }


        //run and draw self point
        // __QUAD.insert(__pointstore.self);
        // __pointstore.self
        //     .run(ir,or)
        //     .draw(__context);


        //判断与自己点碰撞得球
        // var selfCollidors = __QUAD.retrieve(__pointstore.self);

        // for(i=0;i<selfCollidors.length;i++){

        //     if(__pointstore.self === selfCollidors[i])
        //         continue;
        
        //     if(Point.compete(
        //                 __pointstore.self,
        //                 selfCollidors[i]
        //                 )){
        //         //selfCollidors[i]为npc球
        //         if(selfCollidors[i].id === 2){                                          //判断失败否
        //             __isDead = true;
        //             __isGamePlay = false;
        //             __gameAudio.pause();
        //             setupInit();
        //             drawTitle(3);
        //             return;
        //         }
        //     }
        // }


        i=0
        while(i < __pointstore.npc.length){                                         //只需要判断会移动得球(npc)
        
            var collidors = __QUAD.retrieve(__pointstore.npc[i]);

            for(var j=0;j<collidors.length;j++){
            
                //已经判断过的球跳过,和该球本身
                if(
                    collidors[j].hasJudge ||
                    __pointstore.npc[i] === collidors[j]
                    ) continue;
                
               // if(
                    __pointstore.npc[i].collideEqualMass(collidors[j])
                 //   ) break;

            }

            __pointstore.npc[i].hasJudge=true;

            i++;
        }



        setTimeout(game_engine,DRAWLOOP);


    }


    /**game win
     */
    function game_win(){

    }

    /**game fail
     */
    function game_fail(){

    }



    /*---------------------------------------------------EventListern--------------------------------------------------*/

    function E_game_restart(e){
                                                                        //重新开始
        if(e.keyCode === 85 ||                                          //u
           e.keyCode === 82)                                            //r
            E_game_control();

    }


    /** game controlor 
     *  it well change the color of div and stop canvas_draw
     */
    function E_game_control(){

        

        __isGamePlay = !__isGamePlay;


        //死了就重生
        if(__isDead){
            game_reborn();
            __gameTime = 0; 
            //__gameTime.s = 0;
        }

        //当被设为开启状态时，除了换颜色，还需要重启引擎
        if(__isGamePlay){

            //__gameAudio.play();

            change_start_to_stop();
            timeAdust();
            new_npc_points();
            add_key_down();
            fresh_date();
            game_engine();

        }else{

            __pointstore.self.vel.x=0;                                                      //对自己速度归零，防止出bug
            __pointstore.self.vel.y=0;
            //__gameAudio.pause();

            drawBorder(STARTCOLOR);
            //drawTime(STOPCOLOR);
            //drawTitle(2);
            change_stop_to_start();
            remove_key_down();

        }

    }


    /**时间积累器
     */
    function timeAdust(){

        if(!__isGamePlay) return;


        __gameTime += TIMELOOP;

        setTimeout(timeAdust,TIMELOOP);
    }

    /**if dead,we need fresh all point
     */
    function game_reborn(){

        var or = __canvas.__osize/2;


        //清空npc点
        __pointstore.npc = [];

        //set self Point
        __pointstore.self = new Point(
                
                0,
                or,
                or/2,
                SELFSIZE,SELFCOLOR,
                true
                
                );
        __isDead =false;

    }


    //产生新的npc点
    function new_npc_points(){
        var or = __canvas.__osize/2,
            ir = __canvas.__isize/2;

        if(!__isGamePlay || __pointstore.npc.length > NPCNUMBER)
            return;                                                           //当不在游戏进行中或数量过多时时，退出循环

        var size = Math.random()*(NPCMAXSIZE-NPCMINSIZE)+NPCMINSIZE,
            x = or,
            y = or/2*3;

        for(var i=0;i<__pointstore.npc.length;i++){
            var l = __pointstore.npc[i].loc,
                s = __pointstore.npc[i].size;

            if(
                (s+size)*(s+size) >= (l.x-x)*(l.x-x)+(l.y-y)*(l.y-y)
                    ){
                setTimeout(new_npc_points,NPCLOOP);
                return;                                                         //如果当前有点占位，下一次再加点
            } 
        }
            
        __pointstore.npc.push(new Point(
                    
                    2,
                    x,
                    y,
                    size,NPCCOLOR[Math.floor(Math.random()*NPCCOLOR.length)]              //得到随机颜色

                    ));

        setTimeout(new_npc_points,1000);
        
    }

    //将start按钮改为stop按钮
    function change_start_to_stop(){
        __gamebutton.start.style.display="none";
        __gamebutton.stop.style.display = "block";
        __gamebutton.div.style.background=STOPCOLOR;

    }
    //modify stop button to start button;
    function change_stop_to_start(){
        __gamebutton.start.style.display="block";
        __gamebutton.stop.style.display="none";
        __gamebutton.div.style.background=STARTCOLOR;

    }

    //add keydown listern
    function add_key_down(){
        var isSlow = false,                                                         //是否慢速状态;
            isDown = {
               up:false,
               down:false,
               left:false,
               right:false,
               slow:false,
               restart:false
            };

        window.onkeydown=E_game_keydown;
        window.onkeyup= E_game_keyup;


        /** define the way to deal keydown
         *
         * @params event
         */
        function E_game_keydown(e){


            switch(e.keyCode){
            
                case 83:up();break;                                                          //上w

                case 87:down();break;                                                          //下 s

                case 65:left();break;                                                          //左a

                case 68:right();break;                                                          //右 d

                case 16:                                                                    //shift

                case 74:slow();break;                                                           //SLOW  j 

            }


            function up(){

                var p;

                if(!isDown.up){
                
                    if(isSlow) 
                        p = new PVector(0,SELFSPEED/SLOWRATE);
                    else 
                        p = new PVector(0,SELFSPEED);

                    __pointstore.self.vel.add(p);
                    isDown.up =true;
                }
            }


            function down(){
            
                var p;

                if(!isDown.down){
                    if(isSlow)
                        p = new PVector(0,-SELFSPEED/SLOWRATE);
                    else
                        p = new PVector(0,-SELFSPEED);

                    __pointstore.self.vel.add(p);
                    isDown.down =true;
                }
            }

            function left(){
                
                var p;

                if(!isDown.left){
                    if(isSlow)
                        p = new PVector(-SELFSPEED/SLOWRATE,0);
                    else
                        p = new PVector(-SELFSPEED,0);

                    __pointstore.self.vel.add(p);
                    isDown.left = true;
                }
            }


            function right(){
            
                var p;

                if(!isDown.right){
                    if(isSlow)
                        p = new PVector(SELFSPEED/SLOWRATE,0);
                    else
                        p = new PVector(SELFSPEED,0);

                    __pointstore.self.vel.add(p);
                    isDown.right = true;
                }
            }


            function slow(){
            
                if(!isDown.slow){
                    isSlow = true;

                    __pointstore.self.vel.mult(1/SLOWRATE);
                    isDown.slow = true;
                }
            }

        }




        /** define the way to deal keyup
         *
         * @params event
         */
        function E_game_keyup(e){

            switch(e.keyCode){
            
                case 83:up();break;                                                          //上

                case 87:down();break;                                                          //下

                case 65:left();break;                                                          //左

                case 68:right();break;                                                          //右

                case 16:

                case 74:slow();break;                                                           //SLOW 
            }

            function up(){

                var p;

                if(!isDown.up) return;                                                  //only work while up has down

                if(isSlow) 
                    p = new PVector(0,-SELFSPEED/SLOWRATE);
                else 
                    p = new PVector(0,-SELFSPEED);

                __pointstore.self.vel.add(p);
                isDown.up = false;
            }


            function down(){
            
                var p;

                if(!isDown.down) return;                                                  //only work while down has down

                if(isSlow)
                    p = new PVector(0,SELFSPEED/SLOWRATE);
                else
                    p = new PVector(0,SELFSPEED);

                __pointstore.self.vel.add(p);
                isDown.down =false;
            }

            function left(){
                
                var p;

                if(!isDown.left) return;                                                  //only work while left has down

                if(isSlow)
                    p = new PVector(SELFSPEED/SLOWRATE,0);
                else
                    p = new PVector(SELFSPEED,0);

                __pointstore.self.vel.add(p);
                isDown.left =false;
            }


            function right(){
            
                var p;

                if(!isDown.right) return;                                                  //only work while right has down

                if(isSlow)
                    p = new PVector(-SELFSPEED/SLOWRATE,0);
                else
                    p = new PVector(-SELFSPEED,0);

                __pointstore.self.vel.add(p);
                isDown.right =false;
            }


            function slow(){
            
                if(!isDown.slow) return;                                                  //only work while SLOW  has down

                isSlow = false;

                __pointstore.self.vel.mult(SLOWRATE);
                isDown.slow =false;
            }



        }

    }

    //remove keydown listern
    function remove_key_down(){
        window.onkeydown=function(e){return false};
        window.onkeyup = function(e){return false};
    }

    //fresh date for accurate 
    function fresh_date(){

        for(var i = 0;i<__pointstore.npc.length;i++)
            __pointstore.npc[i].timeFresh();

        __pointstore.self.timeFresh();
    }


    /*--------------------------------------------------------------other----------------------------------------------*/

    window.gameSetup = game_setup;

}(window))
