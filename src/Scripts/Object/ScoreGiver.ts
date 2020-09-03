import * as Phaser from "phaser";
import { IGameplayParameter } from "../Interfaces/interface";
import GameScene from "../Scene/GameScene";

export default class ScoreGiver extends Phaser.GameObjects.GameObject {
  private _gameplayParameter: IGameplayParameter;
  private _score: number;
  private _timerConfig: Phaser.Types.Time.TimerEventConfig;

  constructor(
    scene: Phaser.Scene,
    gameParameter: IGameplayParameter,
    initialScore: number
  ) {
    super(scene, "ScoreGiver");
    this._gameplayParameter = gameParameter;
    this._score = initialScore;
    this.scene.add.existing(this);

    this._timerConfig = {
        delay: this._gameplayParameter.baseTimeIntervalAddScore,
        loop: true,
        callback: () => {
          this._score += this._gameplayParameter.baseScorePoint;
        },
        callbackScope: this,
      };

    this.scene.time.addEvent(this._timerConfig);
  }


  stopScoreGeneration(): void {
    this.scene.time.removeAllEvents();
  }

  getCurrentScore(): number {
    return this._score;
  }

  addToCurrentScore(addedValue: number): void {
    this._score += addedValue;
  }
}
