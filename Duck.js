// ====
// Duck
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Duck(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.negOrPosVelX = Math.floor(util.randRange(0, 2));

    this.randomisePosition();
    this.randomiseUpFlight();
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Duck;
    this.scale  = this.scale  || 1;

    this.cy = g_canvas.height - 30;

    this.flightUpCounter = util.randRange(30, 50);

    this.isDead = false;
    //this.imgPosX = 0;
    //this.imgPosY = 190;
    this.imgWidth = 40;
    this.imgHeight = 35;
    this.imgDestWidth = this.imgWidth;
    this.imgDestHeight = this.imgHeight;

    this.deathAnimationCounter = 7;
    
    this.randomiseColor();
/*
    // Diagnostics to check inheritance stuff
    this._DuckProperty = true;
    console.dir(this);
*/

};

Duck.prototype = new Entity();

Duck.prototype.randomisePosition = function () {
    // Duck randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
    this.rotation = this.rotation || 0;
};

Duck.prototype.randomiseColor = function () {
    // Duck randomisation defaults (if nothing otherwise specified)
    var oneTwoOrThree = Math.floor(util.randRange(1, 4));
    switch(oneTwoOrThree) {
      case 1:
        this.imgPosX = 0;
        this.colorXVal = 0;
        break;
      case 2:
        this.imgPosX = 130;
        this.colorXVal = 130;
        break;
      case 3:
        this.imgPosX = 255;
        this.colorXVal = 255; 
        break;
    }
    
};


Duck.prototype.randomiseUpFlight = function () {
    
    this.velY = -util.randRange(1,5);
    this.velX = 0;
    entityManager.setPoseSpeed(Math.abs(Math.floor(10/this.velY)));
    /*var MIN_SPEED = 150,
        MAX_SPEED = 250;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = this.velX || speed * Math.cos(dirn);
    this.velY = -Math.abs(this.velY || speed * Math.sin(dirn));
*/
};

Duck.prototype.randomiseVelocity = function () {
    
    if(this.negOrPosVelX) {
      this.velX = util.randRange(1,5);
      this.velY = -util.randRange(1,5);
    }
    else {
      this.velX = -util.randRange(1,5);
      this.velY = -util.randRange(1,5);
    }
    entityManager.setPoseSpeed(Math.abs(Math.floor(20/(Math.abs(this.velX)+Math.abs(this.velY)))));
    /*var MIN_SPEED = 150
        MAX_SPEED = 250;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = this.velX || speed * Math.cos(dirn);
    this.velY = -Math.abs(this.velY || speed * Math.sin(dirn));
*/
};

Duck.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Duck.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

  	if (this._isDeadNow) {

      this.takeBulletHit;
      return entityManager.KILL_ME_NOW;
  	}

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    if(this.isDead) {
      if(this.deathAnimationCounter === 7) {
        this.produceSplatter();
      }
      if(this.deathAnimationCounter > 0) {
        this.velX = -1;
        this.velY = -1;
        this.imgPosY = 230;
        this.deathAnimationCounter--;
        this.imgPosX = this.colorXVal;
      }
      else if(this.deathAnimationCounter <= 0){
        this.velY += 0.1;
        this.imgPosX = this.colorXVal + 40;
      }
    }
    else{
      if(Math.abs(this.velX) > Math.abs(this.velY)){
        if(this.velX > 0) {
          this.scale = 1;
          this.imgPosY = 120;
          if(entityManager.updateDuckPose()){
            if(this.imgPosX === 80 || this.imgPosX === 210 || this.imgPosX === 335) {
              this.imgPosX -= 80;
            }
            else {
              this.imgPosX += 40;
            }
          }
        }
        if(this.velX <= 0) {
            this.scale = -1;
            this.imgPosY = 120;
            if(entityManager.updateDuckPose()){
                if(this.imgPosX === 80 || this.imgPosX === 210 || this.imgPosX === 335) {
                    this.imgPosX -= 80;
                }
                else {
                    this.imgPosX += 40;
                }
            }
        }
      }
      else if(this.velX === 0){
          this.scale = 1;
          this.imgPosY = 190;
          if(entityManager.updateDuckPose()){
              if(this.imgPosX === 80 || this.imgPosX === 210 || this.imgPosX === 335) {
                  this.imgPosX -= 80;
              }
              else {
                  this.imgPosX += 40;
              }
          }
      }
      else if(Math.abs(this.velX) <= Math.abs(this.velY)){
        if(this.velX > 0) {
          this.scale = 1;
          this.imgPosY = 155;
          if(entityManager.updateDuckPose()){
            if(this.imgPosX === 80 || this.imgPosX === 210 || this.imgPosX === 335) {
              this.imgPosX -= 80;
            }
            else {
              this.imgPosX += 40;
            }
          }
        }
        if(this.velX <= 0) {
            this.scale = -1;
            this.imgPosY = 155;
            if(entityManager.updateDuckPose()){
                if(this.imgPosX === 80 || this.imgPosX === 210 || this.imgPosX === 335) {
                    this.imgPosX -= 80;
                }
                else {
                    this.imgPosX += 40;
                }
            }
        }
      }
  }

  if(this.flightUpCounter < 0) {
    this.randomiseVelocity();
    this.flightUpCounter = util.randRange(10, 30);
  }

  this.flightUpCounter--;

  this.outOfBondsLittleDuckie();

  // TODO: YOUR STUFF HERE! --- (Re-)Register
  spatialManager.register(this);

};

Duck.prototype.getRadius = function () {
    return 10;
};

Duck.prototype.produceSplatter = function () {
    for(var i = 0; i < 40; i++) {
      g_ctx.fillStyle = "#FF0000";
      util.fillCircle(g_ctx, this.cx+util.randRange(-20, 20), this.cy+util.randRange(-20, 20), util.randRange(0, 3));
      g_ctx.restore();
    }
};
/*
// HACKED-IN AUDIO (no preloading)
Will use this later on
Duck.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Duck.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");
*/
Duck.prototype.takeBulletHit = function () {
  this.velY = 3;
  this.velX = 0;
  this.flightUpCounter = 1000000000;
  this.isDead = true;
};

Duck.prototype._spawnFragment = function () {
    entityManager.generateDuck({
        cx : this.cx,
        cy : this.cy,
        imgPosY : this.imgPosY,
        imgPosX : this.imgPosX,
        imgWidth : 10,
        imgHeight : 10,
        velY : 2,
        velX : 0
    });
};

Duck.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation, this.imgPosX, this.imgPosY, this.imgWidth, this.imgHeight, this.imgDestWidth, this.imgDestHeight
    );
};
