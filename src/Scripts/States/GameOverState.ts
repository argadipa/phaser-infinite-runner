import State from "./State";
import Interactables from '../Object/Interactables';

export default class GameOverState extends State{
    constructor(gameScene:Phaser.Scene){
        super(gameScene);
    }

    begin(){
        // TODO: Show game over text
        console.log(this.gameScene.interactables);

        this.gameScene.interactables.map((i: Interactables) => {
            i.stopMoving();
            i.disableBody();
        });
        this.gameScene.character.jump();
        this.gameScene.character.dead();
        this.gameScene.physics.world.removeCollider(this.gameScene.platformCollider);
        this.gameScene.physics.world.removeCollider(this.gameScene.interactablesCollider);
        this.gameScene.scoreGiver.stopScoreGeneration();
        
        this.gameScene.add.text(400, 300, 'Game Over\nPress R to Restart', { color: '#000000', align: 'center', fontSize: '48px' } );
        this.gameScene.fpsText.removeUpdateEvent();
    }

    restart() {
        this.gameScene.scene.restart();
    }

}