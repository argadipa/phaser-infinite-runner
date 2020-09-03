import * as Phaser from 'phaser';
const JUMP_FORCE:number = 400;

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
        this.setInteractive();
        this.setGravity(0, 400);
        this.debugShowBody = true;
    }

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
        //this.setBodySize(1, 0.5);
        this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
          //    this.setBodySize(1,1, true);
                this._isDucking = false;
                this.walk();
            }
        });
    }

    dead():void {
        console.log('character dead');
        this.play('jump');
        //this.scene.physics.world.removeCollider(this._activeCollider);
    }
}