var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var survivalTime;
var scene,sceneImg;

function preload(){
  
  
  monkey_running = loadAnimation("monkey_1.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png",
"monkey_2.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  sceneImg = loadImage("jungleImage.jpg");
 
}



function setup() {
  
  createCanvas(displayWidth,displayHeight);
 
   scene= createSprite(0,0,displayWidth,displayHeight*5);
  scene.addImage( sceneImg);
  scene.scale=3.10
  
  //scene.x= sceneImg.width/8;
  scene.velocityX=-4;

  monkey = createSprite(80,displayHeight-20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  monkey.velocityX = 3;
  
  ground = createSprite(displayWidth/2,displayHeight-10,displayWidth,20);
  ground.velocityX=3;
  //ground.x=ground.width/2;
  ground.visible = false;
 
  
}


function draw() {
  
  background("white");
  
  camera .position.x = monkey.x;
  camera.y = displayHeight/2;

   if(keyDown("space")&&monkey.y>=displayWidth/2-100){
    monkey.velocityY=-12 ; 
   }
    monkey.velocityY = monkey.velocityY + 0.8;    

    monkey.collide(ground);  
  //if (ground.x<0 ){
   //   ground.x = ground.width/2;
    //  }
  
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();

  stroke("white");
  textSize=20;
  fill("white");
  text("Score:"+score,350,50);
  
  stroke("black");
  textSize=20;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+survivalTime,100,50);
  
  obstacle();
  banana();
  drawSprites();
}

function banana(){
  if (camera.position.x%100===0){
    var banana = createSprite(camera.position.x+displayWidth/2,displayHeight/2);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    //banana.velocityX = -3;
    banana.y = Math.round(random(camera.position.x+displayWidth/2+100,displayHeight-60));
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
    banana.lifetime = displayWidth;
  }
}

function obstacle(){
  if (camera.position.x%200===0){
    var obstacle = createSprite(displayWidth/2+800,displayHeight-70,78,56);
    obstacle.addImage( obstacleImage);
    obstacle.scale=0.2;
//    obstacle.velocityX=-2;  
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = displayWidth;
  }
}
