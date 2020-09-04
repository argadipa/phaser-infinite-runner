import * as Phaser from "phaser";
import { IInteractables } from '../Interfaces/interface';

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
}


//backup
// import * as Phaser from "phaser";
// import { IInteractables } from '../Interfaces/interface';

// export default class Pool extends Phaser.Physics.Arcade.Group {
//   constructor(
//     world: Phaser.Physics.Arcade.World,
//     scene: Phaser.Scene,
//     children: IInteractables[],
//     config: Phaser.Types.GameObjects.Group.GroupConfig = {}
//   ) {
//     super(world, scene, children., config);
//     this.maxSize = -1;
//     this.scene.add.existing(this);
//   }

//   spawn(x, y) {
//     var rand = Math.floor((Math.random() * this.getLength()) + 1);
//     const pool: Phaser.Physics.Arcade.Image = this.get(x, y);
//     pool.setVisible(true);
//     pool.setActive(true);

//     return pool;
//   }

//   despawn(pool: Phaser.Physics.Arcade.Image) {
//     this.killAndHide(pool);
//   }
// }
