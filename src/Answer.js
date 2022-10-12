class Answer {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.answer = this.getRandomAnswer();
    this.background = this.scene.add.image(0, 0, this.sprite);

    this.displayText = this.scene.add
      .text(this.background.x, this.background.y - 4, this.answer, {
        fontFamily: "LuckiestGuy",
        fontSize: "70px",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 5,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);

    this.container = this.scene.add.container(this.x, -200, [
      this.background,
      this.displayText,
    ]);
    this.container.setSize(this.background.width, this.background.height);
    this.container.setDepth(100);
    this.container.setInteractive();
    this.textInput();
  }

  getRandomAnswer() {
    return Math.floor(Phaser.Math.Between(0, 9));
  }

  onClick(cb) {
    this.container.on("pointerdown", () => {
      cb();
    });
  }

  textInput() {
    this.scene.tweens.add({
      targets: this.container,
      y: 250,
      duration: 800,
    });
  }
}
