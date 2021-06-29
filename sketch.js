var kid2IMG,kidIMG,glassIMG,groundIMG,trackIMG,carIMG, explosionIMG;
var canvas;
var glass,kid,kid2,car;
var track;
var obstacleGroup
var endIMG
 var score=0;
var PLAY=1
var END=0
var gameState=PLAY;
 var invisbarrier;
function preload(){
kid2IMG=loadImage("kid2.png");
kidIMG=loadImage("kid.png");
groundImg=loadImage("ground.png");
trackIMG=loadImage("track.png");
glassIMG=loadImage("broken_glass.png")
carIMG=loadImage("car3.png");
explosionIMG=loadImage("explosion.png");
 endIMG=loadImage("gameend.png"); 
}

function setup(){
  createCanvas(displayWidth - 20, displayHeight-30);

obstacleGroup=new Group();


car=createSprite(displayWidth/4,displayHeight, 50,50);
car.addImage(carIMG);
track=car.x;

sign=createSprite(displayWidth/4,displayHeight/4,15,15);
sign.addImage(endIMG);
sign.visible=false

invisbarrier=createSprite(displayWidth/2,displayHeight/2,5,displayHeight*10);

}

// it cant go off the road
// objects shouldnt spawn in fron of the car
//

function draw(){
 background("white")   
 image(trackIMG, 0,0,displayWidth/2, displayHeight*2);
 image(trackIMG, 0,-displayHeight*2,displayWidth/2, displayHeight*2);
  image(trackIMG, 0,-displayHeight*4,displayWidth/2, displayHeight*2);
  image(trackIMG, 0,-displayHeight*6,displayWidth/2, displayHeight*2);
  image(trackIMG, 0,-displayHeight*8,displayWidth/2, displayHeight*2);
  image(trackIMG, 0,-displayHeight*10,displayWidth/2, displayHeight*2);

 
// kid1.velocityY=5
   //make the car move

   if(gameState===PLAY){
    car.velocityY=-5 
   if(keyDown(LEFT_ARROW)){
    car.x=car.x-5
    tracker=car.x;
   }
   if(keyDown(RIGHT_ARROW)){
        car.x=car.x+5
        tracker=car.x;
      } 
 camera.position.y=car.y;
 car.collide(invisbarrier);
spawnKid();
if(car.isTouching(obstacleGroup)){
  car.addImage(explosionIMG);
gameState=END;
  endGame();
 }
}

drawSprites();
}   

function spawnKid(){
var randomNumber = Math.round(random(1,6))
var rand=Math.round(random(0,displayWidth/2))
//var rand2=Math.round(random(displayWidth-10,diplayWidth-30))
if(World.frameCount%50 ===0){
var obstacle = createSprite(rand,car.y-30);
obstacle.debug=true
switch(randomNumber){
  case 1:{ obstacle.addImage(kidIMG)
  obstacle.scale=0.5
obstacle.setCollider("rectangle",0,0,100,120)}
  break;
  
  case 2:{ obstacle.addImage(kid2IMG)
  obstacle.scale=0.8
obstacle.setCollider("rectangle",0,0,100,120)}

  break;
  case 3:
    case 4:
      case 5:
        case 6:{ obstacle.addImage(glassIMG)
  obstacle.scale=0.3
obstacle.setCollider("rectangle",0,0,50,60)}
  break;
}
obstacleGroup.add(obstacle);
}
}
function endGame(){
obstacleGroup.destroyEach();
car.velocityY=0;
gameState=1;
sign.visible=true;
}
