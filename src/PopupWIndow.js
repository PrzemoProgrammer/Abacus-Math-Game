class PopupWindow {
  constructor(scene, x, y, sprite, type) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.type = type;

    this.addBackground();
    this.addText();
    this.addRestartButton();

    this.container = this.scene.add
      .container(
        this.x + this.background.displayWidth / 2,
        this.y + this.background.displayHeight / 2,
        [this.background, this.text, this.button]
      )
      .setDepth(999)
      .setScale(0);

    this.addScaleAnim();
    //   .setOrigin(0, 0);
    // this.setInteractive();
  }

  addScaleAnim() {
    this.scene.tweens.add({
      targets: this.container,
      scale: 1,
      duration: 200,
    });
  }

  addBackground() {
    this.background = this.scene.add.image(0, 0, this.sprite).setSize(0);
    this.background.setInteractive();
  }

  addText() {
    let text = null;

    if (this.type === "win") {
      text = "YOU WIN !";
    } else [(text = "YOU LOST !")];

    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "90px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 7,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.text = this.scene.add
      .text(
        this.background.displayWidth / 2 - 950,
        this.background.displayHeight / 2 - 700,

        text,
        textConfig
      )
      .setOrigin(0.5);
    //   .setWordWrapWidth(this.gw * 0.6);
  }

  addRestartButton() {
    this.button = this.scene.add.image(
      this.background.displayWidth / 2 - 950,
      this.background.displayHeight / 2 - 400,
      "restartButton"
    );
    this.button.setInteractive();
  }

  //   onClick(cb) {
  //     this.on("pointerdown", () => {
  //       this.setTexture(this.sprite2);
  //       this.setScale(0.9);
  //       cb();
  //     }).on("pointerup", () => {
  //       this.setTexture(this.sprite);
  //       this.setScale(1);
  //     });
  //     return this;
  //   }
}
