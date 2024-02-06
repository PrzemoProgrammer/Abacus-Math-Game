class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ball");
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.scene.add.existing(this);
    this.startPositionX = this.x;
    this.startPositionY = this.y;
    this.setDepth(100);
  }

  shoot(target) {
    this.scene.tweens.add({
      targets: this,
      x: target.x,
      y: target.y,
      duration: 200,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}
