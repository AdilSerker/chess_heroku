"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const three_1 = require("three");
const Cell_1 = require("./Cell");
const types_1 = require("./types");
class Board {
    constructor() {
        this.cells_ = [];
        let isWhiteCell = true;
        for (let x = 1; x <= 8; x++) {
            isWhiteCell = !isWhiteCell;
            for (let z = 1; z <= 8; z++) {
                this.cells_.push(new Cell_1.Cell(types_1.array[x], types_1.array[z], isWhiteCell));
                isWhiteCell = !isWhiteCell;
            }
        }
    }
    static getFont() {
        return __awaiter(this, void 0, void 0, function* () {
            const loader = new three.FontLoader();
            return yield new Promise((resolve) => {
                loader.load('fonts/MontserratExtraLight_Regular.json', function (font) {
                    Board.font = font;
                    resolve(font);
                }, (xhr) => {
                    if (xhr.lengthComputable) {
                        const percentComplete = xhr.loaded / xhr.total * 100;
                        // console.log( Math.round(percentComplete) + '% downloaded' );
                    }
                }, (err) => { });
            });
        });
    }
    getBoard() {
        return __awaiter(this, void 0, void 0, function* () {
            this._initField();
            yield this._initSymbols();
            const group = new three.Group();
            group.add(this.field_);
            for (const item of this.cells_) {
                group.add(item.getCell());
            }
            group.add(this.charRow_);
            group.add(this.columnNum_);
            return group;
        });
    }
    getCellById(id) {
        const cell = this.cells_.filter((item) => {
            return item.id === id;
        })[0];
        return cell.coordinate;
    }
    _initField() {
        const geometry = new three.BoxBufferGeometry(1800, 100, 1800);
        const material = new three.MeshStandardMaterial({
            map: null,
            bumpScale: -0.05,
            color: 0x444444,
            metalness: 1,
            roughness: 0,
        });
        this.field_ = new three.Mesh(geometry, material);
        this.field_.position.y = -10;
        this.field_.receiveShadow = true;
    }
    _initSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
            this.charRow_ = new three.Group();
            this.columnNum_ = new three.Group();
            const chars = 'A B C D E F G H';
            const nums = '1 2 3 4 5 6 7 8';
            const SYMBOLS = chars.split(' ');
            const NUMBERS = nums.split(' ');
            const textMaterial = new three.MeshStandardMaterial({ color: 0x808080 });
            for (let i = 0; i < 8; ++i) {
                const z = types_1.array[i + 1];
                const geometry = new three.TextGeometry(SYMBOLS[i], {
                    font: Board.font,
                    size: 50,
                    height: 15,
                    curveSegments: 12,
                    bevelThickness: 2,
                    bevelSize: 1,
                    bevelEnabled: true
                });
                const mesh = new three_1.Mesh(geometry, textMaterial);
                mesh.position.set(-880, 30, z * 100 - 20);
                mesh.rotation.z = -Math.PI * 0.5;
                mesh.rotation.x = -Math.PI * 0.5;
                mesh.name = SYMBOLS[i];
                mesh.type = 'Symbols';
                this.charRow_.add(mesh);
                const mesh1 = new three_1.Mesh(geometry, textMaterial);
                mesh1.position.set(880, 30, z * 100 + 20);
                mesh1.rotation.z = Math.PI * 0.5;
                mesh1.rotation.x = -Math.PI * 0.5;
                this.charRow_.add(mesh1);
            }
            for (let j = 0; j < 8; j++) {
                const x = types_1.array[j + 1];
                const geometry = new three.TextGeometry(NUMBERS[j], {
                    font: Board.font,
                    size: 50,
                    height: 15,
                    curveSegments: 12,
                    bevelThickness: 2,
                    bevelSize: 1,
                    bevelEnabled: true
                });
                const mesh = new three_1.Mesh(geometry, textMaterial);
                mesh.position.set(x * 100 - 30, 30, -870);
                mesh.rotation.z = -Math.PI * 0.5;
                mesh.rotation.x = -Math.PI * 0.5;
                mesh.name = NUMBERS[j];
                mesh.type = 'Symbols';
                this.columnNum_.add(mesh);
                const mesh1 = new three_1.Mesh(geometry, textMaterial);
                mesh1.position.set(x * 100 + 25, 30, 870);
                mesh1.rotation.z = Math.PI * 0.5;
                mesh1.rotation.x = -Math.PI * 0.5;
                this.columnNum_.add(mesh1);
            }
        });
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map