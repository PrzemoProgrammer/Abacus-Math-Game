const config = {
  type: Phaser.AUTO,
  parent: "game",
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1920,
    height: 1600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [MenuScene, PlayScene, FightScene],
};

const game = new Phaser.Game(config);
