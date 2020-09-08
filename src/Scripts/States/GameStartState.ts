import State from "./State";
import { getRandomInt, shuffleArray } from "../Util/Util";

const countToRandomize: number = 4;

export default class GameStartState extends State {
  private lastSpawn: number = 0;
  private baseScrollSpeed: number;
  private spawnCount = 0;

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

  updateScoreHandler(score) {
    console.log('add score event fired');
    this.gameScene.scoreText.updateScore(score);
  }

  updateScrollHandler(time, delta) {
    this.gameScene.bottomGround.updateScroll(this.baseScrollSpeed);
    this.gameScene.topGround.updateScroll(this.baseScrollSpeed);
    this.gameScene.mountains.updateScroll(this.baseScrollSpeed * 0.5);
    this.gameScene.sky.updateScroll(this.baseScrollSpeed * 0.16);

    // kill the events when changing states!
    if (this.gameScene.state !== this) {
      this.gameScene.events.off("update", this.updateScrollHandler, this);
    }

    // set up the interactables position
    if (time > this.lastSpawn) {
      this.spawnCount += 1;
      
      if(this.spawnCount >= countToRandomize)
      {
        this.gameScene.shuffleInteractables();
        this.spawnCount = 0;
      }

      let newInteractables = this.gameScene.pool.spawn(1250, 572);
      switch (newInteractables.texture.key) {
        case "woodenBlock":
          newInteractables.setY(572);
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
