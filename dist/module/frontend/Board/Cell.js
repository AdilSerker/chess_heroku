"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const types_1 = require("./types");
class Cell {
    constructor(x, z, bool, type) {
        this.id_ = ++Cell.counter;
        const geometry = new three.BoxBufferGeometry(200, 50, 200);
        const material = new three.MeshPhongMaterial({
            color: bool ? 0xaaaaaa : 0x000000,
            side: three.DoubleSide,
            wireframe: false
        });
        this.color_ = bool;
        this.cell_ = new three.Mesh(geometry, material);
        this.cell_.receiveShadow = true;
        this.cell_.position.y = 20;
        this.cell_.name = `${this.id_}`;
        this.cell_.position.x = x * 100;
        this.cell_.position.z = z * 100;
        this.cell_.type = 'Cell';
        if (type) {
            this.cell_.type = type;
        }
        this.coordinate_ = {
            char: types_1.charRow[z.toString()],
            num: types_1.numberColumn[x.toString()]
        };
    }
    get id() {
        return this.id_;
    }
    getCell() {
        return this.cell_;
    }
    get coordinate() {
        return Object.assign({}, this.coordinate_);
    }
    set color(bool) {
        this.color_ = bool;
    }
}
Cell.counter = 0;
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map