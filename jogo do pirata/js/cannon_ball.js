class Cannon_ball {
    constructor(x,y){
        var options = {
            isStatic: true
          }
          this.r = 30;
          this.body = Bodies.circle(x,y,this.r,options);
          this.image = loadImage("assets/cannonball.png");
          this.trajeto = []   
          World.add(world,this.body)  
          
    }
    
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0, y:0});
        setTimeout(() =>{
            Matter.World.remove(world,this.body);
            delete balls[index]
        }, 2000);
    }
    
    shot(){
        var newAngle = cannon.angle-28;
            newAngle = newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
            velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{x: velocity.x*(180/3.14), y: velocity.y*(180/3.14)});
    }
    show(){
        var pos = this.body.position;
        console.log(pos)
        push();
        imageMode(CENTER);
        image(this.image, pos.x,pos.y,this.r,this.r);
        pop();
        if(this.body.velocity.x>0 && this.body.position.x>300){
            var position = [this.body.position.x, this.body.position.y];
            this.trajeto.push(position);
        }
        for(var i = 0; i<this.trajeto.length; i++){
            image(this.image, this.trajeto[i][0], this.trajeto[i][1], 5,5)
        }
    }
}   