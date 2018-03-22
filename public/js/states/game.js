var Deflect = Deflect || {};


Deflect.GameState = {
  XDown:null,
  YDown:null,
  XUp:null,
  YUp:null,
  maxLines:2,
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //Activamos la fisica en el juego
    this.game.physics.startSystem(Phaser.Physics.P2);
    this.game.physics.arcade.gravity.y = 100;


  },
  preload: function() {
    //Cargamos imagenes
    this.load.image('background', 'assets/images/background.png');
    this.load.image('line', 'assets/images/line.png');
    this.load.image("proyectile", "assets/images/proyectile.png")

  },
  create: function() {
   //Captura el input del mouse
   this.input.mouse.capture = true;
   this.background = this.game.add.sprite(0, 0, 'background');
   //Activa input en el Bg
   this.background.inputEnabled = true;

   //EVENTOS
   //Input Down
   this.background.events.onInputDown.add(this.getXYDown.bind(this));
   //Input Up
   this.background.events.onInputUp.add(this.getXYUp.bind(this));

   //GRUPOS
   this.lines = this.add.group();
   this.proyectiles = this.add.group();

   this.lines.pixelPerfectOver = true;

   setInterval(this.fireProyectiles.bind(this), 2000);

  },
  update: function() {
    this.game.physics.arcade.collide(this.lines, this.proyectiles, function(){console.log()})
    this.getXYNow();


    /*var line = new Phaser.Line(this.XDown, this.YDown, this.XNow, this.YNow);
    var myLine = this.game.add.sprite(this.XDown,this.YDown, "line")
    myLine.scale.setTo(line.length, 3);
    myLine.angle = line.angle * (180/Math.PI);*/
    
  },
  fireProyectiles:function () {

    var proyectile = this.proyectiles.getFirstExists(false)
    if (!proyectile) {
      proyectile = new Deflect.Proyectile(this.game);
      this.proyectiles.add(proyectile)
    }
    else{

      proyectile.reset(this.game.rnd.integerInRange(5,this.game.width - 5), 5)
    }
  },
  getXYDown: function () {
    this.XDown = this.input.x
    this.YDown = this.input.y
  },
  getXYUp:function () {
    this.XUp = this.input.x
    this.YUp = this.input.y
    
    //Dibujar una linea
    var line = this.lines.getFirstExists(false)
    if (!line) {
      line = new Deflect.Line(this.game, this.XDown, this.YDown, this.XUp, this.YUp, 60);
      this.lines.add(line)

    }
    else{
      line.reset(this.XDown, this.YDown)
      line.draw(this.XDown, this.YDown, this.XUp, this.YUp, 60)
      console.log('draw')
    }
    //---------------------------------------------

  },

  getXYNow:function () {
    this.XNow = this.input.mousePointer.x
    this.YNow = this.input.mousePointer.y
    },

   render: function() {


    this.lines.forEachAlive(
      function(line)
        {
        this.game.debug.body(line);
        }, this
    );


  }
};
