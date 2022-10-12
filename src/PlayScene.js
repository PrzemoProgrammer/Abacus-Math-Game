// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("answerBackground", "answerBackground.png");
    this.load.image("operationBackground", "operationBackground.png");

    this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );

    // this.load.spritesheet("spider1Sprite", "spider1Sprite.png", {
    //   frameWidth: 186 / 2,
    //   frameHeight: 99,
    // });

    // this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.answers = [];
    this.score = 0;

    this.addBackground();
    this.addOperation();
    // this.addInputText();
    // this.addAnswer();
  }

  update() {}

  addBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  addAnswer() {
    // const answer = new Answer(this, x, 300, "answerBackground");
    // this.answers.push(answer);
    // this.setClickAble(answer);
  }

  setClickAble() {
    // answer.onClick(() => {
    // });
  }

  getCutNumber(number) {
    return Number(Number(number).toFixed(5));
  }

  setCorrectAnswer() {
    let randomIndex = Phaser.Math.Between(0, this.answers.length - 1);
    let operationResult = this.getCutNumber(this.operation.result);
    this.answers[randomIndex].displayText.setText(operationResult);
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
    const inputbox = this.add.rexNinePatch({
      x: 100,
      y: 250,
      width: 100,
      height: 40,
      key: "inputBox",
      columns: [15, undefined, 15],
      rows: [10, undefined, 10],
    });

    let newName = "";
    const inputText = this.add
      .rexInputText({
        x: 100,
        y: 260,
        width: 100,
        height: 40,
        type: "textarea",
        placeholder: "New name",
        fontSize: "20px",
        fontFamily: "SwisBlack",
        color: "#ffffff",
        align: "center",
        maxLength: 10,
      })
      .resize(100, 40)
      .on("textchange", ({ text }) => {
        newName = text;
      });
  }
}
