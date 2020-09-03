import * as Phaser from 'phaser';

export default class Spawner extends Phaser.GameObjects.GameObject{
    private _interactables:Phaser.GameObjects.GameObject[];

    constructor(scene: Phaser.Scene, x:number, y:number, interactables: Phaser.GameObjects.GameObject[]){
        super(scene, 'spawner');
        this.scene.add.existing(this);
        this._interactables ; interactables;
        this._interactables = this.shuffleObjects(this._interactables);
    }

    shuffleObjects(a:Phaser.GameObjects.GameObject[]):Phaser.GameObjects.GameObject[]{
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    spawnInteractable():void{
        this._interactables.forEach((obj) => {
            
        });
    }
}