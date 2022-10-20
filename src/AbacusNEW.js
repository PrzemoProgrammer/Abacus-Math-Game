class AbacusNEW {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.beads = [];

    this.bead = {
      maxRows: 5,
      maxColumns: 17,
      marginX: -12,
      marginY: 5,
      slotWeight: 75,
      slotHeight: 40,
      gridSpacingX: 30,
      gridSpacingY: 20,
      headSpace: 50,
    };

    this.isMoved = false;

    this.addBeads();
  }

  addBead(x, y) {
    const bead = new Bead(this.scene, x, y, this.sprite);
    this.beads.push(bead);
    bead.onClick(() => {
      this.beadIndex = this.beads.indexOf(bead);

      if (this.beadIndex % 5 === 0) {
        this.beads[this.beadIndex].move();
      } else
        for (let i = 0; i <= 4; i++) {
          if (this.beadIndex === i) {
            if (!this.beads[i].isMoved) {
              for (let j = 1; j <= i; j++) {
                if (!this.beads[j].isMoved) this.beads[j].move();
              }
            } else if (this.beads[i].isMoved) {
              for (let j = i; j <= 4; j++) {
                if (this.beads[j].isMoved) this.beads[j].move();
              }
            }
          }
        }

      for (let i = 6; i <= 9; i++) {
        if (this.beadIndex === i) {
          if (!this.beads[i].isMoved) {
            for (let j = 6; j <= i; j++) {
              if (!this.beads[j].isMoved) this.beads[j].move();
            }
          } else if (this.beads[i].isMoved) {
            for (let j = i; j <= 9; j++) {
              if (this.beads[j].isMoved) this.beads[j].move();
            }
          }
        }
      }

      for (let i = 11; i <= 14; i++) {
        if (this.beadIndex === i) {
          if (!this.beads[i].isMoved) {
            for (let j = 11; j <= i; j++) {
              if (!this.beads[j].isMoved) this.beads[j].move();
            }
          } else if (this.beads[i].isMoved) {
            for (let j = i; j <= 14; j++) {
              if (this.beads[j].isMoved) this.beads[j].move();
            }
          }
        }
      }

      for (let i = 16; i <= 19; i++) {
        if (this.beadIndex === i) {
          if (!this.beads[i].isMoved) {
            for (let j = 16; j <= i; j++) {
              if (!this.beads[j].isMoved) this.beads[j].move();
            }
          } else if (this.beads[i].isMoved) {
            for (let j = i; j <= 19; j++) {
              if (this.beads[j].isMoved) this.beads[j].move();
            }
          }
        }
      }

      //   for (let i = 1; i <= 4; i++) {
      //     // if (i / 5 === 0) {
      //     //   this.beads[i].move();
      //     // }

      //     if (this.beadIndex === i) {
      //       if (!this.beads[i].isMoved) {
      //         for (let j = 1; j <= i; j++) {
      //           if (!this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       } else if (this.beads[i].isMoved) {
      //         for (let j = i; j <= 4; j++) {
      //           if (this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       }
      //     }
      //   }

      //   for (let i = 6; i <= 9; i++) {
      //     if (this.beadIndex === i) {
      //       if (!this.beads[i].isMoved) {
      //         for (let j = 6; j <= i; j++) {
      //           if (!this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       } else if (this.beads[i].isMoved) {
      //         for (let j = i; j <= 9; j++) {
      //           if (this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       }
      //     }
      //   }

      //   for (let i = 11; i <= 14; i++) {
      //     if (this.beadIndex === i) {
      //       if (!this.beads[i].isMoved) {
      //         for (let j = 11; j <= i; j++) {
      //           if (!this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       } else if (this.beads[i].isMoved) {
      //         for (let j = i; j <= 14; j++) {
      //           if (this.beads[j].isMoved) this.beads[j].move();
      //         }
      //       }
      //     }
      //   }

      //   if (this.beadIndex === 0) {
      //     if (!this.beads[0].isMoved) {
      //       for (let i = 0; i <= 0; i++) {
      //         if (!this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     } else if (this.beads[0].isMoved) {
      //       for (let i = 0; i <= 0; i++) {
      //         if (this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     }
      //   }

      //   if (this.beadIndex === 1) {
      //     if (!this.beads[1].isMoved) {
      //       for (let i = 1; i <= 1; i++) {
      //         if (!this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     } else if (this.beads[1].isMoved) {
      //       for (let i = 1; i <= 4; i++) {
      //         if (this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     }
      //   }

      //   if (this.beadIndex === 2) {
      //     if (!this.beads[2].isMoved) {
      //       for (let i = 1; i <= 2; i++) {
      //         if (!this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     } else if (this.beads[2].isMoved) {
      //       for (let i = 2; i <= 4; i++) {
      //         if (this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     }
      //   }

      //   if (this.beadIndex === 3) {
      //     if (!this.beads[3].isMoved) {
      //       for (let i = 1; i <= 3; i++) {
      //         if (!this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     } else if (this.beads[3].isMoved) {
      //       for (let i = 3; i <= 4; i++) {
      //         if (this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     }
      //   }

      //   if (this.beadIndex === 4) {
      //     if (!this.beads[4].isMoved) {
      //       for (let i = 1; i <= 4; i++) {
      //         if (!this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     } else if (this.beads[4].isMoved) {
      //       for (let i = 4; i <= 4; i++) {
      //         if (this.beads[i].isMoved) this.beads[i].move();
      //       }
      //     }
      //   }

      console.log(this.beadIndex);
    });

    // bead.onClick(this, bead);
  }

  addBeads() {
    for (let i = 0; i < this.bead.maxColumns; i++) {
      for (let j = 0; j < this.bead.maxRows; j++) {
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

        this.addBead(x, y);
      }
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
      //   this.move(scene, bead);
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

  //   move(scene, bead) {
  //     console.log(bead);
  //     this.beadIndex = scene.beads.indexOf(bead);
  //     console.log(this.beadIndex);

  //     if (this.beadIndex === 2) {
  //       for (let i = 1; i <= 2; i++) {
  //         scene.beads[1].move();
  //         scene.beads[2].move();
  //       }
  //     }

  //     if (!this.isMoved) {
  //       this.isMoved = true;
  //       this.y = this.y - this.displayHeight;
  //     } else {
  //       this.isMoved = false;
  //       this.y = this.y + this.displayHeight;
  //     }
  //   }
}
