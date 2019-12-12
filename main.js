class main extends Phaser.Scene {
    constructor() {
        super({key: "main"});
    }
    preload() {
        this.load.image('sky', 'assets/mars.png');
        this.load.image('ground', 'assets/marsplatform.png');
        this.load.image('playerR', 'assets/playerR.png');
        this.load.image('playerL', 'assets/playerL.png');
        this.load.image('ufo', 'assets/ufo.png');
    }
    create() {
        // add the background image to the game
        this.add.image(500, 500, 'sky');

        // apply physics to platforms
        let platforms = this.physics.add.staticGroup();

        // add the platforms to the game:
        // bottom "ground"
        platforms.create(1000, 980, 'ground').setScale(2).refreshBody();
        // floating plaforms
        platforms.create(-20, 725, 'ground');
        platforms.create(1150, 725, 'ground');
        platforms.create(800, 850, 'ground');
        platforms.create(100, 555, 'ground');
        platforms.create(900, 425, 'ground');
        platforms.create(-300, 425, 'ground');
        platforms.create(350, 270, 'ground');
        platforms.create(-150, 120, 'ground');
        platforms.create(1050, 120, 'ground');


        // add physics and assign character image to player
        this.player = this.physics.add.sprite(50, 850, 'playerR');

        // makes player bounce a bit when landing
        this.player.setBounce(0.2);

        // set player collision w/ borders of game
        this.player.setCollideWorldBounds(true);
        // set collision between player and platforms
        this.physics.add.collider(this.player, platforms);

        // add physics and assign ufo image to ufo (same as player)
        var ufo = this.physics.add.sprite(900,50, 'ufo');

        // have ufo bounce when it first drops into game
        ufo.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        // set collision between ufo and platforms
        this.physics.add.collider(ufo, platforms);

        // go to blastOff function when player and ufo objects overlap 
        this.physics.add.overlap(this.player, ufo, this.blastOff, null, this);


        this.cursors = this.input.keyboard.createCursorKeys();

        // timer: 
        this.counter = 30;
        this.playing = true;
        var that = this;
        var timer;
        timer = this.add.text(10,10, 'Time Remaining: 30s', { font: "20px Impact", fill: "#000000", align: "center" });
        
        this.interval = setInterval(function() {
            if(that.playing){
                that.counter--;
                // Display 'counter' wherever you want to display it.
                if (that.counter <= 0) {
                        clearInterval(that.interval);
                        that.blastOff(that.player,ufo);
                    return;
                }else{
                    timer.setText('Time Remaining: ' + that.counter + ' s');
                }
            }
            else {return;}
        }, 1000);

    }
    update(delta) {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-200);
            this.player.setTexture('playerL');
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);
            this.player.setTexture('playerR');
        }
        else
        {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    blastOff(player, ufo)
    {
        clearInterval(this.interval);
        this.playing = false;
        player.disableBody(true, true);
        ufo.setVelocityX(200);
        ufo.setVelocityY(330);
        this.finalTime = this.counter

        this.cameras.main.shake(200);

        var that = this; // having correct 'this' in setTimeout
        setTimeout(function(){
            that.scene.start('end');
        }, 2000);
        //   //js does not have a sleep function, use this to introduce sleep specified by miliseconds.
        // setTimeout(() => {
        //     confirm("test end game");
        //     }, 1000);
    }
    getScore(){     // pass this game's score to the ending scene
        return this.finalTime;

    }
}