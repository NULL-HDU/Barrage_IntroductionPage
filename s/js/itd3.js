/**
 * canvas3
 * resist 
 */

(function(window){

	var x,y,w,h
	var frame = true

	//window.addEventListener("load",start3,false);

	function start3(){

		var canvas3 = document.getElementById("canvas3");
		var context3 = canvas3.getContext("2d");

        var it3 = document.querySelector("#item3 div")

		w = canvas3.width = it3.clientWidth
		h = canvas3.height = it3.clientWidth

		x = w/2
		y = h/2

		setInterval(function(){

			update();
			render(context3);

		}, 500);

	};

	function update(){};
	function render(ctx){

		var r = 20;

		ctx.clearRect(0,0,w,h);

		ctx.save();
		ctx.translate(w/2, h/2);


        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

      
        if(frame){
        	ctx.moveTo(-r*1.7, -r/2)
		    ctx.lineTo(-r*1.5,0);
		    ctx.lineTo(0, -r/2);
		    ctx.lineTo(r*1.5,0);
		    ctx.lineTo(r*1.7, -r/2)

		    ctx.moveTo(-r*0.6, r*1.6)
		    ctx.lineTo(-r*0.75,r*1.2)
		    ctx.lineTo(0,r/2)
		    ctx.lineTo(r*0.75,r*1.2)
		    ctx.lineTo(r*0.6, r*1.6)

		    ctx.strokeStyle = "#000000"
		    ctx.stroke();
        } else {

        	ctx.moveTo(-r*1.2, -r*2)
		    ctx.lineTo(-r*1.2,-r*1.2);
		    ctx.lineTo(0, 0);
		    ctx.lineTo(r*1.2,-r*1.2);
		    ctx.lineTo(r*1.2, -r*2)

		    ctx.moveTo(-r*0.6, r*1.6)
		    ctx.lineTo(-r*0.75,r*1.2)
		    ctx.lineTo(0,r/2)
		    ctx.lineTo(r*0.75,r*1.2)
		    ctx.lineTo(r*0.6, r*1.6)

		 
		    ctx.strokeStyle = "#000000"
		    ctx.stroke();

            //the words
		    ctx.fillText("I am the best!" , -r,-3*r)
        }


        frame = !frame
  
        ctx.restore();


	};


    window.Item3Adjust = start3;


}(window));