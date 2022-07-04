const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;

var balls = [];
var boats = [];

var barco_animation = [];
var barco_spriteData;
var barco_spriteSheet;

var broken_animation = [];
var broken_spriteData;
var broken_spriteSheet;

var gameOver = false;

var som1;
var som2;
var som3;
var som4;

var risada = false;
var pontuacao = 0

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  barco_spriteData = loadJSON("./assets/animation/boat.json");
  barco_spriteSheet = loadImage("./assets/animation/boat .png");
  broken_spriteData = loadJSON("./assets/animation/broken_boat.json");
  broken_spriteSheet = loadImage("./assets/animation/brokenBoat.png");
  som1 = loadSound("./assets/assets_background_music.mp3");
  som2 = loadSound("./assets/assets_cannon_explosion.mp3");
  som3 = loadSound("./assets/assets_cannon_water.mp3");
  som4 = loadSound("./assets/assets_pirate_laugh.mp3");
  
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 20

  cannon = new Cannon(180, 110, 130, 100, angle);


  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  bola = new Cannon_ball(cannon.x,cannon.y);

  var barco_frames = barco_spriteData.frames;
  for(var i = 0; i<barco_frames.length; i++){
    var position = barco_frames[i].position;
    var image = barco_spriteSheet.get(position.x, position.y, position.w, position.h);
    barco_animation.push(image);
  }

  var broken_frames = broken_spriteData.frames;
  for(var i = 0; i<broken_frames.length; i++){
    var position = broken_frames[i].position;
    var image = broken_spriteSheet.get(position.x, position.y, position.w, position.h);
    broken_animation.push(image);
  }


}

function draw() {
  image(backgroundImg,0,0,1200,600)
  if(!som1.isPlaying()){
    som1.play();
    som1.setVolume(1);
  }
  Engine.update(engine);
  for(var i = 0; i<balls.length; i++){
    show_balls(balls[i],i);
    colision(i);
  }
  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  cannon.show();
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  barcos();
  
//i++ = mais um
textSize(40);
text("pontuacao"+pontuacao, windowWidth-400, 50);

}



function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var bola = new Cannon_ball(cannon.x,cannon.y);
    balls.push(bola);
  }
}

function show_balls(ball,index){
  if(ball){
    ball.show();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index)
      som3.play();
      som3.setVolume(0.3);
    }
  }
}

function barcos(){
  if(boats.length > 0){
    if(boats[boats.length-1] === undefined||boats[boats.length-1].body.position.x < width-300) {
      var positions = [-40,-60,-70,-20];
      var pos = random(positions);
      var boat = new Boats(width-79, height-60, 170, 170, pos,barco_animation);
      boats.push(boat);
    }
    for(var i = 0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y: 0});
        boats[i].show();
        boats[i].animate();
        var colision = Matter.SAT.collides(boats[i].body,tower);
        if(colision.collided && !boats[i].isBroken){
          gameOver = true;
          if(!risada && !som4.isPlaying()){
            risada = true;
            som4.play();
            som4.setVolume(10)
          }
          estate();
        }
      }else{
        boats[i];
      }
    }
  } else{
      var boat = new Boats(width-79, height-60, 170, 170, -80, barco_animation);
      boats.push(boat);
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shot();
    som2.play();
  }
}

function colision(index){
  for(var i = 0; i<boats.length; i++){
    if(balls[index]!==undefined && boats[i]!==undefined){
      var colisao = Matter.SAT.collides(boats[i].body,balls[index].body);
      if(colisao.collided){
        score +=1;
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}

function estate(){
  swal(
    {
      title:"perdeu otario",
      text:"joge para perder de novo",
      imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize:"150x150",
      confirmButtonText:"aperta"
    },
    function(isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  )
}