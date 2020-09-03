export type PhaserConfig = Phaser.Types.Core.GameConfig;

// import LevelScene from "../Scene/LevelScene";
// import TitleScene from "../Scene/TitleScene";

import PreloadScene from "../Scene/PreloadScene";
import GameScene from "../Scene/GameScene";

// import {getResolution} from '../Util/Util'

const DEFAULT_WIDTH:number = 1200;
const DEFAULT_HEIGHT:number = 800;

export const config: PhaserConfig = {
  title: "PhaserGame",
  type: Phaser.AUTO,
  scale: {
    parent: "phaser-app",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  backgroundColor: "#53BBE7",
  scene: [PreloadScene, GameScene]
 
};
