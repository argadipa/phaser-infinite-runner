import * as Phaser from "phaser";
import FpsText from "../Object/FpsText";
import Scrollables from "../Object/Scrollables";
import InstructionText from "../Object/InstructionText";
import ScoreText from "../Object/ScoreText";
import Character from "../Object/Character";
import Interactables from "../Object/Interactables";
import InteractablesBlock from "../Object/InteractablesBlock";
import InteractablesSpinner from "../Object/InteractablesSpinner";
import InteractablesPoint from "../Object/InteractablesPoint";
import Pool from "../Object/Pool";
import ScoreManager from "../Object/ScoreManager";
import State from "../States/State";
import GameStartState from "../States/GameStartState";
import GameOverState from "../States/GameOverState";
import { shuffleArray } from "../Util/Util";
import type { IGameplayParameter, IGameData } from "../Interfaces/interface";


export default class GameScene extends Phaser.Scene {
  // game parameter
  private _gamePlayParameter: IGameplayParameter = {
    baseScrollSpeed: 250,
    baseScorePoint: 100,
    baseTimeIntervalAddScore: 3000,
    boxSpawnPositionX: 1000,
    boxSpawnPositionY: 300,
    minSpawnTimer: 1000,
    maxSpawnTimer: 3200,
    characterDuckTime: 1000,
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
  private _topGround: Scrollables;
  private _bottomGround: Scrollables;
  private _mountains: Scrollables;
  private _sky: Scrollables;
  private _interactablesBlock: Array<InteractablesBlock>;
  private _interactablesSpinner: Array<InteractablesSpinner>;
  private _interactablesPoint: Array<InteractablesPoint>;
  private _interactables: Array<Interactables>;
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

  get interactables(): Array<Phaser.Physics.Arcade.Image> {
    return this._interactables;
  }

  get interactablesBlock(): Array<InteractablesBlock> {
    return this._interactablesBlock;
  }

  get interactablesSpinner(): Array<InteractablesSpinner> {
    return this._interactablesSpinner;
  }

  get interactablesPoint(): Array<InteractablesPoint> {
    return this._interactablesPoint;
  }

  // ui interfaces
  private _fpsText: FpsText;
  private _instruction: InstructionText;
  private _scoreText: ScoreText;

  get fpsText(): FpsText {
    return this._fpsText;
  }

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


  get platformCollider(): Phaser.Physics.Arcade.Collider {
    return this._platformCollider;
  }
  get interactablesCollider(): Phaser.Physics.Arcade.Collider {
    return this._interactablesCollider;
  }

  // audio
  private _jump: Phaser.Sound.BaseSound;
  private _coin: Phaser.Sound.BaseSound; 
  
  // helpers
  private _pool: Pool;
  get pool(): Pool {
    return this._pool;
  }

  private _scoreManager: ScoreManager;
  get scoreManager(): ScoreManager {
    return this._scoreManager;
  }

  // events
  public onScoreChangeEvents: Phaser.Events.EventEmitter;

  // use this for change the game states!
  changeState(newState: State) {
    this.state = newState;
    this.state.begin();
  }

  // INITS ============================
  initHelpers(): void {
    this._scoreManager = new ScoreManager(this, this._gamePlayParameter, 0, this.onScoreChangeEvents);
  }

  initInterface(): void {
    this._fpsText = new FpsText(this);
    this._instruction = new InstructionText(
      this,
      "Up Arrow - Jump\nDown Arrow - Duck"
    );

    this._scoreText = new ScoreText(this, `${this._gameData.score}`);
  }

  initAudios(): void {
    this._jump = this.sound.add('jump');
    this._coin = this.sound.add('coin');
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
    this._character = new Character(
      this,
      300,
      200,
      "char",
      this.gameplayParameter
    );

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

    this._interactables = new Array<Interactables>();
    this._interactablesBlock = new Array<InteractablesBlock>();
    this._interactablesSpinner = new Array<InteractablesSpinner>();
    this._interactablesPoint = new Array<InteractablesPoint>();

    for (let index = 0; index < 15; index++) {
      const obj: InteractablesBlock = new InteractablesBlock(
        this,
        5000,
        5000,
        "woodenBlock",
        this.gameplayParameter.baseScrollSpeed,
        "death"
      );
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);
    }

    for (let index = 0; index < 15; index++) {
      const obj: InteractablesSpinner = new InteractablesSpinner(
        this,
        5000,
        5000,
        "deathSpinner",
        this.gameplayParameter.baseScrollSpeed,
        3,
        "death"
      );
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);
    }

    for (let index = 0; index < 15; index++) {
      const obj: InteractablesPoint = new InteractablesPoint(
        this,
        5000,
        5000,
        "gem",
        this.gameplayParameter.baseScrollSpeed,
        "death"
      );
      obj.setVisible(false);
      obj.setActive(false);
      this._interactables.push(obj);
    }

    this.shuffleInteractables();

    this._pool = new Pool(
      this.scene.scene.physics.world,
      this,
      this._interactables
    );
  }

  // shuffle the pool
  shuffleInteractables(): void {
    this._interactables = shuffleArray(this._interactables);
  }

  initPhysics(): void {
    this.physics.add.existing(this._topGround, true);

    this._platformCollider = this.physics.add.collider(
      this._character,
      this._topGround
    );

    // Collision events
    this.physics.add.overlap(
      this._character,
      this._pool,
      (player: Character, pool: Phaser.Physics.Arcade.Image) => {
        switch (pool.texture.key) {
          case "gem":
            this.scoreManager.addToCurrentScore(
              this.gameplayParameter.baseScorePoint * 3
            );
            this._coin.play();
            pool.setPosition(5000,5000);
            this._pool.despawn(pool);
            break;
          case "deathSpinner":
            this.changeState(new GameOverState(this));
            break;
          case "woodenBlock":
            this.changeState(new GameOverState(this));
            break;
          default:
            break;
        }
        //this.changeState(new GameOverState(this));
      },
      (player, poll) => {
        return true;
      }
    );
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
    var debugGameOver: Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(
      KeyCodes.G
    );

    // make sure to kill the events so they are not duplicated when restarting the scenes! --IMPORTANT
    this.keyUp.off("down");
    this.keyDown.off("down");
    this.keyReset.off("down");
    debugGameOver.off("down");

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

  initEvents():void {
    this.onScoreChangeEvents = new Phaser.Events.EventEmitter();
    
    this.onScoreChangeEvents.on('updateScore', (v) => {
      this.scoreText.updateScore(v);
      console.log('update score');
    }, this);
  }

  initGames(): void {
    
    // Init events
    this.initEvents();

    // create the helpers
    this.initHelpers();

    // create the ui interfaces
    this.initInterface();

    // create the animations
    this.initAnimations();

    // create the sounds
    this.initAudios();

    // Create the Game Objects
    this.initGameObjects();

    // Set up the physics
    this.initPhysics();

    // Set z-index
    this.initZIndex();

    // Set keyboard keys
    this.initKeys();

  }

  updateScore(score:number){
    this.scoreText.updateScore(score);
  }

  // CONSTRUCTOR AND LIFECYCLE ===========================

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
    // init games
    this.initGames();
    // Assign the fist state
    this.changeState(new GameStartState(this));
  }

  update(): void {}
}
