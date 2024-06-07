let systems;
let recMode = false;
let can;  
let gcounter = 0;

function setup() {
  can=createCanvas(1920, 1080); 
  systems = [];
  
 
  let numLYParticles = 1;
  let p = new LYParticleSystem(createVector(width/2, height/2)); 
  for (let i = 0; i < numLYParticles; i++) {
    p.addLYParticle();
  }
  systems.push(p);

  console.log(frameCount);

  // frameRate(10)
}

function draw() {
  background(0, 10); 
  for (let i = 0; i < systems.length; i++) {
    systems[i].run();
    systems[i].addLYParticle();
  }
  
  // FRAMECOUNTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT (Phases)
  if (frameCount < 300) {
    // Phase 1
    console.log("Phase 1");
   
  } else if (frameCount < 550) {
    // Phase 2
    console.log("Phase 2");
    
    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles(); // particles modified
    }
  } else if (frameCount < 850) {
    // Phase 3
    console.log("Phase 3");

    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles2(); // particles modified2
    }
  } else if (frameCount < 1200) {
    // Phase 3
    console.log("Phase 4");

    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles3(); // particles modified3
    }

  } else if (frameCount < 1450) {
    // Phase 3
    console.log("Phase 5");

    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles4(); // particles modified4
    }

  } else if (frameCount < 1700) {
    // Phase 3
    console.log("Phase 6");

    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles5(); // particles modified5
    }
  } else if (frameCount < 1900) {
    // Phase 3
    console.log("Phase 7");

    for (let i = 0; i < systems.length; i++) {
      systems[i].modifyParticles6(); // particles modified6
    }
    
  }

 //recording tool
  if (recMode) {
    recordit();
  }
}

let LYParticle = function(position) {
  this.acceleration = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.size = random(10, 10);
  this.color = color(random(255), random(255), random(255));
  this.lifespan = 255.0;
};

LYParticle.prototype.run = function() {
  this.update();
  this.display();
};

LYParticle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= -1;
};

LYParticle.prototype.display = function() {
  stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
  strokeWeight(2);
  noFill();
  ellipse(this.position.x, this.position.y, this.size, this.size);
};

LYParticle.prototype.Dead = function() {
  return this.lifespan < 0;
};

let LYParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

LYParticleSystem.prototype.addLYParticle = function() {
  let p = new LYParticle(this.origin);
  this.particles.push(p);
};

LYParticleSystem.prototype.run = function() {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.Dead()) {
      this.particles.splice(i, 1);
    }
  }
};


//TESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

// TEST: of modifying particles in the particle system   // the scattered rainbow circles
LYParticleSystem.prototype.modifyParticles = function() {
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-1, 1); // Change size r
    p.color = color(random(255), random(255), random(255)); // Change color r
    p.position = createVector(random(width), random(height));

  }
};

LYParticleSystem.prototype.modifyParticles2 = function() { // red/blue scattered ones
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-5, 5); // Change size r
    p.color = color(random(255), random(0), random(255)); // Change color r
    p.position = createVector(random(width), random(height));

  }
};


LYParticleSystem.prototype.modifyParticles3 = function() { // red flow
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-1, 1); // Change size r (8)
    p.color = color(random(255), random(0), random(0)); // Change color r
    p.acceleration = createVector(random(-2, 2), random(-0.01, 0.01));
    
    
    
  }
};

LYParticleSystem.prototype.modifyParticles4 = function() {  // blue flow
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-4, 4); // Change size r
    p.color = color(random(0), random(0), random(255)); // Change color r
    p.acceleration = createVector(random(-2, 2), random(2, -2));
  }
};

LYParticleSystem.prototype.modifyParticles5 = function() { // r scattered
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-8, 8); // Change size r
    p.color = color(random(255), random(255), random(255)); // Change color r
    
  }
};

LYParticleSystem.prototype.modifyParticles6 = function() {   // Black/white flow
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    // TEST: modifying particle properties
    p.size += random(-2, 2); // Change size r
    p.color = color(random(255)); // Change color r
    
  }
};

//RECORDING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function keyPressed() {
  if (keyIsPressed === true) {
    let k = key;
    console.log("k is " + k);

    if (k == 's' || k == 'S') {
      console.log("Stopped Recording");
      recMode = false;
    }

    if (k == 'r') {
      console.log("Start Recording");
      recMode = true;
    }
  }
}

function recordit() {  // new version
  let ext = nf(frameCount, 4);
  saveCanvas(can, 'frame-' + ext, 'jpg');
  console.log("rec " + ext);
}