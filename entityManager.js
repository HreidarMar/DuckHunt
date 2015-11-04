/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_Ducks   : [],
_bullets : [],
_Guns   : [],

_bShowDucks : true,

// "PRIVATE" METHODS

_generateDucks : function() {
    var i,
        NUM_DuckS = 4;

    for (i = 0; i < NUM_DuckS; ++i) {
        this.generateDuck();
    }
},

_findNearestGun : function(posX, posY) {
    var closestGun = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._Guns.length; ++i) {

        var thisGun = this._Guns[i];
        var GunPos = thisGun.getPos();
        var distSq = util.wrappedDistSq(
            GunPos.posX, GunPos.posY,
            posX, posY,
            g_canvas.width, g_canvas.height);

        if (distSq < closestSq) {
            closestGun = thisGun;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theGun : closestGun,
        theIndex: closestIndex
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._Ducks, this._bullets, this._Guns];
},

init: function() {
    this._generateDucks();
    //this._generateGun();
},

fireBullet: function(cx, cy, velX, velY, rotation) {
    this._bullets.push(new Bullet({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,

        rotation : rotation
    }));
},

generateDuck : function(descr) {
    this._Ducks.push(new Duck(descr));
},

generateGun : function(descr) {
    this._Guns.push(new Gun(descr));
},

killNearestGun : function(xPos, yPos) {
    var theGun = this._findNearestGun(xPos, yPos).theGun;
    if (theGun) {
        theGun.kill();
    }
},

yoinkNearestGun : function(xPos, yPos) {
    var theGun = this._findNearestGun(xPos, yPos).theGun;
    if (theGun) {
        theGun.setPos(xPos, yPos);
    }
},

resetGuns: function() {
    this._forEachOf(this._Guns, Gun.prototype.reset);
},

haltGuns: function() {
    this._forEachOf(this._Guns, Gun.prototype.halt);
},

toggleDucks: function() {
    this._bShowDucks = !this._bShowDucks;
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

    if (this._Ducks.length === 0) this._generateDucks();

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowDucks &&
            aCategory == this._Ducks)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();