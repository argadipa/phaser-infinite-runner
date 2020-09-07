import * as Phaser from "phaser";
import { IGameplayParameter } from "../Interfaces/interface";
import GameScene from "../Scene/GameScene";

export default class ScoreManager extends Phaser.GameObjects.GameObject {
  private _gameplayParameter: IGameplayParameter;
  private _score: number;
  private _timerConfig: Phaser.Types.Time.TimerEventConfig;

  private _onScoreChange: Phaser.Events.EventEmitter;

  constructor(
    scene: Phaser.Scene,
    gameParameter: IGameplayParameter,
    initialScore: number,
    onScoreChange: Phaser.Events.EventEmitter
  ) {
    super(scene, "ScoreGiver");
    this._gameplayParameter = gameParameter;
    this._score = initialScore;
    this.scene.add.existing(this);
    this._onScoreChange = onScoreChange;

    this._timerConfig = {
        delay: this._gameplayParameter.baseTimeIntervalAddScore,
        loop: true,
        callback: () => {
          this.addToCurrentScore(this._gameplayParameter.baseScorePoint);
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
    console.log(this._score);

    if(this._onScoreChange != null){
      this._onScoreChange.emit('updateScore', this._score);
    }else {
      console.log('onScoreChange not initialized.');
    }
  }
}
