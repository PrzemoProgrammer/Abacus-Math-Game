class Dino extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, type) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.type = type;

    this.startXPosition = this.x;

    scene.add.existing(this);

    this.setOrigin(0, 1);

    this.addHealthBar();

    if (this.type === "player") {
      this.flipX = true;
    }
    this.play(this.sprite + "-idle");
  }

  walk(entity) {
    let x = null;
    if (this.flipX) {
      x = entity.x - this.width + 400;
    } else {
      x = entity.x + entity.displayWidth - 400;
    }

    this.setDepth(1000);

    this.play(this.sprite + "-walk");

    this.scene.tweens.add({
      targets: this,
      x: x,
      duration: 1000,
      onComplete: () => {
        this.play(this.sprite + "-attack")
          .on("animationupdate", (anim, frame) => {
            if (frame.index === 13) {
              this.scene.hitAudio.play();
              entity.getDamage(100);
              this.off("animationupdate");
            }
          })
          .once("animationcomplete", () => {
            this.moveBack(this.startXPosition);
          });
      },
    });
  }

  moveBack(x) {
    this.setFlipX();

    this.play(this.sprite + "-walk");

    this.scene.tweens.add({
      targets: this,
      x: x,
      duration: 1000,
      onComplete: () => {
        this.setFlipX();
        this.play(this.sprite + "-idle");
      },
    });
  }

  attack(entity) {
    this.walk(entity);
  }

  setFlipX() {
    if (this.flipX) {
      return (this.flipX = false);
    } else {
      return (this.flipX = true);
    }
  }

  getDamage(damage) {
    if (this.isDead()) {
      if (this.type === "player") {
        this.scene.addPopupScreen("lost");
      } else {
        this.scene.addPopupScreen("win");
      }
      return;
    }
    this.healthBar.health -= damage;
    this.healthBar.getHealBarWidth();
  }

  addHealthBar() {
    this.healthBar = new HealthBar(this.scene, this.x, this.y + 160, 1000);
  }

  isDead() {
    return this.healthBar.health <= 0;
  }
}
