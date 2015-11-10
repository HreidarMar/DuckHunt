// ==========
// Shot STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Shot(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Shot;

    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this.sprite.imgPosX = 0;
    this.sprite.imgPosY = 0;
    this.sprite.imgWidth = 400;
    this.sprite.imgHeight = 400;
    this.sprite.imgDestWidth = 60;
    this.sprite.imgDestHeight = 60;

    this.ammo = 15;
    this.buffer = 0;
};

Shot.prototype = new Entity();

// Initial, inheritable, default values
Shot.prototype.ShotsFired= new Audio(
  "sounds/ShotsFired.wav");

  Shot.prototype.Reload= new Audio(
    "sounds/ReloadMotherfucker.mp3");


Shot.prototype.update = function (du) {

    this.buffer=this.buffer-du;

    this.cx = g_mouseX;
    this.cy = g_mouseY;


    if(g_Shoot && this.ammo>0){
    g_Shoot=false;
    spatialManager.register(this);
    if(this.buffer<0){
    this.buffer=70*du;

    this.ammo = this.ammo-1;
    var ShotOrDuck = this.isColliding();
    console.log(ShotOrDuck);

    if (ShotOrDuck instanceof Duck) {
        ShotOrDuck.takeBulletHit();
  	}


    this.ShotsFired.play();

  }
  spatialManager.unregister(this);

}
};


Shot.prototype.getRadius = function () {
    return 5;
};


Shot.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
    ctx.font="20px Georgia";
    ctx.fillText("You have " +this.ammo+ " shots left",50,50);
    if(this.buffer>0 && this.ammo!==0){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("RELOADING MOTHERFUCKER",50,80);
      ctx.restore();

    }
    if(this.ammo===0){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("OUT OF AMMO",50,80);
      ctx.restore();

    }

};
