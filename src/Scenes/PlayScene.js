// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {}

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.menuScene = this.scene.get("MenuScene");

    this.selectedSkin = this.menuScene.selectedSkin;

    this.implementText = null;

    this.addBackground();
    this.addOperation();
    this.addCheckButton();
    this.addAbacus();
    this.addButtonRestart();
    this.addInputText();

    this.correctAnswerAudio = this.sound.add("correctAnswer");
    this.correctAnswerAudio.volume = 0.1;
    this.buttonClickAudio = this.sound.add("buttonClick");
    this.incorrectAnswerAudio = this.sound.add("incorrectAnswer");
    this.incorrectAnswerAudio.volume = 0.1;
    this.throwBallAudio = this.sound.add("throwBall");
  }

  update() {}

  addBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  getCutNumber(number) {
    return Number(Number(number).toFixed(5));
  }

  setCorrectAnswer() {
    let randomIndex = Phaser.Math.Between(0, this.answers.length - 1);
    let operationResult = this.getCutNumber(this.operation.result);
    this.answers[randomIndex].displayText.setText(operationResult);
  }

  addAbacus() {
    this.abacus = new Abacus(this, 230, 550, this.selectedSkin);
  }

  addButtonRestart() {
    this.restartButton = new Button(
      this,
      this.gw - 170,
      this.gh - 170,
      "restartButton",
      "restartButtonPushed"
    );
    this.restartButton.onClick(() => {
      this.abacus.destroy();
      this.addAbacus();
    });
  }

  addOperation() {
    this.operation = new Operation(
      this,
      this.gw / 2,
      this.gh - 1000,
      "operationBackground"
    );
  }

  addInputText() {
    this.inputbox = this.add
      .rexNinePatch({
        x:
          this.operation.container.x +
          this.operation.displayText.width / 2 +
          90,
        y: -50,
        width: 160,
        height: 120,
        key: "inputBox",
        columns: [15, undefined, 15],
        rows: [10, undefined, 10],
      })
      .setDepth(100);

    this.tweens.add({
      targets: this.inputbox,
      y: 80,
      duration: 800,
    });

    this.inputText = this.add
      .rexInputText({
        x:
          this.operation.container.x +
          this.operation.displayText.width / 2 +
          125,
        y: 85,
        width: 200,
        height: 140,
        type: "textarea",
        placeholder: "",
        fontSize: "100px",
        fontFamily: "LuckiestGuy",
        color: "#ffffff",
        align: "left",
        maxLength: 2,
      })
      .resize(200, 140)
      .on("textchange", ({ text }) => {
        this.implementText = text;
      });
  }

  addCheckButton() {
    this.checkButton = this.add
      .image(
        this.operation.container.x + this.operation.displayText.width / 2 + 330,
        -50,
        "checkButton"
      )
      .setDepth(100);

    this.tweens.add({
      targets: this.checkButton,
      y: 70,
      duration: 800,
    });

    this.checkButton.setInteractive();
    this.checkButton.on("pointerdown", () => {
      if (this.isButtonBlocked) return;
      this.isButtonBlocked = true;
      if (this.implementText == this.operation.result) {
        this.inputText.fontColor = "rgb(0,255,0)";
        this.correctAnswerAudio.play();
        this.operationRestart();
      } else {
        this.inputText.fontColor = "rgb(255,0,0)";
        this.incorrectAnswerAudio.play();
        this.operationRestart();
      }
    });
  }

  operationRestart() {
    this.time.delayedCall(500, () => {
      this.operation.container.destroy();
      this.inputText.destroy();
      this.inputbox.destroy();
      this.checkButton.destroy();
      this.addOperation();
      this.addInputText();
      this.addCheckButton();
      this.isButtonBlocked = false;
    });
  }
}
