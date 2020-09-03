import * as Phaser from "phaser";

export default class Scrollables extends Phaser.GameObjects.TileSprite {
  private _scrolling: boolean = true;
  private _scrollSpeed:number;

  get isScrolling(): boolean { return this._scrolling };
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: integer,
    height: integer,
    textureKey: string
  ) {
    super(scene, x, y, width, height, textureKey);
    this.scene.add.existing(this);
  }

  setScrolling(state:boolean, scrollSpeed:number) {
    this._scrolling = state;
    while(this._scrolling){
      this.tilePositionX += scrollSpeed;
    }
  }

  updateScroll(scrollSpeed:number): void {
    this._scrollSpeed = scrollSpeed;
    if(!this.isScrolling) return;
    this.tilePositionX += this._scrollSpeed;
  }
}
