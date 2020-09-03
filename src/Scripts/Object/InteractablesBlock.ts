import * as Phaser from 'phaser';
import Interactables from './Interactables';

export default class InteractablesBlock extends Interactables {
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, speed:number, collideEffect:string){
        super(scene, x, y, texture, speed, collideEffect);
    }

}