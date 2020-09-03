import * as Phaser from "phaser";

export default class ScoreText extends Phaser.GameObjects.Text {

    constructor(scene:Phaser.Scene, text:string){
        const x = (scene.cameras.main.width / 2);
        const y = 50;
        const style = { color: "000000", fontSize: "60px", align: 'center' }
        super(scene, x, y, text, style);
        scene.add.existing(this);
        
        // do additional rules....       
    }

    updateScore(value:number):void {
        this.text = `${value}`;
    }

    show():void {
        this.setVisible(true);
    }

    hide():void {
        this.setVisible(false);
    }
}