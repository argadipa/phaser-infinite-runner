import * as Phaser from 'phaser';

export default abstract class Interactables extends Phaser.Physics.Arcade.Image {
    private _speed:number;
    private _collideEffect:string;      // Should use enum in the future

    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, speed:number, collideEffect:string){
        super(scene, x, y, texture);
        this._speed = speed;
        this._collideEffect = collideEffect;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setGravity(0, 400);
        this.body.debugShowBody = true;
        
        scene.events.on('update', this.moveHandler, this);
    }

    moveHandler(time, delta):void{
        this.x -= this._speed;
        if(this.x < -10) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    getCollideEffect():string {
        return this._collideEffect;
    }

    stopMoving(): void {
        this.scene.events.off('update', this.moveHandler, this);
      }

    updateScroll(speed:number): void {
        this._speed = speed;
        this.setX(-this._speed);
    }
}