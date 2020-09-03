import * as Phaser from "phaser";
import FpsText from "../Object/FpsText";
import Scrollables from "../Object/Scrollables";
import InstructionText from "../Object/InstructionText";
import ScoreText from "../Object/ScoreText";
import Character from "../Object/Character";
import InteractablesBlock from "../Object/InteractablesBlock";
import Pool from '../Object/Pool';
import ScoreGiver from "../Object/ScoreGiver";
import State from "../States/State";
import GameStartState from "../States/GameStartState";
import GameOverState from "../States/GameOverState";
import { shuffleArray } from '../Util/Util';
import type { IGameplayParameter, IGameData } from "../Interfaces/interface";
import Interactables from "../Object/Interactables";

export default class GameScene extends Phaser.Scene {
  // game parameter
  private _gamePlayParameter: IGameplayParameter = {
    baseScrollSpeed: 2.8,
    baseScorePoint: 100,
    baseTimeIntervalAddScore: 3000,
    boxSpawnPositionX: 1000,
    boxSpawnPositionY: 300,
    minSpawnTimer: 1000,
    maxSpawnTimer: 4000
  };

  get gameplayParameter(): IGameplayParameter {
    return this._gamePlayParameter;
  }

  set gameplayParameter(value: IGameplayParameter) {
    this._gamePlayParameter = value;
  }

  // game data
  private _gameData: IGameData = {
    score: 0,
  };

  get gameData(): IGameData {
    return this._gameData;
  }

  set gameData(value: IGameData) {
    this._gameData = value;
  }

  // game objects
  private _fpsText: FpsText;
  private _topGround: Scrollables;
  private _bottomGround: Scrollables;
  private _mountains: Scrollables;
  private _sky: Scrollables;
  private _interactables: Array<InteractablesBlock>;
  public _character: Character;


  get character(): Character {
    return this._character;
  }

  get topGround(): Scrollables {
    return this._topGround;
  }

  get mountains(): Scrollables {
    return this._mountains;
  }

  get bottomGround(): Scrollables {
    return this._bottomGround;
  }

  get sky(): Scrollables {
    return this._sky;
  }

  get interactables():Array<InteractablesBlock>{
    return this._interactables;
  }

  // ui interfaces
  private _instruction: InstructionText;
  private _scoreText: ScoreText;

  get scoreText(): ScoreText {
    return this._scoreText;
  }

  // game state
  public state: State;

  // Keys
  private keyUp: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyReset: Phaser.Input.Keyboard.Key;

  // colliders
  private _platformCollider: Phaser.Physics.Arcade.Collider;
  private _interactablesCollider: Phaser.Physics.Arcade.Collider;

  get platformCollider(): any {
    return this._platformCollider;
  }
  get interactablesCollider(): any {
    return this._interactablesCollider;
  }

  // helpers
  private _pool:Pool;
  get pool():Pool {
    return this._pool;
  }

  private _scoreGiver: ScoreGiver;
  get scoreGiver(): ScoreGiver {
    return this._scoreGiver;
  }

  // Event
  public onScoreChanged: CustomEvent = new CustomEvent("value");

  // use this for change the game states!
  changeState(newState: State) {
    this.state = newState;
    this.state.begin();
  }

  // INITS ============================

  initHelpers(): void {
    this._scoreGiver = new ScoreGiver(this, this._gamePlayParameter, 0);
  }

  initInterface(): void {
    this._fpsText = new FpsText(this);
    this._instruction = new InstructionText(
      this,
      "Up Arrow - Jump\nDown Arrow - Duck"
    );

    this._scoreText = new ScoreText(this, `${this._gameData.score}`);
  }

  initAnimations(): void {
    var walkConfig: Phaser.Types.Animations.Animation = {
      key: "walk",
      frames: this.anims.generateFrameNumbers("char", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    };

    var jumpConfig: Phaser.Types.Animations.Animation = {
      key: "jump",
      frames: this.anims.generateFrameNumbers("char", { start: 2, end: 2 }),
      frameRate: 4,
    };

    var duckConfig: Phaser.Types.Animations.Animation = {
      key: "duck",
      frames: this.anims.generateFrameNumbers("char", { start: 3, end: 3 }),
      frameRate: 4,
    };

    this.anims.create(walkConfig);
    this.anims.create(jumpConfig);
    this.anims.create(duckConfig);
  }

  initGameObjects() {
    this._character = new Character(this, 300, 200, "char");
    this._character.addCollider(this._platformCollider);

    this._topGround = new Scrollables(
      this,
      600,
      this.cameras.main.height * 0.8,
      1200,
      64,
      "groundTop"
    );

    this._bottomGround = new Scrollables(
      this,
      600,
      this.cameras.main.height * 0.95,
      1200,
      192,
      "groundBottom"
    );

    this._mountains = new Scrollables(
      this,
      600,
      this.cameras.main.height * 0.56,
      0,
      361,
      "mountains"
    );

    this._sky = new Scrollables(
      this,
      600,
      this.cameras.main.height * 0.25,
      1200,
      600,
      "sky"
    );

    this._interactables = new Array<InteractablesBlock>();

    for (let index = 0; index < 5; index++) {
      const obj:InteractablesBlock = new InteractablesBlock(this, 5000, 5000, 'woodenBlock', this.gameplayParameter.baseScrollSpeed, 'death');
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);  
    }

    for (let index = 0; index < 5; index++) {
      const obj:InteractablesBlock = new InteractablesBlock(this, 5000, 5000, 'deathSpinner', this.gameplayParameter.baseScrollSpeed, 'death');
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);  
    }

    for (let index = 0; index < 5; index++) {
      const obj:InteractablesBlock = new InteractablesBlock(this, 5000, 5000, 'gem', this.gameplayParameter.baseScrollSpeed, 'death');
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);   
    }

    this.shuffleInteractables();

    this._pool = new Pool(this.physics.world, this, this._interactables);

  }

  shuffleInteractables():void {
    this._interactables = shuffleArray(this._interactables);
  }

  initPhysics(): void {
    this.physics.add.existing(this._topGround, true);
    this._platformCollider = this.physics.add.collider(
      this._character,
      this._topGround
    );
    this._interactablesCollider = this.physics.add.collider(
      this._character,
      this._pool
    );

    // Events
    this.physics.add.overlap(this._character, this._pool, (player, pool) => { 
      this.changeState(new GameOverState(this));
    });
  }

  initZIndex(): void {
    this._mountains.setDepth(-1);
    this._sky.setDepth(-2);
    this._character.setDepth(1);
  }

  initKeys(): void {
    const { KeyCodes } = Phaser.Input.Keyboard;
    this.keyUp = this.input.keyboard.addKey(KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(KeyCodes.DOWN);
    this.keyReset = this.input.keyboard.addKey(KeyCodes.R);
    var debugGameOver = this.input.keyboard.addKey(KeyCodes.G);

    this.keyUp.on(
      "down",
      (e) => {
        this.state.jump();
      },
      this
    );
    this.keyDown.on(
      "down",
      (e) => {
        this.state.duck();
      },
      this
    );
    this.keyReset.on(
      "down",
      (e) => {
        this.state.restart();
      },
      this
    );
    debugGameOver.on(
      "down",
      (e) => {
        this.changeState(new GameOverState(this));
      },
      this
    );
  }

  initGames(): void {
    // create the helpers
    this.initHelpers();

    // create the ui interfaces
    this.initInterface();

    // create the animations
    this.initAnimations();

    // Create the Game Objects
    this.initGameObjects();

    // Set up the physics
    this.initPhysics();

    // Set z-index
    this.initZIndex();

    // Set keyboard keys
    this.initKeys();

    
  }

  // CONSTRUCTOR AND LIFECYCLE ===========================

  constructor() {
    super({ key: "GameScene" });
   
  }

  preload(): void {
    
  }

  create(): void {
    // init games
    this.initGames();
     // Assign the fist state
     this.changeState(new GameStartState(this));
  }

  update(): void {
    //TEST ONLY
    this._scoreText.updateScore(this._scoreGiver.getCurrentScore());
  }
}
