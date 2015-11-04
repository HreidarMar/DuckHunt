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
};

Shot.prototype = new Entity();

// Initial, inheritable, default values

Shot.prototype.update = function (du) {


    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    this.cx = g_mouseX;
    this.cy = g_mouseY;

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register
    if (this.isColliding()) {

  	}
  	else {
  		spatialManager.register(this);
  	}

};



Shot.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
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
