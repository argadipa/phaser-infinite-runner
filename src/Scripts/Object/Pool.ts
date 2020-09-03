import * as Phaser from "phaser";

export default class Pool extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    children: Phaser.GameObjects.GameObject[],
    config: Phaser.Types.GameObjects.Group.GroupConfig = {}
  ) {
    super(world, scene, children, config);
    this.scene.add.existing(this);
  }

  spawn(x, y) {
    var rand = Math.floor((Math.random() * this.getLength()) + 1);
    const pool: Phaser.Physics.Arcade.Image = this.get(x, y);
    pool.setVisible(true);
    pool.setActive(true);

    return pool;
  }

  despawn(pool: Phaser.Physics.Arcade.Image) {
    this.killAndHide(pool);
  }

  // addToPool(child:Phaser.GameObjects.GameObject):void{
  //     this.add(child, true);
  //     console.log(`added ${child.type} to pool`);
  // }

  // addMultipleToPool(children:Phaser.GameObjects.GameObject[]):void{
  //     this.addMultiple(children);
  // }

  // getObject(x:number, y:number):Phaser.GameObjects.GameObject{
  //     return this.get(x,y);
  //     console.log('get called');
  // }

  // startObjectFactory():void{
  //     console.log('start object factory');
  //     this.scene.time.addEvent({
  //         delay: 2000,
  //         loop: true,
  //         callback: () => {
  //             console.log('getgetget');
  //             if(this.countActive() > 0)
  //             obj:Phaser.GameObjects.GameObject = this.get(500,500 );

  //         },
  //         callbackScope:  this
  //     });
  // }
}
