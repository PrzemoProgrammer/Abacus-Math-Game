class UIElement {
  constructor(x, y, width, height, type, ref, subref, slotType) {
    this.x = x;
    this.y = y;
    this.x2 = x + width;
    this.y2 = y + height;
    this.type = type; // 0 = node, 1 = slot, 2 connection
    this.ref = ref;
  }
}

class Bead {
  constructor() {
    this.position = [0.0, 0.0];
    this.value = 0;
    this.active = false;
    this.uniqueID = -1;
  }
}

class AbacusCtrl {
  constructor(type) {
    this.type = type;
    this.beadLines = 8;
    this.beadPerLine = this.type == 0 ? 5 : 7;
    this.beadSep = this.type == 0 ? 3 : 4;
    this.beadHeight = 110;
    this.beadSpacing = 150;
    this.beadWidth = 100;
    this.nodes = [];

    this.init();
  }

  init() {
    this.nodes.length = 0;
    this.id = 0;
    for (let i = 0; i < this.beadLines; i++) {
      for (let j = 0; j < this.beadPerLine; j++) {
        let bead = new Bead();
        bead.position[0] = 580 - i * this.beadSpacing;
        bead.position[1] =
          60 + this.beadPerLine * this.beadHeight - j * this.beadHeight;
        bead.value = 1;
        if (j > this.beadSep) {
          bead.position[1] =
            135 +
            this.beadPerLine * this.beadHeight -
            (j * this.beadHeight + 2 * this.beadHeight);
          bead.value = 5;
        }
        bead.uniqueID = this.id;
        this.nodes.push(bead);
        this.id++;
      }
    }
  }

  getBeadsCount() {
    return this.nodes.length;
  }

  getBeadPositionX(nodeId) {
    return this.nodes[nodeId].position[0];
  }

  getBeadPositionY(nodeId) {
    return this.nodes[nodeId].position[1];
  }

  activated(nodeId) {
    this.line = Math.floor(nodeId / this.beadPerLine);
    this.beadInLine = nodeId - this.line * this.beadPerLine;

    this.active = this.nodes[nodeId].active;
    this.nodes[nodeId].active = !this.active;

    let dir = 1;

    if (this.beadInLine > this.beadSep) dir = -1;

    this.offset = dir * -1 * this.beadHeight;
    if (this.active) this.offset = dir * this.beadHeight;
    this.nodes[nodeId].position[1] += this.offset;

    if (this.beadInLine <= this.beadSep) {
      for (let j = 0; j < this.beadPerLine; j++) {
        let n = this.line * this.beadPerLine + j;
        if (j <= this.beadSep && j !== this.beadInLine) {
          if (
            (!this.active && j > this.beadInLine) ||
            (this.active && j < this.beadInLine)
          ) {
            if (this.nodes[n].active === this.active) {
              this.nodes[n].position[1] += this.offset;
              this.nodes[n].active = !this.nodes[n].active;
            }
          }
        }
      }
    } else {
      for (let j = 0; j < this.beadPerLine; j++) {
        let n = this.line * this.beadPerLine + j;
        if (j > this.beadSep && j !== this.beadInLine) {
          if (
            (!this.active && j < this.beadInLine) ||
            (this.active && j > this.beadInLine)
          ) {
            if (this.nodes[n].active === this.active) {
              this.nodes[n].position[1] += this.offset;
              this.nodes[n].active = !this.nodes[n].active;
            }
          }
        }
      }
    }
  }
}

class BeadSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
    this.setInteractive();
  }

  onClick(cb) {
    this.on("pointerdown", (pointer) => {
      cb(pointer);
    });
  }
}

class Abacus {
  constructor(scene, parentDivId, type) {
    this.scene = scene;
    this.parentDivId = parentDivId;
    this.type = type;

    this.abacusCtrl = new AbacusCtrl(this.type);
    this.divId = this.parentDivId;
    this.hooveredElement = -1;
    this.hooveredBead = -1;
    this.uiElements = new Array();
    this.that = this;

    this.drawBeads();
  }

  drawBead(nodeId) {
    let nodePosX = this.abacusCtrl.getBeadPositionX(nodeId);
    let nodePosY = this.abacusCtrl.getBeadPositionY(nodeId);

    let dn = new UIElement(
      nodePosX,
      nodePosY + 2,
      this.abacusCtrl.beadWidth,
      this.abacusCtrl.beadHeight - 4,
      0,
      nodeId,
      0,
      0
    );
    const column = Math.floor(nodeId / 5) + 1;
    let bead = new BeadSprite(
      this.scene,
      dn.x + 940,
      dn.y + 360,
      "skin" + column
    );

    bead.onClick((pointer) => {
      this.mouseDown(pointer, bead);
      this.drawBeads();
      // console.log(pointer);
      console.log(1);
    });

    this.uiElements.push(dn);
  }

  drawBeads() {
    let count = this.abacusCtrl.getBeadsCount();

    for (var i = 0; i < count; i++) {
      this.drawBead(i);
    }
  }

  // drawBeadLines() {
  //   this.bead = this.scene.add.image(dn.x + 900, dn.y + 550, "bead");
  // }

  mouseOverElement(pos) {
    this.selectedElement = -1;

    for (let n in this.uiElements) {
      if (this.uiElements[n].type !== 2) {
        // not of type "connection"
        // console.log(this.uiElements[n].x - 1);
        // console.log(pos.x);

        if (
          this.uiElements[n].x - 1 < pos.x &&
          this.uiElements[n].x2 + 1 > pos.x &&
          this.uiElements[n].y - 1 < pos.y &&
          this.uiElements[n].y2 + 1 > pos.y
        ) {
          console.log(111111111111111111);
          this.selectedElement = n;
        }
      }
    }
    return this.selectedElement;
  }

  mouseDown(pointer) {
    let selectedElement = this.mouseOverElement(pointer);
    console.log(selectedElement);
    console.log(this.uiElements[selectedElement]);

    if (this.uiElements[selectedElement].type === 0) {
      let newSelectedBead = this.uiElements[selectedElement].ref;
      this.abacusCtrl.activated(newSelectedBead);
    }
  }
}

// class AbacusCtrl {
//   constructor(type) {
//     this.type = type;
//     this.beadLines = 8;
//     this.beadPerLine = this.type == 0 ? 5 : 7;
//     this.beadSep = this.type == 0 ? 3 : 4;
//     this.beadHeight = 75;
//     this.beadSpacing = 140;
//     this.beadWidth = 140;
//     this.nodes = [];

//     this.init();
//   }

// let bead = new BeadSprite(this.scene, dn.x + 900, dn.y + 550, "bead");
