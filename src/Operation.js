class Operation {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.id = 0;

    this.equations = [
      "5 + 2 -10 + 15 + 7",
      "15 + 10 - 5 - 7 + 8",
      "23 - 15 - 8 + 0 + 1",
      "50 - 25 - 4 + 8 + 37",
      "1 - 1 - 1 + 1 + 1",
      "7 - 9 - 2 + 7 + 3",
    ];

    this.currentEquation =
      this.equations[Phaser.Math.Between(0, this.equations.length - 1)];

    this.result = this.getResult();

    this.background = this.scene.add.image(0, 0, this.sprite);
    this.displayText = this.scene.add
      .text(
        this.background.x,
        this.background.y - 4,
        this.currentEquation + " =",
        {
          fontFamily: "LuckiestGuy",
          fontSize: "100px",
          color: "#fff",
          stroke: "#000000",
          strokeThickness: 5,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5, 0.5);
    this.container = this.scene.add.container(this.x, -200, [
      this.background,
      this.displayText,
    ]);
    this.container.setSize(this.background);
    this.container.setDepth(100);
    this.background.setInteractive();
    this.animateYPosition();
  }

  getResult() {
    return eval(this.currentEquation);
  }

  setBackgroundSize(w, h) {
    this.background.displayWidth = w;
    this.background.displayHeight = h;
  }

  setTextPosition() {
    this.displayText.x = this.background.x + this.background.displayWidth / 2;
    this.displayText.y =
      this.background.y + this.background.displayHeight / 2 - 4;
  }

  animateYPosition() {
    this.scene.tweens.add({
      targets: this.container,
      y: 80,
      duration: 800,
    });
  }
}
