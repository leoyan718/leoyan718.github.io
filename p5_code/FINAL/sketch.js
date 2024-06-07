let player;
let gravity = 0.25;
let layer = []; // Array of the layers
let layerImages = []; // Array of images
let tiledmap;
let pickupImage;
let backgroundimage;
let splashscreen;
let BACKGROUND = 0;
let BACKGROUND2 = 1;
let BACKGROUND3 = 2;
let BACKGROUND4 = 3;
let GROUND = 4;
let DEATH = 5;
let FOREGROUND = 6;
let steps = 0;
let mgr;
let pickup;
let font;
let treadmillVelocity = -1.05
let focusCameraOnPlayer = false;

//sound variables
let sound1; //ENDING SOUND
let sound2; // JUMPING
let sound3; // DEATH
let music; //GAMEPLAY MUSIC
let soundOn = false;

function preload() {
  tiledmap = loadTiledMap("finalworld", "images");
  pickupImage = loadImage("images/waterbottle.png")
  backgroundimage = loadImage("images/1.png")
  splashscreen = loadImage("images/splashscreen.png")
  sound1 = loadSound("assets/GTA.mp3");
  sound2 = loadSound("assets/luffyjump.mp3");
  sound3 = loadSound("audio/deathsound.mp3");
  music = loadSound ("audio/reachforthesummit.mp3");
  font = loadFont("assets/skeleboom.ttf")

}

function setup() {
  createCanvas(920, 480);


  // Initialize SceneManager
  mgr = new SceneManager();
  mgr.steps = 0;
  mgr.addScene(Intro);
  mgr.addScene(Game);
  mgr.addScene(End);
  mgr.addScene(GameOver);
  mgr.addScene(Help);
  mgr.showNextScene();

  
  layer = getTilemapLayers(tiledmap); 
  layerImages = getTilemapImages(tiledmap); 
  sound2.setVolume(0.25); // jump sound

  //creating pickupppp
  pickup = new Pickup(1190,270);    //demo: 200,100
}

function draw() {
  mgr.draw();
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

// INTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
function Intro() {
  this.setup = function() {
    console.log("Intro setup");
  };

  this.draw = function() {
    background(splashscreen);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(40);
    text("The Final Run", width / 2, height / 2);
    textSize(16);
    text("Press any key to start the cardio workout", width / 2, height / 2 + 150);
  };

  this.keyPressed = function() {
    resetGame(); 
    this.sceneManager.showNextScene(); 
  };
}

//GAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
function Game() {
  this.setup = function() {
    console.log("Game setup");
    resetGame();
    player = createSprite(50, 50);
    player.velocity.x = 0;
    player.setDefaultCollider();
    player.alive = true;
    player.addAnimation('stand', 'anims/PINKWALK006.png');
    player.addAnimation('walk', 'anims/PINKRUN001.png', 'anims/PINKRUN002.png', 'anims/PINKRUN003.png', 'anims/PINKRUN004.png', 'anims/PINKRUN005.png', 'anims/PINKRUN006.png');
    player.scale = 1.5;
    soundOn = true;
    updateMusic();
    focusCameraOnPlayer = true;
  };

  this.draw = function() {
    background(backgroundimage);
    let scaleFactor = 1;


    camera.position.x = player.position.x + width / 4; 
    camera.position.y = height / 2; 

    checkInput();
    checkWorldBounds(player, tiledmap);

    // Drawing the layers
    image(layerImages[BACKGROUND], 0, 0);
    image(layerImages[BACKGROUND2], 0, 0);
    image(layerImages[BACKGROUND3], 0, 0);
    image(layerImages[BACKGROUND4], 0, 0);
    image(layerImages[GROUND], 0, 0);
    image(layerImages[DEATH], 0, 0);

    handlePickups();
    drawSprite(player);
    displaySteps();

    

    image(layerImages[FOREGROUND], 0, 0);

    if (focusCameraOnPlayer) { 
      focusCamera(player, tiledmap);
    }


    fill(255);
    textSize(14);
    textFont(font);
    textAlign(RIGHT, TOP);
    text("Press 'H' for help", camera.position.x + width / 2 - 10, camera.position.y - height / 2 + 10);
  };

  this.keyPressed = function() {
    if (keyCode === 77) { // M to toggle sound
      soundOn = !soundOn;
      updateMusic();
    } else if (keyCode === 72) { // H to show help
      this.sceneManager.showScene(Help);
    }
  };
}

function updateMusic() {
  if (soundOn) {
    if (!music.isPlaying()) {
      music.loop();
      music.setVolume(0.2);
    }
  } else {
    music.stop();
  }
}

function handlePickups(){

  if (pickup.checkHit(player)) {
    pickup.destroy(); 
    mgr.steps = steps;
    console.log("Pickup collected!");
    mgr.showScene(End); 
  } else {
    pickup.show(); 
  }
}

function resetGame() {
  steps = 0; 
  soundOn = true; 
  updateMusic();

}


function End() {
  this.setup = function() {
    music.stop(); 
    console.log("End setup");
    focusCameraOnPlayer = false;
  };

  this.draw = function() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(32);
    text("Stay hydrated!", width / 2, height / 2);
    textSize(24);
    text("Steps taken: " + mgr.steps, width / 2, height / 2 + 20);
    textSize(16);
    text("Press ENTER to play again", width / 2, height / 2 + 40);
    noLoop(); 
  };

  this.keyPressed = function() {
    if (keyCode === ENTER) {
      location.reload(); 
    }
  };
}


function GameOver() {

  this.setup = function() {
  };

 this.draw = function() {
  sound3.play(); 
  noLoop()
 
  background(255, 0, 0); 
  fill(255); 
  textSize(32);
  textFont(font);
  textAlign(CENTER);
  text("TOO SLOW!", width / 2, height / 2);
  textSize(24);
  text("Keep running next time!", width / 2, height / 2 + 20);
  textSize(16);
  text("Press ENTER to play again", width / 2, height / 2 + 60);
};


this.keyPressed = function() {
  if (keyCode === ENTER) {
    
    location.reload(); 
  }
};
}

function Help() {
  this.setup = function() {
    console.log("Help setup");
  };

  this.draw = function() {
    background(100);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(32);
    text("Help", width / 2, height / 2 - 40);
    textSize(16);
    text("Use Arrow keys to move the player", width / 2, height / 2);
    text("Use 'SPACE' to jump", width / 2, height / 2+20);
    text("Press 'M' to toggle music on/off", width / 2, height / 2 + 40);
    text("Press 'H' to return to game", width / 2, height / 2 + 60);
  };

  this.keyPressed = function() {
    if (keyCode === 72) { // H to return to the game
      this.sceneManager.showScene(Game);
    }
  };
}


function checkInput() {

  
  let isOnDeath = isInContact(player, layer[DEATH]);

  if (isOnDeath.any) {
    gameOver(); 
    return; 
  }

  if (player.alive === false) {
    return;
  }

  let touchingGround = isInContact(player, layer[GROUND]);
  player.velocity.y += gravity;
  

  if (keyIsDown(LEFT_ARROW)) {
    player.changeAnimation('walk');
    player.mirrorX(-1);
    player.velocity.x = -2 + treadmillVelocity; 
    steps++;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.changeAnimation('walk');
    player.mirrorX(1);
    player.velocity.x = 2 + treadmillVelocity; 
    steps++;
  } else {
    player.changeAnimation('stand');
    player.velocity.x = treadmillVelocity; 
  }

  playerBrake(player, touchingGround);

  // player jump
  if (keyIsDown(32) && touchingGround.below) {
    player.velocity.y = -5;
    sound2.play(); // jump sound
  }

}

function displaySteps() {
  fill(255);
  noStroke();
  textSize(16);
  textFont(font);
  textAlign(LEFT, TOP);
  text("Steps: " + steps, camera.position.x - width / 2 + 10, camera.position.y - height / 2 + 30);
}

function winScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(32);
  text("Congratulations! You win!", width / 2, height / 2);
  noLoop();

  setTimeout(() => {
    noLoop();
  }, 3000);
}




function die() {
  player.velocity.x = 0;
  player.velocity.y = -10;
  player.rotationSpeed = 20;
}

function gameOver() {
  player.alive = false; 
  mgr.showScene(GameOver); 
}