import State from "./State";

export default class GameOverState extends State{
    constructor(gameScene:Phaser.Scene){
        super(gameScene);
    }

    begin(){
        console.log('Game Over State');
        // TODO: Show game over text
        this.gameScene.character.jump();
        this.gameScene.character.dead();
    }

    restart() {
        this.gameScene.scene.restart();
    }

}