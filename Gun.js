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
    this.sprite = g_sprites.Gun;

    // Set normal drawing scale, and warp state off
    this._scale = 0.5;
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.imgWidth = 648;
    this.imgHeight = 480;
    this.imgDestWidth = 648;
    this.imgDestHeight = 480;
};

Gun.prototype = new Entity();







Gun.prototype.update = function (du) {

  if(g_PISTOL) this.sprite = g_sprites.Gun;
  else this.sprite = g_sprites.Gun2;

  if(g_PISTOL) this.cx = g_mouseX+90;
  else this.cx = g_mouseX+100;
  this.cy = 600;
  /*  if(g_mouseY < g_canvas.height/2) {
        if(g_mouseX < g_canvas.width/3) {
            this.rotation = 6.3;
            this._scale = 0.8;
        }
        else if(g_mouseX >= g_canvas.width/3 && g_mouseX < 2*g_canvas.width/3) {
            this.rotation = 6.6;
            this._scale = 0.8;
        }
        else {
            this._scale = -0.8;
        }
    }
    else {
        if(g_mouseX < g_canvas.width/3) {
            this.rotation = 6.3;
            this._scale = 0.8;
        }
        else if(g_mouseX >= g_canvas.width/3 && g_mouseX < 2*g_canvas.width/3) {
            this.rotation = 6.6;
            this._scale = 0.8;
        }
        else {
            this._scale = -0.8;
        }
    }*/
};

Gun.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation, this.imgPosX, this.imgPosY, this.imgWidth, this.imgHeight, this.imgDestWidth, this.imgDestHeight
    );
    //this.sprite.drawAt(ctx,x,y);
    this.sprite.scale = origScale;
};
