import { config } from "./Config/PhaserConfig";

type GameConfig = Phaser.Types.Core.GameConfig; // why tho??

export class PhaserGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  let game = new PhaserGame(config);
};
