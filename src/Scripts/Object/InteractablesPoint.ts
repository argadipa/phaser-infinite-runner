import * as Phaser from 'phaser';
import Interactables from './Interactables';
import { ICanAddScore } from '../Interfaces/interface';

export default class InteractablesPoint extends Interactables implements ICanAddScore {
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, speed:number, collideEffect:string){
        super(scene, x, y, texture, speed, collideEffect);
    }
    addScore(score: number): void {
        // 
    }

    

}