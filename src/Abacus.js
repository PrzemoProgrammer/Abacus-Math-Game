class Abacus {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.beads = [];
    this.decimalPoints = [];

    this.bead = {
      maxRows: 5,
      maxColumns: 17,
      marginX: -12,
      marginY: 5,
      slotWeight: 94,
      slotHeight: 81,
      gridSpacingX: 40,
      gridSpacingY: 35,
      headSpace: 128,
    };

    this.isMoved = false;
    this.addFrame();
    this.addDecimalPoints();
    this.addBeads();
  }

  setBeadClickable(bead) {
    const beadColumn = bead.column;
    const beadRow = bead.row;

    bead.onClick(() => {
      this.shootBall(bead);
      this.scene.throwBallAudio.play();
      this.scene.time.delayedCall(200, () => {
        if (beadRow % 5 === 0) {
          this.beads[beadColumn][beadRow].move();
        } else
          for (let i = 0; i <= 4; i++) {
            if (beadRow === i) {
              if (!this.beads[beadColumn][i].isMoved) {
                for (let j = 1; j <= i; j++) {
                  if (!this.beads[beadColumn][j].isMoved)
                    this.beads[beadColumn][j].move();
                }
              } else if (this.beads[beadColumn][i].isMoved) {
                for (let j = i; j <= 4; j++) {
                  if (this.beads[beadColumn][j].isMoved)
                    this.beads[beadColumn][j].move();
                }
              }
            }
          }
      });
    });
  }

  addBeads() {
    for (let i = 0; i < this.bead.maxColumns; i++) {
      this.beads[i] = [];
      for (let j = 0; j < this.bead.maxRows; j++) {
        this.beads[i][j] = [];
        let x =
          this.x +
          this.bead.marginX +
          this.bead.slotWeight / 2 +
          i * (this.bead.slotWeight / 2 + this.bead.gridSpacingX);
        let y =
          this.y +
          this.bead.marginY +
          this.bead.slotHeight / 2 +
          j * (this.bead.slotHeight / 2 + this.bead.gridSpacingY);

        if (j / 5 === 0) {
          y = y - this.bead.headSpace;
        }
        const bead = new Bead(this.scene, x, y, this.sprite);
        this.beads[i][j] = bead;
        bead.column = i;
        bead.row = j;
        this.setBeadClickable(bead);
        if (bead.row % 5 === 0) {
          bead.move();
        }
      }
    }
  }

  addFrame() {
    this.frame = this.scene.add
      .image(this.x - 60, this.y - 248, "abacusFrame")
      .setOrigin(0, 0);
  }

  shootBall(bead) {
    let y = bead.isMoved ? 0 : this.y + 560;

    this.ball = new Ball(
      this.scene,
      this.frame.x + this.frame.displayWidth / 2,
      y
    );

    this.ball.shoot(bead);
  }

  destroy() {
    for (let i = 0; i < this.bead.maxColumns; i++) {
      for (let j = 0; j < this.bead.maxRows; j++) {
        this.beads[i][j].destroy();
      }
    }
    this.decimalPoints.forEach((point) => point.destroy());
    this.frame.destroy();
  }

  addDecimalPoint(i) {
    let decimalPoint = new Point(
      this.scene,
      (this.frame.x + 90) * i + 440,
      this.frame.y + 220,
      "decimalPoint"
    );
    decimalPoint.moveable();
    this.decimalPoints.push(decimalPoint);
  }

  addDecimalPoints() {
    for (let i = 0; i <= 0; i++) {
      this.addDecimalPoint(i);
    }
  }
}

class Bead extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
    this.setInteractive();

    this.isMoved = false;
  }

  onClick(cb) {
    this.on("pointerdown", (pointer) => {
      cb();
    });
  }

  move() {
    if (!this.isMoved) {
      this.isMoved = true;
      this.y = this.y - this.displayHeight;
    } else {
      this.isMoved = false;
      this.y = this.y + this.displayHeight;
    }
  }
}

class Point extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
    this.setInteractive();
  }

  moveable() {
    this.scene.input.setDraggable(this);
    this.scene.input.on("drag", function (pointer, gameObject, dragX) {
      gameObject.x = dragX;
    });
  }
}
