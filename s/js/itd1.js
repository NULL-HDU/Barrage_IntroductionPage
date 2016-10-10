/**
 * canvas1
 * control
 * @xana 2015/6
 */

(function(window){


    var x,y,w,h
    var direction
    var speed = 4
    var slowSpeed = 2
    var slow = true



    //window.addEventListener("load",start2,false);


    function start1() {

        var canvas1 = document.getElementById("canvas1")
        var ctx = canvas1.getContext("2d")

        var it1 = document.querySelector("#item1 div")

        w = canvas1.width = it1.clientWidth;
        h = canvas1.height = it1.clientWidth;

        x = Math.round(w/3)
        y = Math.round(h/3)


        setInterval(function(){

            direction = getDiretion()

            if(slow==true){
                updateS(direction)
            } else {
                update(direction)
            }
            render(ctx)

        }, 20)

    }



    //0,1,2,3 for W,D,S,A
    function getDiretion(){

        //change the speed
        if(x == Math.round(w/3) && y == Math.round(h/3)){
            slow = !slow
        }

        if(x>=w*2/3  && y>h/3){
            return 0
        }if(y>=h*2/3 && x<w*2/3){
            return 1
        }if(x<=w/3 && y<=h*2/3){
            return 2
        }if(y<=h/3 && x>w/3){
            return 3
        }


    }


    function update(d){

        switch(d){
            case 0: y-=speed;break
            case 1: x+=speed;break
            case 2: y+=speed;break
            case 3: x-=speed;break
        }
    }


    function updateS(d){

        switch(d){
            case 0: y-=slowSpeed;break
            case 1: x+=slowSpeed;break
            case 2: y+=slowSpeed;break
            case 3: x-=slowSpeed;break
        }
    }


    function render(ctx){

        ctx.clearRect(0,0,w,h)

        //your ball
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()

        ctx.strokeStyle = "#000000"

        var shift = slow ? "shitf + " : ""
        var dire
        switch (direction){
            case 0: dire = "W";break
            case 1: dire = "D";break
            case 2: dire = "S";break
            case 3: dire = "A";break
        }

        ctx.font = 20+"px Arial"
        ctx.fillText(shift, w/2-20, w/2-10)
        ctx.fillText(dire, w/2, slow ? w/2+20 : w/2)


    }

    window.Item1Adjust = start1;



}(window));
