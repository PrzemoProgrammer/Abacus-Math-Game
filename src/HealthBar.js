class HealthBar {
  constructor(scene, x, y, maxHealth) {
    this.scene = scene;

    this.x = x;
    this.y = y;

    this.maxHealth = maxHealth;
    this.health = this.maxHealth;

    this.healthBarContainer = this.scene.add
      .sprite(this.x + 80, this.y - 500, "healthBarContainer")
      .setOrigin(0, 0);
    this.energybar = this.scene.add
      .sprite(this.x + 80, this.y - 500, "healthBar")
      .setOrigin(0, 0);

    this.energyBarWidth = this.energybar.displayWidth;
  }

  getHealBarWidth() {
    let hpPercent = this.health / this.maxHealth;
    this.energybar.displayWidth = this.energybar.displayWidth * hpPercent;
  }

  restart() {
    this.health = this.maxHealth;
    this.energybar.displayWidth = this.energyBarWidth;
  }
}
