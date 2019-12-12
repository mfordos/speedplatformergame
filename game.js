// Configuration for setting up the "game"
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height:  1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;
var player;
var ufo;
var cursors;
var gameTimer = 60;

var game = new Phaser.Game(config);

// preload function is where you load images or sprites
function preload ()
{
    this.load.image('sky', 'assets/mars.png');
    this.load.image('ground', 'assets/marsplatform.png');
    this.load.image('playerR', 'assets/playerR.png');
    this.load.image('playerL', 'assets/playerL.png');
    this.load.image('ufo', 'assets/ufo.png');
}

// create function is where you add physics, place things within game, and set up interactions between objects 
function create ()
{
    // add the background image to the game
    this.add.image(500, 500, 'sky');

    // apply physics to platforms
    platforms = this.physics.add.staticGroup();

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
    player = this.physics.add.sprite(50, 850, 'playerR');

    // makes player bounce a bit when landing
    player.setBounce(0.2);

    // set player collision w/ borders of game
    player.setCollideWorldBounds(true);
    // set collision between player and platforms
    this.physics.add.collider(player, platforms);

    // add physics and assign ufo image to ufo (same as player)
    ufo = this.physics.add.sprite(900,50 , 'ufo');

    // have ufo bounce when it first drops into game
    ufo.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    // set collision between ufo and platforms
    this.physics.add.collider(ufo, platforms);

    // go to blastOff function when player and ufo objects overlap 
    this.physics.add.overlap(player, ufo, blastOff, null, this);

    
    // count down timer (still in progress, but below is the general idea) 
   
    var count = 60, timer = setInterval(function() {
        $("#counter").html(count--);
        if(count == 1) clearInterval(timer);
    }, 1000);
   




    
    text = this.add.text(10,10, 'Time Remaining: ' + count, { font: "20px Arial", fill: "#000000", align: "center" });
    // this.time.events.loop(Phaser.Timer.SECOND, decrementTimer, this);

    // function decrementTimer() {
    //     if (gameTimer !== 0){
    //         gameTimer--;
    //         text.setText('Counter: ' + gameTimer);
    //     }
    //     else {
    //         // gameover. Next scene
    //     }
    // }


    var counter = 60;
var interval = setInterval(function() {
    counter--;
    // Display 'counter' wherever you want to display it.
    if (counter <= 0) {
     		clearInterval(interval);
      	$('#timer').html("<h3>Count down complete</h3>");  
        return;
    }else{
    	$('#time').text(counter);
      console.log("Timer --> " + counter);
    }
}, 1000);

    cursors = this.input.keyboard.createCursorKeys();

}

// update function is pretty self explanatory 
function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.setTexture('playerL');
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.setTexture('playerR');
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function blastOff (player, ufo)
{
    player.disableBody(true, true);
    ufo.setVelocityX(200);
    ufo.setVelocityY(330);
    //js does not have a sleep function, use this to introduce sleep specified by miliseconds.
    setTimeout(() => {
    confirm("test end game");
    }, 1000);
    
}


