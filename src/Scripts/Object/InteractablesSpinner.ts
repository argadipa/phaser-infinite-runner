import * as Phaser from 'phaser';
import Interactables from './Interactables';
import { ICanKill, ICanRotate } from '../Interfaces/interface';

export default class InteractablesSpinner extends Interactables implements ICanKill, ICanRotate {
    private _rotationSpeed:number = 1;
    get rotationSpeed():number {
        return this._rotationSpeed;
        this.body.setCircle(90);
    }
    
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, speed:number, rotationSpeed:number, collideEffect:string){
        super(scene, x, y, texture, speed, collideEffect);
        this._rotationSpeed = rotationSpeed;
        this.scene.events.off('update', this.rotateHandler, this);
        this.scene.events.on('update', this.rotateHandler, this);
    }
    rotate(): void {
        // rotate
    }

    rotateHandler(time,delta) {
        this.rotation += this.rotationSpeed;
    }

    kill(): void {
        // kill
    }

    stopMoving(): void{
        super.stopMoving();
    }

}