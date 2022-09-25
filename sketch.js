var bg,birdst,bird,birdm;
var start,tittle;
var gamestate= "start";
var obj,o,objGroup;
var obja,oa,objGroupa;    
var score ;
var invi,invigr;
var fontRegular


function setup() {
  createCanvas(displayWidth, displayHeight);

  bird= createSprite(200,500);
     bird.addAnimation("staty",birdst)
     bird.addAnimation("walk",birdm);
     bird.scale = 0.5;
     bird.setCollider("rectangle", 0, 15, 55, 55);
     
    

     start= createSprite(750,450);
     start.addAnimation("h",starta)
     start.scale= 0.5;


     tittle = createSprite(750,250);
     tittle.scale= 2
     tittle.addImage(tittlea)
        
     score= 0;



     objGroup=new Group();
     objGroupa=new Group();
     invigr=new Group();





  
}

function preload(){
 bg= loadImage("bg.jpg");
 birdst=loadAnimation("br1.png")
 birdm=loadAnimation("br1.png","br2.png","br3.png","br4.png","br5.png","br6.png");
 starta=loadAnimation("strt.png")
 tittlea=loadImage("tt.png")
 sound = loadSound("n.mp3")
 sou=loadSound("g.mp3")
 soi= loadSound('ne.mp3')
 o=loadImage("b.png")
 oa=loadImage("h.png")
 fontRegular = loadFont('Flappy-Bird.ttf');
}

function draw() {
  background(bg);  
  

  if(gamestate==="start"){
    score=0;
    

   bird.changeAnimation("staty",birdst)
    bird.velocityY=0;
    
    
 

  bird.x=200;
  bird.y=500;

    tittle.velocityY=0;
    start.velocityY=0


   tittle.x=750
   tittle.y= 250;
 
  start.x=750;
  start.y=450

  if (mousePressedOver(start)){
       gamestate="play";
       sou.play()
  }


  }

  if(gamestate==="play"){
    tittle.velocityY=5;
    start.velocityY=-5
    bird.changeAnimation("walk",birdm);
    spawn();
    spa();
    iaminvisible();
   
    textFont(fontRegular);
    textSize(50);
    fill("white")
    
    
   
   
    text("score: "+score,40,40)
    
    spawn();
    spa();
    iaminvisible();
    if(invigr.isTouching(bird)){
      score=score+1;
   }

    
    

    
    



    if(keyDown("space") ) {
      bird.velocityY = -12;
      sound.play();
    }

    bird.velocityY = bird.velocityY + 0.8



    if(bird.y>864){
      gamestate="start"
      console.log("hi");
      soi.play()
      destroy();
      


    }

   



    

    if(objGroup.isTouching(bird) || objGroupa.isTouching(bird) ){
      gamestate="start";
      soi.play()
      destroy();
    }

  
  }



  drawSprites();
}





function spawn(){

  if(frameCount % 50=== 0){
      obj = createSprite (1600,Math.round(random(630,800)));
      obj.addImage(o);
      obj.velocityX = -(9 + 3*score/100);
      objGroup.add(obj);
      obj.scale=0.5;
      obj.lifetime=400;




     
     

  }

}

function spa(){


    if(frameCount %50 === 0){
      obja = createSprite(1600,Math.round(random(30,60)));
      obja.addImage(oa);
      obja.velocityX = -(9 + 3*score/100);
      obja.scale=2;
      objGroupa.add(obja);
     
      obja.lifetime=400;
      obja.setCollider("rectangle", 0,0,50,150);
      
     
      


    }
}

function iaminvisible(){

  if(frameCount %50=== 0){
    invi=createSprite(1600,300,20,1000);
    invi.velocityX = -(9 + 3*score/100);
    invi.visible=false;
    invigr.add(invi);
    invi.lifetime=400;
    invi.debug = !invi.debug;
    
    

  }
}



function destroy(){
    objGroup.destroyEach();
    objGroupa.destroyEach();
    gamestate="start";
    invigr.destroyEach();
}
