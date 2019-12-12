class intro extends Phaser.Scene{
    constructor() {
        super ({key: "intro"});
    }
    
    preload(){
        this.load.image('introscene','assets/intromars.png');
    }
    
    create(){
        this.background = this.add.image(500,500, 'introscene');
        this.title = this.add.text(300,300, "Speed Platformer", { font: "60px Impact", fill: "#ffffff", align: "center" });
        
        // Phaser.Display.Align.In.Center(this.title,this.background);

        this.playButton = this.add.text(410,490, "Start Game", { font: "40px Impact", fill: "#ffffff", align: "center" });
        // this.playButton.anchor.setTo(0.5);
        this.playButton.setInteractive({ userHandCursor: true});
        
        this.playButton.on('pointerdown', function(e) {
            this.scene.start('main');
        }, this);

        var tween = this.tweens.add({
            targets: this.title,
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Linear',
            duration: 1000,
            yoyo: true,
            repeat: 0,
        },this);

    }
}