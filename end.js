class end extends Phaser.Scene {
    constructor() {
        super({ key: "end"});
    }

    preload(){
        this.load.image('starbackground','assets/starbackground.jpg');
    }
    create(){
        this.add.image(500,500, "starbackground");
        // this.text = this.add.text(500, 300, "End of Game");
        this.title = this.add.text(375,200, "Game Over", { font: "60px Impact", fill: "#ffffff", align: "center" });

        this.playButton = this.add.text(450,700, "Play Again?", { font: "20px Arial", fill: "#ffffff", align: "center" });
        // this.playButton.anchor.setTo(0.5);

        this.playButton.setInteractive({ userHandCursor: true});
        this.playButton.on('pointerdown', function(e) {
            this.scene.restart('main');
            // this.scene.switch('main');
            this.scene.start('main');
        }, this);

        // display score from game
        let mainScene = this.scene.get('main');
        let timeScore = mainScene.getScore();
        if(timeScore >0){
            this.add.text(370,400,'You completed with \n' +timeScore + ' seconds remaining!',{ font: "30px Arial", fill: "#ffffff", align: "center" });
        }
        else {
            this.add.text(300,500,'Sorry, the ship left without you!',{ font: "30px Arial", fill: "#ffffff", align: "center" });
        }

    }
}