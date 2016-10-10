/**
 * canvas2 
 * void others 
 */


(function(window){


    var x,y,w,h

   // window.addEventListener("load",start2,false);


    function start2(){

        var canvas2 = document.getElementById("canvas2");
        var context = canvas2.getContext("2d");

        var it2 = document.querySelector("#item2 div")


        w = canvas2.width = it2.clientWidth;
        h = canvas2.height = it2.clientWidth;
    
        x = canvas2.width /2
        y = canvas2.height/2

        setInterval(function(){

            update();
            render(context);


        },25)

    }




    function update(){

        x = w/2 + 5*(Math.random()-0.5)
        y = h/2 + 5*(Math.random()-0.5)
    }

    function render(ctx) {

        ctx.clearRect(0,0, w, h);

        var r = 8;
        var or = 35;

        ctx.save();

        ctx.translate(x*1.2, y);

        ctx.beginPath();                                                           //画核心
        ctx.arc(0,0,r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();


        ctx.beginPath();                                                              //画边
        ctx.strokeStyle = "rgb(255,0,0)";

        var dx = Math.sin(0);
        var dy = Math.cos(0);
        var dig = Math.PI / 7*11;

        for(var i = 0; i<14 ;i ++){

            dx = Math.sin(i*dig);
            dy = Math.cos(i*dig);

            ctx.lineTo(dx*or,dy*or);
        }

        ctx.fillText("DANGER--→",-110,0)

        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    window.Item2Adjust = start2;

}(window))

