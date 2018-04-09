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
require('../lib/OBJLoader');
const Piece_1 = require("./Piece");
const types_1 = require("../Board/types");
const Coordinates_1 = require("../../chess/types/Coordinates");
const material_1 = require("../Config/material");
class Rook extends Piece_1.Piece {
    initMesh() {
        const x = types_1.array[this.coordinate_.num];
        const z = types_1.array[Coordinates_1.KeyIndex[this.coordinate_.char]];
        const rookMesh = Rook.meshRook.clone(true);
        rookMesh.traverse(function (child) {
            if (child instanceof three.Mesh) {
                child.material = material_1.material(this.color_);
            }
        }.bind(this));
        rookMesh.scale.set(100, 100, 100);
        rookMesh.position.set(x * 100 - 50, 50, z * 100 - 57);
        rookMesh.name = `${this.id}`;
        rookMesh.type = 'Piece';
        rookMesh.children[0].castShadow = true;
        rookMesh.children[0].receiveShadow = true;
        return this.mesh_ = rookMesh;
    }
    static getGeometry() {
        return __awaiter(this, void 0, void 0, function* () {
            const loader = new three.OBJLoader();
            return yield new Promise((resolve) => {
                loader.load('obj/RookLight.obj', (object) => {
                    Rook.meshRook = object;
                    resolve(object);
                }, (xhr) => {
                    if (xhr.lengthComputable) {
                        const percentComplete = xhr.loaded / xhr.total * 100;
                        // console.log( Math.round(percentComplete) + '% downloaded' );
                    }
                }, (err) => { });
            });
        });
    }
    getPiece() {
        return this.mesh_;
    }
}
Rook.meshRook = null;
exports.Rook = Rook;
//# sourceMappingURL=Rook.js.map