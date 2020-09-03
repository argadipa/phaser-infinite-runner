import * as Phaser from "phaser";

export default class InstructionText extends Phaser.GameObjects.Text {
    constructor(scene:Phaser.Scene, text:string){
        const x = 10;
        const y = 50;
        const style = { color: "000000", fontSize: "28px" }
        super(scene, x, y, text, style);
        scene.add.existing(this);
        // do additional rules....
    }
}