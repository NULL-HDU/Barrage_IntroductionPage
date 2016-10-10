/** there is tools about point
 *  and Point class self
 *
 *@author MephistoPheies&MIKUMIKU
 */

(function(window){

    var Direction = window.Direction,
        SPEED = Direction.speed,
        SPEEDADD = Direction.speedAdd;

    /*------------------------------------------------Point------------------------------------------------*/


    function Point(id,x,y,size,color,hasV){

        this.id = id; 
        this.size = size;
        this.bounce = 1.0;
        this.color = color;

        this.hasJudge = false;

        this.timeStamp = new Date();

        this.loc =new PVector(x,y); 

        if(!hasV)
            this.vel =new PVector(
                              __Random(-SPEED,SPEED),
                              __Random(-SPEED,SPEED)
                    );
        else{
            this.vel = new PVector(0,0);
            this.self = true;                                   //true 表示不会碰撞反弹
        } 
    }

    Point.prototype.colliding = false

    // Main method to operate object
    Point.prototype.run = function (i,o) {
        this.update();                                      //位移更新
        
        this.borders(i,o);                                     //判断是否撞到边界
        this.hasJudge=false;

        return this;
    }

    // Method to update location
    Point.prototype.update = function() {
        var date = new Date();

        this.loc.add(PVector.mult(
                    this.vel,
                    (date - this.timeStamp)/1000));

        //更新速度变化时间点
        this.timeStamp =date;

    }

    // Check for bouncing off borders
    Point.prototype.borders = function(ir,or) {

        var R =new PVector(or,or),
            dR = PVector.sub(this.loc,R);

        if (dR.mag()+this.size >= or) {

            var Rdot = PVector.normalize(dR).dot(this.vel)*2,
                dv = PVector.setMag(dR,Rdot+SPEEDADD),
                dor = PVector.setMag(dR,or-this.size);

            if(!this.self){
               this.vel.sub(dv);
               this.vel.setMag(this.vel.mag()+SPEEDADD);
            }

            this.loc = PVector.add(R,dor);
        }
        else if (dR.mag()-this.size <= ir) {

            var Rdot = -PVector.normalize(dR).dot(this.vel)*2,
                dv = PVector.setMag(dR,Rdot),
                dor = PVector.setMag(dR,ir+this.size);

            if(!this.self){
               this.vel.add(dv); 
               this.vel.setMag(this.vel.mag()+SPEEDADD);
            }

            this.loc = PVector.add(R,dor);
        }
    }

    Point.prototype.collideEqualMass = function(other) {
        var d = PVector.dist(this.loc, other.loc);
        var sumR = this.size + other.size;
        // Are they colliding?
        if ( d < sumR) {
            //direct their distance
            var dloc = PVector.sub(this.loc,other.loc),
                dtogether = PVector.mult(
                        dloc.normalize(),
                        (sumR-d)*1.3 );
            this.loc.add(dtogether);

            // Yes, make new velocities!
            this.colliding = true;
            // Direction of one object another
            var n = PVector.sub(other.loc, this.loc);
            n.normalize();

            // Difference of velocities so that we think of one object as stationary
            var u = PVector.sub(this.vel, other.vel);

            // Separate out components -- one in direction of normal
            var un = Point.componentVector(u, n);
            // Other component
            u.sub(un);
            // These are the new velocities plus the velocity of the object we consider as stastionary
            this.vel = PVector.add(u, other.vel);
            other.vel = PVector.add(un, other.vel);

            var dloc = PVector.sub(this.loc,other.loc),
                dtogether = PVector.mult(
                        dloc.normalize(),
                        d );


            return true;
        }

        return false;
    }


    //更新速度变化时间点
    Point.prototype.timeFresh = function(){

        this.timeStamp = new Date();
    }

    // Method to display
    Point.prototype.draw = function(ctx) {

        

        var self = this;

        //draw Point by its id
        switch(this.id){
        
            //画自己
            case 0: drawEasePoints();
                    break;

            //画npc
            case 2: drawEvil();
                    break;
        }


        //draw PROTECT and aimPoint and selfPoint
        function drawEasePoints(){
            
        
            ctx.save();
            ctx.translate(self.loc.x,self.loc.y);

            ctx.beginPath();
            ctx.arc(0,0,self.size,0,Math.PI*2,true);
            ctx.fillStyle = self.color;
            ctx.fill();

            ctx.restore();

        }


        //draw evil points ,NPC
        function drawEvil(){
            
        

            var s = self.size;

            ctx.save();
            ctx.translate(self.loc.x,self.loc.y);

            ctx.beginPath();                                                              //画核心
            ctx.arc(0,0,self.size/4,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fillStyle =self.color; 
            ctx.fill();

            ctx.beginPath();                                                              //画边
            ctx.strokeStyle = self.color;

            var dx = Math.sin(0);
            var dy = Math.cos(0);
            var dig = Math.PI / 7*11;

            for(var i = 0; i<14 ;i ++){

                dx = Math.sin(i*dig);
                dy = Math.cos(i*dig);

                ctx.lineTo(dx*s,dy*s);
            }

            ctx.closePath();
            ctx.stroke();

            ctx.restore();

            

        }

    }


    /**********************Point class methon***********************/

    //得到两点得距离差值
    Point.distance = function(p1,p2){
        return PVector.dist(p1.loc,p2.loc);
    }


    //判断是否碰撞.
    Point.compete = function(p1,p2){

        return Point.distance(p1,p2) <= p1.size+p2.size
    }

    /** 两球碰撞后得到冲量值
     */
    Point.componentVector =function(vector, directionVector) {
        directionVector.normalize()
        directionVector.mult(vector.dot(directionVector))
        return directionVector
    }

    /*-------------------------------------------------------PVector------------------------------------*/
    /**以下定义了向量运算**/

    //设定向量
    function PVector(x, y){
        this.x = x || 0
        this.y = y || 0
    }





    PVector.prototype.mag = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }


    //获取副本
    PVector.prototype.get = function () {
        return this;
    }





    PVector.prototype.add = function (p) {
        if(! p instanceof PVector ) return
        this.x += p.x
        this.y += p.y
    }




    PVector.prototype.sub = function (p) {
        if(! p instanceof PVector ) return
        this.x -= p.x
        this.y -= p.y
    }


    //向量乘法
    PVector.prototype.mult = function (mulfFactor) {
        this.x *= mulfFactor
        this.y *= mulfFactor
    }


    //向量除法
    PVector.prototype.div = function (divFactor) {
        if(!divFactor){
            var err = "Can't div 0"
            
            throw new Error(err)
        } else {
            this.x /= divFactor
            this.y /= divFactor
        }

    }

    //设定模长
    PVector.prototype.setMag = function (newMag) {
        if( !PVector.mag(this) ){
            this.x= this.y =0
        } else {
            var m = newMag / PVector.mag(this)
            this.mult(m)
        }

    }

    //限制模长
    PVector.prototype.limit = function (limitation) {
        if(mag(this) > limitation ){
            this.setMag(limitation)
        }
    }

    //向量单位化
    PVector.prototype.normalize = function () {
        this.setMag(1.0);

        return this;
    }

    //向量积
    PVector.prototype.dot = function(p) {
        return this.x* p.x + this.y* p.y
    }

    //计算平面角度
    PVector.prototype.heading2D = function () {
        if(!this.x){
            if(!this.y){
                return 0
            }
            if(this.y>0){
                return Math.PI/2
            } else return - Math.PI/2

        }


        if (this.x > 0 ){
            return Math.atan(this.y/this.x)

        } else {

            if(this.y>0){
                return Math.atan(this.y / this.x) + Math.PI

            } else
                return Math.atan(this.y / this.x) - Math.PI
        }
    }





    /*******************class methon********************/

    //向量差
    PVector.sub =function(p1, p2) {
        return new PVector(p1.x-p2.x, p1.y-p2.y)
    }

    //计算模长
    PVector.mag= function(p){
        return Math.sqrt(p.x * p.x + p.y * p.y)
    }

    //向量和
    PVector.add = function(p1, p2) {
        return new PVector(p1.x+p2.x, p1.y+p2.y)
    }


    //计算距离
    PVector.dist = function(p1,p2) {
        return PVector.mag(new PVector(p1.x-p2.x, p1.y- p2.y))
    }

    //计算并得到扩大后的向量
    PVector.mult = function (p,mulfFactor) {
        var x = mulfFactor*p.x,
            y = mulfFactor*p.y;

        return new PVector(x,y);


    }

    PVector.setMag = function (p,newMag) {
        if( !PVector.mag(p) ){
            return new PVector(0,0);
        } else {
            var m = newMag / PVector.mag(p) || 0;
            return PVector.mult(p,m)
        }

    }

    PVector.normalize =function(p){

        return PVector.setMag(p,1.0);
    }
    /*--------------------------------------------------------other tool----------------------------------*/

    //随机函数
    function __Random(m, n){
        return Math.round(Math.random()*(n - m) + m);
    }

    function __Limit (l, min, max) {
        if(l > max) {
            l = max
        }
        if(l < min) {
            l = min
        }
    }
    /*------------------------------------------------------------------------------------------*/

    window.Point = Point;
    window.PVector =PVector;

}(window))
