import State from "./State";
import { getRandomInt, shuffleArray } from "../Util/Util";


export default class GameStartState extends State {
  private lastSpawn: number = 0;
  private baseScrollSpeed: number;

  constructor(gameScene: Phaser.Scene) {
    super(gameScene);
  }

  begin() {
    console.log("begin in GameStartState");
    // scoll up the scrollables
    const { baseScrollSpeed } = this.gameScene.gameplayParameter;
    this.baseScrollSpeed = baseScrollSpeed;
    this.gameScene.shuffleInteractables();
    this.gameScene.events.on("update", this.updateScrollHandler, this);
    this.gameScene.character.walk();
    // this.gameScene.events.off('updateScore');
    // this.gameScene.events.on('updateScore', this.updateScoreHandler, this);
  }

  updateScrollHandler(time, delta) {
    this.gameScene.bottomGround.updateScroll(this.baseScrollSpeed * delta * 0.001);
    this.gameScene.topGround.updateScroll(this.baseScrollSpeed * delta * 0.001);
    this.gameScene.mountains.updateScroll(this.baseScrollSpeed * delta * 0.001 * 0.25);
    this.gameScene.sky.updateScroll(this.baseScrollSpeed * delta * 0.001 * 0.15);

    // kill the events when changing states!
    if (this.gameScene.state !== this) {
      this.gameScene.events.off("update", this.updateScrollHandler, this);
    }

    // set up the interactables position
    if (time > this.lastSpawn) {
      let random = Math.floor((Math.random() * this.gameScene.interactables.length) + 1);

      let newInteractables = this.gameScene.pool.spawnNth(random, 1250, 572);

      if(newInteractables == null) return;
      
      switch (newInteractables.texture.key) {
        case "woodenBlock":
          newInteractables.setY(575);
          break;
        case "deathSpinner":
          newInteractables.setY(515);
          break;
        case "gem":
          newInteractables.setY(400);
          break;
        default:
          break;
      }

      this.lastSpawn =
        time +
        getRandomInt(
          this.gameScene.gameplayParameter.minSpawnTimer,
          this.gameScene.gameplayParameter.maxSpawnTimer
        );
    }
  }

  jump() {
    this.gameScene.character.jump();
  }

  duck() {
    this.gameScene.character.duck();
  }
}
