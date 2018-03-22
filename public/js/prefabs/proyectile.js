var Deflect = Deflect || {};

Deflect.Proyectile = function(game) {
  var randomPositionX = game.rnd.integerInRange(5,game.width - 5)
  Phaser.Sprite.call(this, game, randomPositionX,5, "proyectile")
  game.physics.arcade.enable(this);
  this.body.bounce.set(1,1);

}

Deflect.Proyectile.prototype = Object.create(Phaser.Sprite.prototype);
Deflect.Proyectile.prototype.constructor = Deflect.Proyectile;

Deflect.Proyectile.prototype.update = function () {

  //kill if off world in the bottom
  if(this.position.y > this.game.world.height || this.position.y <= 0) {
    this.kill();
  }

}

