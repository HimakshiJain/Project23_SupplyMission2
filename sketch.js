var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;

var left, leftBody, right, rightBody, bottom, bottomBody;

var leftEdge, leftEdgeBody, rightEdge, rightEdgeBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	rightEdge = createSprite(790,350,20,700);
	rightEdgeBody = Bodies.rectangle(790,350,20,700, {isStatic: true});
	leftEdge = createSprite(10,350,20,700);
	leftEdgeBody = Bodies.rectangle(10,350,20,700, {isStatic: true});
	
	rightEdge.visible = false;
	leftEdge.visible = false;
	
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	left = createSprite(250,610,20,100);
	left.shapeColor = "red";
	leftBody = Bodies.rectangle(150, 330, 20, 100, {isStatic: true});

	right = createSprite(510,610,20,100);
	right.shapeColor = "red";
	rightBody = Bodies.rectangle(510,610,20,100, {isStatic: true});

	bottom = createSprite(380,650,280,20);
	bottom.shapeColor = "red";
	bottomBody = Bodies.rectangle(380,650,280,20, {isStatic: true});

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.2, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	helicopterSprite.velocityX = 2;


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  packageSprite.x = helicopterSprite.x;

  packageSprite.collide(bottom);
  packageSprite.collide(right);
  packageSprite.collide(left);


  rightEdgeCollision();
  leftEdgeCollision();

  packageGroundCollision();
  packageBottomCollision();

  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
   
	Matter.Body.setStatic(packageBody, false);
    
  }
}

function rightEdgeCollision(){
	if(helicopterSprite.collide(rightEdge)){
		helicopterSprite.velocityX = -2;
	}
}

function leftEdgeCollision(){
	if(helicopterSprite.collide(leftEdge)){
		helicopterSprite.velocityX = 2;
	}
}

function packageGroundCollision(){

	
	if(packageSprite.x > right.x|packageSprite.x < left.x){
		if(packageSprite.y > 630){
		packageSprite.visible = true;
		helicopterSprite.visible = true;
		helicopterSprite.velocityX = 0;

		textSize(50);
		text("Mission Failed", 250,350);
		}
	}
}

function packageBottomCollision(){
if(packageSprite.x < right.x & packageSprite.x > left.x){
	if(packageSprite.y > 610){
	//packageSprite.visible = false;
	//helicopterSprite.visible = false;
	helicopterSprite.velocityX = 0;

	textSize(50);
	text("Mission Successful", 200,350);
	}
}
}

function displayBox(){
	
}




