class HandleInputs {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyENTER = scene.input.keyboard.addKey("ENTER");

    this.init();
  }

  init() {
    this.initAttackKeys();
  }

  initAttackKeys() {
    this.keyENTER.on("down", () => {
      this.scene.getCheck();
      console.log(1);
    });
  }
}
