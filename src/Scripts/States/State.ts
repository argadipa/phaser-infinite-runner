import GameScene from "../Scene/GameScene";

export default abstract class State {
    
    protected gameScene: GameScene;
    
    constructor(gameScene){
        this.gameScene = gameScene;
    }

    begin():void{}

    jump():void{}

    duck():void{}

    restart():void{}
}