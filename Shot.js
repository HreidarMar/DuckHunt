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
};

Shot.prototype = new Entity();

// Initial, inheritable, default values

Shot.prototype.update = function (du) {


    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    if(g_Shoot){
    spatialManager.unregister(this);
    }
    this.cx = g_mouseX;
    this.cy = g_mouseY;


    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register
    if(g_Shoot){
    if (this.isColliding()) {
        var theDieingDuck = this.isColliding();
        theDieingDuck._isDeadNow = true;
  	}
  	else {
  		spatialManager.register(this);
  	}
    g_Shoot=false;
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

};
