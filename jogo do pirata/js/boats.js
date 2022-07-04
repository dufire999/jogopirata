class Boats{
    constructor(x, y, width, height, boatsPos, barco_animation){
        this.animation = barco_animation;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x,y, width, height);
        this.width = width;
        this.height = height;
        this.image = loadImage("assets/boat.png");
        this.boatsPosition = boatsPos;
        this.isBroken = false
        World.add(world,this.body); 
    }
    animate(){
        this.speed += 0.05;
    }
    
    remove(index){
        this.animation = broken_animation;
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        this.isBroken = true;
        setTimeout(() =>{
            Matter.World.remove(world,boats[index].body);
            delete boats[index]
        }, 2000);
    }

    show(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed%this.animation.length);
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0,this.boatsPosition,this.width,this.height);
        pop();
    }
}