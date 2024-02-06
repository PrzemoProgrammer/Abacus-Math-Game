const config = {
  type: Phaser.AUTO,
  parent: "div",
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1920,
    height: 1290,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [MenuScene, PlayScene, FightScene],
};

const game = new Phaser.Game(config);
