class Button extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, sprite2) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.sprite2 = sprite2;

    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.setInteractive();
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      this.setTexture(this.sprite2);
      this.setScale(0.9);
      cb();
    }).on("pointerup", () => {
      this.setTexture(this.sprite);
      this.setScale(1);
    });
    return this;
  }
}
