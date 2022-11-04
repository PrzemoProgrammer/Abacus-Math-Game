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
    this.scale.fullscreenTarget = document.getElementById("div");

    this.menuScene = this.scene.get("MenuScene");
    this.selectedSkin = this.menuScene.selectedSkin;

    this.scene.launch("FightScene", {
      onPlaySceneCreated: this.onPlaySceneCreated.bind(this), // () => this.onPlaySceneCreated()
    });
    this.fightScene = this.scene.get("FightScene");

    this.implementText = null;
    this.isMouseBlock = false;

    this.addBackground();
    this.addOperation();
    this.addAbacus();
    this.addInputText();
    this.addCheckButton();
    this.addButtonRestart();

    this.correctAnswerAudio = this.sound.add("correctAnswer");
    this.correctAnswerAudio.volume = 0.1;
    this.buttonClickAudio = this.sound.add("buttonClick");
    this.incorrectAnswerAudio = this.sound.add("incorrectAnswer");
    this.incorrectAnswerAudio.volume = 0.1;
    this.throwBallAudio = this.sound.add("throwBall");
    this.addFullScreenButton();
    this.handleInputs = new HandleInputs(this);
  }

  update() {
    if (!this.scale.isFullscreen && !this.fullscreen.active) {
      this.fullscreen.setActive(true);
      this.fullscreen.setVisible(true);
    } else if (this.scale.isFullscreen && this.fullscreen.active) {
      this.fullscreen.setActive(false);
      this.fullscreen.setVisible(false);
    }
  }
  addFullScreenButton() {
    this.fullscreen = this.add
      .image(this.gw - 5, 5, "full-screen")
      .setOrigin(1, 0)
      .setScale(2)
      .setDepth(99999);
    this.fullscreen.setInteractive();

    this.fullscreen.on("pointerup", () => {
      console.log(this);
      this.scale.startFullscreen();
    });
  }
  addBackground() {
    this.background = this.add.image(0, 0, "menuBackground").setOrigin(0, 0);
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
      this.gh - 800,
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
        x: this.operation.container.x,
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
      y: 230,
      duration: 800,
    });

    this.inputText = this.add
      .rexInputText({
        x: this.operation.container.x + 30,
        y: -59,
        width: 200,
        height: 120,
        type: "number",
        placeholder: "",
        fontSize: "100px",
        fontFamily: "LuckiestGuy",
        color: "#ffffff",
        align: "left",
        maxLength: 2,
        readOnly: false,
      })
      .resize(200, 120)
      .on("textchange", ({ text }) => {
        this.implementText = text;
      });

    this.tweens.add({
      targets: this.inputText,
      y: 235,
      duration: 800,
    });
  }

  // addInputText() {
  //   this.inputbox = this.add
  //     .rexNinePatch({
  //       x:
  //         this.operation.container.x +
  //         this.operation.displayText.width / 2 +
  //         90,
  //       y: -50,
  //       width: 160,
  //       height: 120,
  //       key: "inputBox",
  //       columns: [15, undefined, 15],
  //       rows: [10, undefined, 10],
  //     })
  //     .setDepth(100);

  //   this.tweens.add({
  //     targets: this.inputbox,
  //     y: 80,
  //     duration: 800,
  //   });

  //   this.inputText = this.add
  //     .rexInputText({
  //       x:
  //         this.operation.container.x +
  //         this.operation.displayText.width / 2 +
  //         125,
  //       y: 85,
  //       width: 200,
  //       height: 140,
  //       type: "textarea",
  //       placeholder: "",
  //       fontSize: "100px",
  //       fontFamily: "LuckiestGuy",
  //       color: "#ffffff",
  //       align: "left",
  //       maxLength: 2,
  //     })
  //     .resize(200, 140)
  //     .on("textchange", ({ text }) => {
  //       this.implementText = text;
  //     });
  // }

  addCheckButton() {
    this.checkButton = this.add
      .image(this.inputbox.x + 200, -50, "checkButton")
      .setDepth(100);

    this.tweens.add({
      targets: this.checkButton,
      y: this.inputbox.y + 280,
      duration: 800,
    });

    this.checkButton.setInteractive();
    this.checkButton.on("pointerdown", () => {
      this.getCheck();
    });
  }

  getCheck() {
    if (this.isButtonBlocked) return;
    this.isButtonBlocked = true;
    if (this.implementText == this.operation.result) {
      this.isButtonBlocked = true;
      this.inputText.setReadOnly(true);
      this.inputText.fontColor = "rgb(0,255,0)";
      this.correctAnswerAudio.play();
      this.fightScene.player.attack(this.fightScene.enemy);
      this.operationRestart(3200);
    } else {
      this.isButtonBlocked = true;
      this.inputText.setReadOnly(true);
      this.inputText.fontColor = "rgb(255,0,0)";
      this.incorrectAnswerAudio.play();
      this.fightScene.enemy.attack(this.fightScene.player);
      this.operationRestart(3200);
    }
  }

  operationRestart(time) {
    this.time.delayedCall(time, () => {
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

  // operationDestroy(){

  // }

  onPlaySceneCreated() {
    this.lunchFight();
  }

  lunchFight() {
    this.scene.launch("FightScene");
  }
}
