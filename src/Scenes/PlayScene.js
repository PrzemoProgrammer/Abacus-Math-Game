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
    this.load.image("abacusFrame", "abacusFrame.png");
    this.load.image("inputBox", "inputBox.png");

    this.load.image("bead", "bead.png");
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

    this.abacusFrame = this.add.image(330, 150, "abacusFrame").setOrigin(0, 0);

    this.abacus = new Abacus(this, "myAbacus", 0);
    this.addInputText();
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
      x: this.operation.container.x + this.operation.displayText.width / 2 + 90,
      y: 80,
      width: 160,
      height: 120,
      key: "inputBox",
      columns: [15, undefined, 15],
      rows: [10, undefined, 10],
    });

    console.log(this.operation.displayText.width);
    const inputText = this.add
      .rexInputText({
        x:
          this.operation.container.x +
          this.operation.displayText.width / 2 +
          170,
        y: 90,
        width: 300,
        height: 140,
        type: "textarea",
        placeholder: "",
        fontSize: "100px",
        fontFamily: "LuckiestGuy",
        color: "#ffffff",
        align: "left",
        maxLength: 2,
      })
      .resize(300, 140)
      .on("textchange", ({ text }) => {});
  }
}
