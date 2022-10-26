class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("answerBackground", "answerBackground.png");
    this.load.image("operationBackground", "operationBackground.png");
    this.load.image("abacusFrame", "abacusFrame.png");
    this.load.image("inputBox", "inputBox.png");
    this.load.image("ball", "ball.png");
    this.load.image("whitePad", "whitePad.png");
    this.load.image("button", "button.png");
    this.load.image("chooseFrame", "chooseFrame.png");
    this.load.image("checkButton", "checkButton.png");
    this.load.image("restartButton", "restartButton.png");
    this.load.image("restartButtonPushed", "restartButtonPushed.png");
    this.load.image("decimalPoint", "decimalPoint.png");

    this.load.image("skin1", "skin1.png");
    this.load.image("skin2", "skin2.png");
    this.load.image("skin3", "skin3.png");
    this.load.image("skin4", "skin4.png");
    this.load.image("skin5", "skin5.png");
    this.load.image("skin6", "skin6.png");
    this.load.image("skin7", "skin7.png");
    this.load.image("skin8", "skin8.png");

    this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );
    this.load.plugin(
      "rexninepatchplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexninepatchplugin.min.js",
      true
    );
    this.load.audio("correctAnswer", "audio/correctAnswer.mp3");
    this.load.audio("buttonClick", "audio/buttonClick.mp3");
    this.load.audio("incorrectAnswer", "audio/incorrectAnswer.mp3");
    this.load.audio("throwBall", "audio/throwBall.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.selectedSkin = null;
    this.addBackground();
    this.addChooseFrame();
    this.addCharacters();

    this.buttonClickAudio = this.sound.add("buttonClick");
    this.buttonClickAudio.volume = 0.3;

    this.add
      .text(this.gw / 2, 140, "Choose Character", {
        align: "center",
        font: "100px LuckiestGuy",
        color: "black",
      })
      .setOrigin(0.5)
      .setWordWrapWidth(this.gw * 0.8);

    this.playButton = this.add
      .image(this.gw / 2, this.gh - 100, "button")
      .setInteractive()
      .setOrigin(0.5, 1)
      .setVisible(false)
      .setActive(false);

    this.playButton.on("pointerdown", () => {
      this.buttonClickAudio.play();
      this.scene.start("PlayScene");
    });
  }

  addBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.whitePad = this.add.image(this.gw / 2, this.gh / 2, "whitePad");
  }

  addCharacter(i) {
    let character = this.add.image(200 * i + 55, 550, "skin" + i).setScale(2);
    character.setInteractive();

    character.on("pointerdown", () => {
      this.chooseFrame.setPosition(character.x, character.y);
      this.playButton.setActive(true);
      this.playButton.setVisible(true);
      this.selectedSkin = character.texture.key;
    });
  }

  addCharacters() {
    for (let i = 1; i <= 8; i++) {
      this.addCharacter(i);
    }
  }

  addChooseFrame() {
    this.chooseFrame = this.add.image(-100, -100, "chooseFrame");
  }

  update() {}
}
