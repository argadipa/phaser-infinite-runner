import * as Phaser from 'phaser';
import { IGameplayParameter } from '../Interfaces/interface';

const JUMP_FORCE:number = 400;
const bodyHeight:number = 92;
const bodyWidth:number = 92;

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, gameParam:IGameplayParameter, frame?:string){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setInteractive();
        this.setGravity(0, 400);
        this.body.setSize(bodyWidth, bodyHeight);
        this.debugShowBody = true;
        this._gameParam = gameParam;
    }

    private _gameParam:IGameplayParameter;
    private _isJumping: boolean = false;
    private _isDucking: boolean = false;
    private _activeCollider: Phaser.Physics.Arcade.Collider;

    walk(){
        this.play('walk');
    }

    addCollider(coll:Phaser.Physics.Arcade.Collider):void {
        this._activeCollider = coll;
    }

    jump() {
        if(!this.body.touching.down) return;
        if(this._isDucking) return;

        this._isJumping = true;
        this.play('jump');
        this.setVelocityY(-JUMP_FORCE);
        //this.setBodySize(1, 1, true);
        this.scene.time.addEvent({
            delay: 1950,
            callback: () => {
                this._isJumping = false;
                this.walk();
            }
        });
    }

    duck() {
        if(!this.body.touching.down) return;
        if(this._isJumping) return;

        this._isDucking = true;
        this.play('duck');
        this.setBodySize(bodyWidth, bodyHeight / 2);
        this.body.setOffset(0,50);
        this.scene.time.addEvent({
            delay: this._gameParam.characterDuckTime,
            callback: () => {
                this.setBodySize(bodyWidth, bodyHeight);
                this._isDucking = false;
                this.walk();
            }
        });
    }

    dead():void {
        console.log('character dead');
        this.play('jump');
        this.scene.time.addEvent({
            delay: 6000,
            callback: () => {this.destroy();}
        });
    }
}