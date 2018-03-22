var Deflect = Deflect || {};

Deflect.Line = function(game, XDown, YDown, XUp, YUp, health) {
  var line = new Phaser.Line(XDown, YDown, XUp, YUp);
  Phaser.Sprite.call(this, game, XDown,YDown, "line")
  this.scale.setTo(line.length, 3);
  this.angle = line.angle * (180/Math.PI);
  game.physics.arcade.enable(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.health = health
}

Deflect.Line.prototype = Object.create(Phaser.Sprite.prototype);
Deflect.Line.prototype.constructor = Deflect.Line;

Deflect.Line.prototype.update = function () {
	this.health -= 1;
  	if(this.health <= 0) {
    this.kill()
  }
}

Deflect.Line.prototype.draw = function (XDown, YDown, XUp, YUp, health) {
  var line = new Phaser.Line(XDown, YDown, XUp, YUp);
  this.scale.setTo(line.length, 3);
  this.angle = line.angle * (180/Math.PI);
  this.health = health
}


