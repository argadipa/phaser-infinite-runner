import * as Phaser from "phaser";
import { IInteractables } from '../Interfaces/interface';
import { shuffleArray } from '../Util/Util';

export default class Pool extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    children: Phaser.GameObjects.GameObject[],
    config: Phaser.Types.GameObjects.Group.GroupConfig = {}
  ) {
    super(world, scene, children, config);
    this.maxSize = -1;
    this.scene.add.existing(this);
  }

  spawn(x:number, y:number) {
    var rand = Math.floor((Math.random() * this.getLength()) + 1);
    const pool: Phaser.Physics.Arcade.Image = this.get(x, y);

    if(pool){
    pool.setVisible(true);
    pool.setActive(true);
    return pool;
    }
    return null;
  }

  spawnNth(index:number,x:number, y:number) {
    var rand = Math.floor((Math.random() * this.getLength()) + 1);
    const pool: Phaser.Physics.Arcade.Image = this.getLastNth(index, false, false, x, y);
    if(pool) {
      pool.setVisible(true);
      pool.setActive(true);
      return pool;
    }
    return null;
  }

  despawn(pool: Phaser.Physics.Arcade.Image) {
    this.killAndHide(pool);
  }
}



