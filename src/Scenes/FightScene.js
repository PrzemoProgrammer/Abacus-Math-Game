class FightScene extends Phaser.Scene {
  constructor() {
    super("FightScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("dinoBackground", "dinoBackground.png");
    this.load.image("healthBarContainer", "healthBarContainer.png");
    this.load.image("healthBar", "healthBar.png");
    this.load.image("lostScreen", "lostScreen.png");

    this.load.spritesheet("skin1Idle", "skin1Idle.png", {
      frameWidth: 11480 / 20,
      frameHeight: 419,
    });

    this.load.spritesheet("skin1Walk", "skin1Walk.png", {
      frameWidth: 11480 / 20,
      frameHeight: 419,
    });

    this.load.spritesheet("skin1Attack", "skin1Attack.png", {
      frameWidth: 14350 / 25,
      frameHeight: 419,
    });

    this.load.spritesheet("skin2Idle", "skin2Idle.png", {
      frameWidth: 15580 / 20,
      frameHeight: 569,
    });

    this.load.spritesheet("skin2Walk", "skin2Walk.png", {
      frameWidth: 15580 / 20,
      frameHeight: 569,
    });

    this.load.spritesheet("skin2Attack", "skin2Attack.png", {
      frameWidth: 13243 / 17,
      frameHeight: 569,
    });

    this.load.audio("hit", "audio/hit.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.addAnims();

    this.addBackground();
    this.addVSText();
    this.addPlayer();
    this.addEnemy();

    this.hitAudio = this.sound.add("hit");
    this.hitAudio.volume = 0.1;

    this.playScene = this.scene.get("PlayScene");
  }

  update() {}

  addBackground() {
    this.background = this.add
      .image(0, this.gh - 300, "dinoBackground")
      .setOrigin(0, 0);
  }

  addPlayer() {
    this.player = new Dino(this, 0, this.gh + 40, `skin1`, "player");
  }

  addEnemy() {
    this.enemy = new Dino(this, this.gw - 700, this.gh + 40, `skin2`, "enemy");
  }

  addAnims() {
    for (let i = 1; i <= 2; i++) {
      this.anims.create({
        key: `skin${i}-idle`,
        frames: `skin${i}Idle`,
        frameRate: 15,
        repeat: -1,
      });

      this.anims.create({
        key: `skin${i}-walk`,
        frames: `skin${i}Walk`,
        frameRate: 25,
        repeat: -1,
      });

      this.anims.create({
        key: `skin${i}-attack`,
        frames: `skin${i}Attack`,
        frameRate: 25,
        repeat: 0,
      });
    }
  }

  addPopupScreen(type) {
    this.popupWindow = new PopupWindow(this, 0, 0, "lostScreen", type);

    this.popupWindow.button.on("pointerup", () => {
      this.popupWindow.container.destroy();
      this.player.healthBar.restart();
      this.enemy.healthBar.restart();
    });
  }

  addVSText() {
    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "110px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 7,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.text = this.add
      .text(this.background.displayWidth / 2, 1050, "VS", textConfig)
      .setOrigin(0.5);
    //   .setWordWrapWidth(this.gw * 0.6);
  }
}
