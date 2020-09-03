import * as Phaser from 'phaser';

export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene:Phaser.Scene) {
    super(scene, 10, 10, '', { color: 'white', fontSize: '28px' })
    scene.add.existing(this);
    this.setOrigin(0);
    scene.events.off('update', this.updateHandler, this);
    scene.events.on('update', this.updateHandler, this);
  }

  updateHandler(time, delta) {
    // TODO: Bugged when restarting the scene
    if(this.scene.game){
      this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
    }
  }

  removeUpdateEvent():void{
    this.scene.events.off('update', this.updateHandler, this);
  }
}
