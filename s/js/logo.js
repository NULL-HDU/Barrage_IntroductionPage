/**
 * logo of last page
 * Created by xana on 15/6/7.
 */
(function(window){


    var speed = 0.03
    var g = 0
    var w,h
    var r = 2 * 4




    function startl(){

        var canvas = document.getElementById("canvasl")
        var ctx = canvas.getContext("2d")

        var lg = document.querySelector("#footInformation div")


        canvas.width = lg.clientWidth*0.5
        canvas.height = canvas.width;

        w = canvas.width
        h = canvas.height

        var R = w/3



        var b1 = new ball(R, 0, r)
        var b2 = new ball(R, -Math.PI*2/3, r)
        var b3 = new ball(R, +Math.PI*2/3, r)

        setInterval(function(){

            ctx.fillStyle = "#000"
            ctx.fillRect(0,0, w, h)

            ctx.save()
            update(b1)
            update(b2)
            update(b3)

            render(b1,"red", ctx)
            render(b2,"greenyellow",ctx)
            render(b3,"gold",ctx)

            ctx.restore()


        },10)
    }


    function render(ball,c,ctx){

        drawBall(ball.x, ball.y, ball.r, c, ctx)

    }

    function update(ball) {

        if (ball.radius < 3*r) {
            ball.v = -ball.v*0.97
        }

        ball.radius -= ball.v
        ball.v += g
        ball.x = w/2+ball.radius*Math.cos(ball.theta)
        ball.y = h/2+ball.radius*Math.sin(ball.theta)

        ball.r = ball.radius/20 + 5

        ball.theta += speed
    }


    function ball(radius, theta, r){
        this.radius = radius
        this.theta = theta
        this.x = w/2+this.radius*Math.cos(this.theta)
        this.y = h/2+this.radius*Math.sin(this.theta)
        this.v = 0
        this.r = r
    }




    function drawBall(x, y, r, c, ctx){

        var or = r * 4;

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();                                                           //画核心
        ctx.arc(0,0,r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle = c;
        ctx.fill();


        ctx.beginPath();                                                              //画边
        ctx.strokeStyle = c;

        var dx = Math.sin(0);
        var dy = Math.cos(0);
        var dig = Math.PI / 7*11;

        for(var i = 0; i<14 ;i ++){

            dx = Math.sin(i*dig);
            dy = Math.cos(i*dig);

            ctx.lineTo(dx*or,dy*or);
        }

        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    window.logoAdjust = startl


}(window))