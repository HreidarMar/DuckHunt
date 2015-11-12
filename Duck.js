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

    this.randomisePosition();
    this.randomiseVelocity();
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Duck;
    this.scale  = this.scale  || 1;

    this.cy = g_canvas.height - 30;

    this.imgPosX = 0;
    this.imgPosY = 120;
    this.imgWidth = 40;
    this.imgHeight = 35;
    this.imgDestWidth = this.imgWidth;
    this.imgDestHeight = this.imgHeight;
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

Duck.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 150,
        MAX_SPEED = 250;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = this.velX || speed * Math.cos(dirn);
    this.velY = -Math.abs(this.velY || speed * Math.sin(dirn));

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
    if(this.velX > 0) {
      this.scale = 1;
      if(entityManager.updateDuckPose()){
          if(this.imgPosX === 80) {
              this.imgPosX = 0;
          }
          else {
              this.imgPosX += 40;
          }
      }
  }
  if(this.velX < 0) {
      this.scale = -1;
      if(entityManager.updateDuckPose()){
          if(this.imgPosX === 80) {
              this.imgPosX = 0;
          }
          else {
              this.imgPosX += 40;
          }
      }
  }



  this.outOfBondsLittleDuckie();

  // TODO: YOUR STUFF HERE! --- (Re-)Register
  spatialManager.register(this);

};

Duck.prototype.getRadius = function () {
    return 10;
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
    this.kill();
//Use this later on
  /*  if (this.scale > 0.25) {
        this._spawnFragment();
        this._spawnFragment();

        this.splitSound.play();
    } else {
        this.evaporateSound.play();
    }*/
};

Duck.prototype._spawnFragment = function () {
    entityManager.generateDuck({
        cx : this.cx,
        cy : this.cy,
        //scale : this.scale /2
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
