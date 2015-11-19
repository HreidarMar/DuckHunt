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
    this.spriteFlash = g_sprites.Gunflash;
    this.animateShot = false;

    // Set normal drawing scale, and warp state off
    this._scale = 0.5;
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.imgWidth = 648;
    this.imgHeight = 480;
    this.imgDestWidth = 648;
    this.imgDestHeight = 480;
    this.shotCounter = 5;
};

Gun.prototype = new Entity();


Gun.prototype.update = function (du) {
    this.cx = g_mouseX+85;
    this.cy = 600;
    if(g_isShooting) {
        this.cy += 20;
        if(this.shotCounter < 0) {
            g_isShooting = false;
            this.shotCounter = 5;
        }
        this.animateShot = true;
        this.shotCounter--;
    }
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
    this.sprite.scale = origScale;
    if(this.animateShot){
        
        this.sprite.scale = 0.1;    
        this.spriteFlash.drawWrappedCentredAt(
        ctx, this.cx-80, this.cy-110, this.rotation, this.imgPosX, this.imgPosY, this.imgWidth, this.imgHeight, 60, 60
        );
        this.animateShot = false;
        this.sprite.scale = origScale;
    }
    //this.sprite.drawAt(ctx,x,y);
};
