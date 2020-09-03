import State from "./State";
import Character from "../Object/Character";
import { Scene } from "phaser";
import { STATE_TYPE } from "../Enums";

export default class GameStartState extends State {
  constructor(gameScene: Phaser.Scene) {
    super(gameScene);
  }

  private baseScrollSpeed: number;

  begin() {
    console.log("begin in GameStartState");
    // scoll up the scrollables
    const { baseScrollSpeed } = this.gameScene.gameplayParameter;
    this.baseScrollSpeed = baseScrollSpeed;

    this.gameScene.events.on(
      "update",
      this.updateScrollHandler,
      this
    );
    this.gameScene.character.walk();
  }

  updateScrollHandler(time, delta) {
    this.gameScene.bottomGround.updateScroll(this.baseScrollSpeed);
    this.gameScene.topGround.updateScroll(this.baseScrollSpeed);
    this.gameScene.mountains.updateScroll(this.baseScrollSpeed * 0.5);
    this.gameScene.sky.updateScroll(this.baseScrollSpeed * 0.16);

    // kill the events when changing states!
    if(this.gameScene.state !== this) {
        this.gameScene.events.off('update', this.updateScrollHandler, this);
        // ^^^^ POTENTIALLY MAKE TROUBLES! - CHECK UP AFTER TESTING ANOTHER STATE
    }
  }

  jump() {
    this.gameScene.character.jump();
  }

  duck() {
    this.gameScene.character.duck();
  }
}
