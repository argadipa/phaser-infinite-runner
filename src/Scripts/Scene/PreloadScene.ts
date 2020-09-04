import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
    console.log('PreloadScene loaded.');
  }

  preload(): void {
      // assign the base load path
      this.load.path = "src/Assets/";

      // load assets for background objects
      this.load.image("groundTop", "platformPack_tile003.png");
      this.load.image("groundBottom", "platformPack_tile004.png");
      this.load.image("mountains", "mountains.png");
      this.load.image("sky", "sky.jpg");

      // load assets for interactables
      this.load.image("woodenBlock", "platformPack_tile038.png");
      this.load.image("deathSpinner", "platformPack_tile012.png");
      this.load.image("gem", "platformPack_item007.png");

      // load assets for character
      this.load.spritesheet("char", "character_spritesheet.png", {
        frameWidth: 96,
        frameHeight: 96,
      });

      // load assets for sound
      this.load.audio('jump', "Jump.wav");
      this.load.audio('coin', "Gem.wav");
  }

  create(): void {
    this.scene.start("GameScene");
  }
}
