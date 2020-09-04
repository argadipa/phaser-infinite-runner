import * as Phaser from 'phaser';
import Interactables from './Interactables';
import { ICanKill } from '../Interfaces/interface';

export default class InteractablesBlock extends Interactables implements ICanKill {
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, speed:number, collideEffect:string){
        super(scene, x, y, texture, speed, collideEffect);
    }
    kill(): void {
        // kill
    }

}