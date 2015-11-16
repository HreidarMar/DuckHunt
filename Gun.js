// ==========
// Gun STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Gun(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Gun;

    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.imgWidth = 400;
    this.imgHeight = 400;
    this.imgDestWidth = 60;
    this.imgDestHeight = 60;

};

Gun.prototype = new Entity();


Gun.prototype.update = function (du) {

    this.cx = g_mouseX;
    this.cy = g_mouseY;



};

Gun.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0, this.imgPosX, this.imgPosY, this.imgWidth, this.imgHeight, this.imgDestWidth, this.imgDestHeight
    );
    this.sprite.scale = origScale;
};
