/** the direction centrol of this code
 *
 * @author MephistoPheies
 */


window.Direction = {

    topMargin:'0',                         //上下边框


    npcMaxSize : 35,                        //npc最大大小
    npcMinSize : 5,                         //npc最小大小
    npcNumber: 40,                          //npc求的
    selfSize : 10,                          //自机大小
    aimSize : 20,                           //终点大小
    protectSize: 20,                        //保护层大小
    protectNum:3,                           //保护层数量
    slowRate:2,                              //放慢速度
    speed : 150,                             //球的速度
    speedAdd : 1,                       //增加速度

    titleBorderColor:"#0066FF",                 //标题边得颜色
    titleColor:"white",                         //标题颜色
    aimColor:"rgba(10,232,243,0.5)",         //目标颜色
    npcColor:["gold","red","cornflowerblue","#0099FF","#6666FF","#66FFFF",
                "#FFCCFF", "greenyellow","#00FF33","#FF3333","#FFFF33"],                      //npc颜色
    selfColor:"white",                   //自己颜色
    protectColor:"rgba(255,255,5,0.6)",   //保护区颜色

    quadObjects:5,                          //quad节点含得球数
    quadLevels:8,                           //quad得深度

    selfSpeed : 250,                        //自己得输的
   
    timeAdustLoop :20,                       //计时器loop时间
    drawLoop : 25,                          //画图loop
    npcLoop : 1000,                             //npc生成loop时间

    fontPX:20,                          //时间大小
    titlePX:100,                            //标题大小

    canvasInRate:0,                           //内圆的比例
    canvasSizeRate:0.83,                  //画布宽度比例
    stopColor:"white",                           //停止按钮颜色
    startColor:"gold",                          //开始按钮颜色
    animationtime:900                       //滚动动画时间


}
