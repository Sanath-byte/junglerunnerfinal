var HOME = 2;
var PLAY = 1;
var END = 0;
var gameState = HOME;
var invisibleGround, ground,  runner, forest1, forest2, vines;
var groundImg, tigerImg, appleImg, bananaImg, melonImg, jungle_runner, hunterImg, forest1Img, forest2Img, vinesImg, hunter2Img, tiger2Img;
var plop, over, jump;
var gameOver, restart, logo, logoImg, pl, plImg;
var score = 0;
var scoreImg, scr;

function preload(){
    jungle_runner = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "4.png", "3.png", "2.png");
    tigerImg = loadImage("tiger.png");
    tiger2Img = loadImage("tiger2.png");
    appleImg = loadImage("apple.png");
    bananaImg = loadImage("banana.png");
    melonImg = loadImage("watermelon.png");
    hunterImg = loadImage("hunter.png"); 
    hunter2Img = loadImage("hunter2.png");
    forest1Img = loadImage("forest1.png");
    forest2Img = loadImage("forest2.png");
    groundImg = loadImage("ground.png");
    restartImg = loadImage("retry.png");
    gameOverImg = loadImage("gameOver.png");
    scoreImg = loadImage("score.png");
    logoImg = loadImage("logo2.png");
    plImg = loadImage("play.png");

    plop = loadSound("plop.mp3");
    over = loadSound("over.mp3");
    jump = loadSound("jump.mp3");
}

function setup(){
    createCanvas(630,340);

    logo = createSprite(315,150);
    logo.addImage(logoImg);
    logo.scale = 0.7;

    pl = createSprite(350,270);
    pl.addImage(plImg);
    pl.scale = 0.7;

    scr = createSprite(40,17);
    scr.addImage(scoreImg);
    scr.scale = 0.1;
  
    runner = createSprite(100,285,20,50);
    runner.addAnimation("runner", jungle_runner);
    runner.scale = 0.35;
    
    fruitGroup = createGroup();
    enemyGroup = createGroup();

    ground = createSprite(370, 325);
    ground.addImage(groundImg);
    ground.scale = 0.6;
    ground.velocityX = -4;
    ground.lifetime = 400;

    
    invisibleGround = createSprite(300,320,400,10);
    invisibleGround.visible = false;

    }

function draw(){
    background(forest1Img);
    fill("#2AA5F9");
    stroke("pink");
    textSize(20)
    textFont('Georgia');
    text(": " + score, 80,21);

    if (ground.x < 450){
        ground= createSprite(1000,325);
        ground.addImage(groundImg);
        ground.scale = 0.6;
        ground.velocityX = -4;
        ground.lifetime = 400;
    }

    if(gameState === HOME){

        logo.visible = true;
        pl.visible = true;
        runner.visible = false;

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();

        if(mousePressedOver(pl)) {
            logo.visible = false;
            pl.visible = false;
            runner.visible = true;
            gameState = PLAY; 
           }
    }

    if(gameState === PLAY){

        //logo = createSprite(315,150);
        //logo.addImage(logoImg);
        //logo.scale = 0.7;

        //pl = createSprite(350,270);
        //pl.addImage(plImg);
        //pl.scale = 0.7;

        gameOver = createSprite(300,140);
        gameOver.addImage(gameOverImg);
        
        restart = createSprite(300,250);
        restart.addImage(restartImg);
        
        gameOver.scale = 1.5;
        restart.scale = 0.3;
      
        gameOver.visible = false;
        restart.visible = false;
        logo.visible = false;
        pl.visible = false;
    

        runner.setCollider("rectangle",0,0,100,170);

    //invisibleGround.debug = true;
    //ground.debug = true;
    //runner.debug = true;

   
    if(keyDown(UP_ARROW)&& runner.y > 280){
        runner.velocityY = -12;
        jump.play();
    }

    runner.velocityY = runner.velocityY + 0.8

    if(fruitGroup.isTouching(runner)){
        fruitGroup.destroyEach();
        plop.play();
        score = score+1;
    }

    if(enemyGroup.isTouching(runner)){
        enemyGroup.destroyEach();
        over.play();
        ground.destroyEach;
        score = 0;
         gameState = END;    
    }

    runner.collide(invisibleGround);
   }

  else if(gameState == END){

    gameOver.visible = true;
    restart.visible = true;
    logo.visible = false;
    pl.visible = false;

       runner.velocityY = 0;
       runner.velocityX = 0;

       fruitGroup.destroyEach();
       enemyGroup.destroyEach();


       runner.destroy();


       fruitGroup.velocityX = 0;
       fruitGroup.velocityY = 0;

       enemyGroup.velocityX = 0;
       enemyGroup.velocityY = 0;

       if(mousePressedOver(restart)) {
        reset();
      }
     }
    
    spawnFruits();
    spawnTiger();
    spawnEnemy();
    drawSprites();
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    logo.visible = false;
    pl.visible = false;
    runner = createSprite(100,285,20,50);
    runner.addAnimation("runner", jungle_runner);
    runner.scale = 0.35;
}

function spawnFruits(){
    if (frameCount % 160 === 0){
      var fruit = createSprite(650,200,10,40);
      fruit.y = Math.round(random(200,300));
      fruit.velocityX = -4
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: fruit.addImage(melonImg);
                 break;
         case 2: fruit.addImage(bananaImg);
                 break;
         case 3: fruit.addImage(appleImg);
                 break;
         
         default: break;
       }
       fruit.scale = 0.15;
       fruit.lifetime = 300;
       fruitGroup.add(fruit);
    }
}

    function spawnTiger(){
        if (frameCount % 179 === 0){
          var tig = createSprite(650,300,10,40);
          tig.velocityX = -4;
           var rand = Math.round(random(1,2));
           switch(rand) {
             case 1: tig.addImage(tigerImg);
                     break;
             case 2: tig.addImage(tiger2Img);
                     break;
             default: break;
           }
           tig.scale = 0.15;
           tig.lifetime = 170;
           enemyGroup.add(tig);
           tig.setCollider("rectangle", 0,0, 100,100);
           //tig.debug = true;
        }
    }

    function spawnEnemy(){
        if (frameCount % 500 === 0){
          var enemy = createSprite(640,295,10,40);
          enemy.velocityX = -4;
           var rand = Math.round(random(1,2));
           switch(rand) {
             case 1: enemy.addImage(hunterImg);
                     break;
             case 2: enemy.addImage(hunter2Img);
                     break;
             default: break;
           }
           enemy.scale = 0.125;
           enemy.lifetime = 170;
           enemyGroup.add(enemy);
           enemy.setCollider("rectangle",0,0,100,100);
           //enemy.debug = true;
        }
    }