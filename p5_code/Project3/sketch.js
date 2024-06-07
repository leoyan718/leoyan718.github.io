let bgc;
let shc;
let yPos1 = 0.0; // 1st wave
let yPos2 = 0.0; // 2nd wave
let HourAngle = 0;
let MinuteAngle = 0;
let SecondAngle = 0;
let font;
let outerSunAlpha = 255; 
let pulseSpeed = 500;
let img;
let img2;
let gif1;
let gif2; 
let gif3;
let gif4;
let gif1X = 500; // Initial x-position of the GIF
let gif1Speed = 1.5; // Speed of oscillation
let gif1XDirection = 1; // Initialize the direction of motion of the GIF
let img2Y = 250; 
let movePerHour = 20; 
let showTimeText = false;

function preload() {
  font = loadFont('assets/one piece font.ttf');
  img = loadImage('assets/test boat.png');
  img2 = loadImage('assets/flag.png');
}

function setup() {
  createCanvas(1000, 1200);
  background(200);
  fill(255, 100, 0);
  angleMode(DEGREES);
  textFont(font);
  bgc = color(150, 231, 255);
  shc = color(0);
  gif1 = createImg('assets/mluffy.gif');
  gif2 = createImg('assets/sleep.gif');
  gif3 = createImg('assets/zzz.gif');
  gif4 = createImg('assets/lunch.gif');
  gif1.position(500, 600);
  gif1.size(120, 200);
  gif2.position(350, 550);
  gif2.size(200, 200);
  gif3.position(450, 550);
  gif3.size(100, 100);
  gif4.position(675, 600);
  gif4.size(200, 200);


  
  
  
}

function draw() {
  background(bgc);
  let h = hour();   // 0-23
  let m = minute(); // 0- 59
  let s = second(); // 0-59

  let newYPosition = img2Y - h * movePerHour;

// GIF DAYTIME ONLY
if (h >= 7 && h <= 23) {
  gif1.show();
} else {
  gif1.hide();
}

// HIDE GIF1 12 TO 14
if ((h >= 12 && h < 15) || (h >= 0 && h < 7)) {
  gif1.hide();
} else {
  gif1.show();
}



  if (h >= 12 && h <= 14) {
    gif4.show();
  } else {
    gif4.hide();
  }



//GIF NIGHTIME ONLY
  if (h >= 0 && h <= 6) {
    gif2.show();
  } else {
    gif2.hide();
  }

  if (h >= 0 && h <= 6) {
    gif3.show();
  } else {
    gif3.hide();
  }



//sun
  let pulse = sin(frameCount * 1) * 100;

  outerSunAlpha = 255 - pulse;


  //USED CHATGPT TO HELP ME FLIP GIF

 // Calculate the x-position of the GIF based on the frame count and speed
 let offset1X = sin(frameCount * gif1Speed) * 400; // Adjust the 50 to control the amplitude of motion
 let newGif1X = gif1X + offset1X;
 

 // Ensure the GIF stays within the canvas bounds
 newGif1X = constrain(newGif1X, 0, width - gif1.width);

 // Check if the GIF has reached the left or right edge of the canvas
 if ((newGif1X <= 100 && gif1XDirection === -1) || (newGif1X >= width - gif1.width - 100 && gif1XDirection === 1)) {
  // Reverse the direction of motion by updating the direction variable
  gif1XDirection *= -1;

  // If it has reached the edge, adjust the x-position to prevent it from getting stuck
  newGif1X = constrain(newGif1X, 0, width - gif1.width);
}
 // Flip the GIF based on the direction of motion
 if (gif1XDirection === 1) {
   gif1.style("transform", "scaleX(1)");
 } else {
   gif1.style("transform", "scaleX(-1)");
 }

 // Update the position of the GIF
 gif1.position(newGif1X, 600);

  


 

  // First waveeeee
  fill(0, 129, 228);
  beginShape();
  let xPos1 = 0; 

  for (let x = 0; x <= width; x += 10) {
    let y1 = map(noise(xPos1, yPos1), 0, 1, 250, 100);
    vertex(x, y1);
    xPos1 += 0.05;
  }
  yPos1 += 0.0175;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Second waveeeeee
  fill(0, 150, 240); 
  beginShape();
  let xPos2 = 0;

  for (let x = 0; x <= width; x += 10) {
    let y2 = map(noise(xPos2, yPos2), 0, 1, 500, 300); 
    vertex(x, y2);
    xPos2 += 0.1; 
  }
  yPos2 += 0.02; // SPEEDD
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  
  
image(img, 0, 0);  //placeholder for boat





//boat

fill(175, 131, 92)
rect(200, 700, 600, 600, 20)


  //Wheel stand

  noStroke()
  fill(130,80,50)
  rect(350, 800, 300, 150, 14)

  fill(130,80,50)
  rect(300, 850, 400, 150, 14)






  // CLOCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
  fill(0);

  if (h > 16 || h < 7) {
    // sunset and sunrise
    // nightime
    fill(250);
    ellipse(100, 100, 100, 100); //moon
    bgc = color(20, 20, 255);
    shc = color(250);
    // sundown
  } else {
    // DAYTIME
    noStroke();
    fill(254, 255, 199, outerSunAlpha);
    ellipse(150, 50, 350, 325); //sun outer sun
    fill(252, 255, 131, 500);
    ellipse(150, 50, 275, 275); //sun inner
  
  
  }

  if (h >= 0 && h <= 6) {
    textSize(50);
    fill(255, 0, 0);
    text("SLEEPY TIME", 150, 50);
  }

  if (h >= 7 && h <= 9) {
    textSize(50);
    fill(255, 0, 0);
    text("WAKE UP", 50, 50);
  }

  if (h >= 20 && h <= 23) {
    textSize(50);
    fill(255, 0, 0);
    text("GAMING TIME", 150, 50);
  }

  if (h >= 12 && h <= 14) {
    if (m > 0 && m < 59) {
      textSize(50);
      fill(255, 0, 0);
      text("LUNCH BREAK", 50, 50);
    }
  }

  let mh = map(h, 0, 23, 0, 360);
  let mm = map(m, 0, 59, 0, 360);
  let ms = map(s, 0, 59, 0, 360);


// HOURRRRRRRRRRRRRRR 
push();
translate(width / 2.1, height / 19);
rotate(0);

pop(); 

push();

image(img2, 500, newYPosition, 300, 350);  //placeholder for boat

pop(); 

if (showTimeText) {
  push();
  textSize(60); 
  fill(255);
  textAlign(CENTER, CENTER); 
  text(h, 490, 450); // TEXT FOR HOUR
  pop();
}


// MINUTEEEE
push();
translate(485,600);
rotate(0);
let numRectangles = m % 60; //59 minutes
let rectWidth = 10;
let rectHeight = 7;
let spacing = 5;

for (let i = 0; i < numRectangles; i++) { // numRectangles == how many rectangles that are drawn
  let xPos = i * (rectWidth + spacing) - ((numRectangles - 1) * (rectWidth + spacing)) / 2;
  stroke(0);
  fill(222, 191, 59);
  rect(xPos, 0, rectWidth, rectHeight, 5); 
}
pop(); 

if (showTimeText) {
  push();
  textSize(45); 
  fill(255);
  textAlign(CENTER, CENTER); 
  text(m, 495, 635); // TEXT for MINUTE
  pop();
}

// SECONDDDDDD HAND MAIN
push();
translate(width / 2, height /1.5);


rotate(ms - 90);

noFill()
stroke(0)
strokeWeight(20)
ellipse(0, 0, 200, 200);

fill(100,0,0);
noStroke()
rect(0, -5, 150, 15, 5);
pop(); 


//second hand 2
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 150);
rect(0, 0, 150, 15, 5);
pop(); 

//second hand 3
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 210);
rect(0, 0, 150, 15, 5);
pop(); 

//second hand 4
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 270);
rect(-15, -10, 150, 15, 5);
pop();

//second hand 5
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 30);
rect(-15, -15, 160, 15, 5);
pop();

//second hand 6
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 330);
rect(-15, -15, 150, 15, 5);
pop();

//Middle of wheel circle
push();
fill(0)
translate(width / 2, height /1.5);

rotate(ms - 90);
ellipse(5, 2, 50, 50, 5);
pop();



//TEXT for caption

fill(shc); 
textSize(30); 
text('Press "H" to reveal secrets' , 375, 1100); 

}

function keyPressed() {
  if (key === 'h' || key === 'H') {
    showTimeText = !showTimeText; 
  }
}
