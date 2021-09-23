const Engine = Matter.Engine; 
const Render = Matter.Render; 
const World = Matter.World; 
const Bodies = Matter.Bodies; 
const Constraint = Matter.Constraint;
 const Body = Matter.Body; 
 const Composites = Matter.Composites; 
 const Composite = Matter.Composite;

 let hoop,hoopimg; 
 let button; 
 let brick; 
 let button2; 
 let ball_con; 
 let ball_con_2; 
 let basketball1; 
 let bg_img; 
 let ball;


 function preload() { 
   bg_img = loadImage('brick.jpg'); 
   hoopimg = loadImage('hoop.jpg'); 
   ball = loadImage('basketball.png'); 
  }

  function setup() { 
    createCanvas(600,700); 
    engine = Engine.create(); 
    world = engine.world; 
    button = createImg('button.jpg'); 
    button.position(100,90); 
    button.size(50,50); 
    button.mouseClicked(drop); 
    
    button2 = createImg('button.jpg'); 
    button2.position(450,90); 
    button2.size(50,50); 
    button2.mouseClicked(drop2); 
    
    rope = new Rope(7,{x:120,y:90}); 
    rope2 = new Rope(7,{x:490,y:90}); 
    
    ground = new Ground(300,height,width,20); 
    hoop = createSprite(200,height-80,100,100); 
    hoop.addImage('hoop',hoopimg) 
    hoop.scale = 0.2; 
   
    fill("red")
    block= createSprite(250,250,50,50);
    block.velocityX = 3;
    
    basketball1 = Bodies.circle(300,300,20); 
    Matter.Composite.add(rope.body,basketball1); 
    
    ball_con = new Link(rope,basketball1); 
    ball_con_2 = new Link(rope2,basketball1); 

  
    
    rectMode(CENTER); 
    ellipseMode(RADIUS); 
    textSize(50) 
  }

  function draw() { 
    background(51); 
    image(bg_img,0,0,width,height); 
    push(); 
    imageMode(CENTER); 
    if(basketball1!=null){ 
      image(ball,basketball1.position.x,basketball1.position.y,70,70); 
    } pop(); 
    
    if(block.position.x > 600) {
      block.velocityX=-3; 
    } 
      if(block.position.x < 0){ 
        block.velocityX=3; }
    
        rope.show(); 
    rope2.show(); 
    block.display();
    
    Engine.update(engine); 
    ground.show(); 
    var distance=dist(basketball1.position.x,basketball1.position.y,block.position.x,block.position.y); 
    if(distance<=20) { 
      World.remove(engine.world,basketball1); 
      basketball1 = null; 
    } 
    drawSprites();
   }

  function drop() { 
    rope.break(); 
    ball_con.dettach(); 
    ball_con = null; 
  }

  function drop2() { 
    rope2.break(); 
    ball_con_2.dettach(); 
    ball_con_2 = null; 
  }

  function collide(body,sprite, x) { 
    if(body!=null) { 
      var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y); 
      if(d<=x) { 
        return true; 
      } else{ 
        return false; 
      } 
    } 
  }
