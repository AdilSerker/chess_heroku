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
const material_1 = require("../Config/material");
const types_1 = require("../Board/types");
const Coordinates_1 = require("../../chess/types/Coordinates");
const counter = 0;
class Queen extends Piece_1.Piece {
    initMesh() {
        const x = types_1.array[this.coordinate_.num];
        const z = types_1.array[Coordinates_1.KeyIndex[this.coordinate_.char]];
        const QueenMesh = Queen.meshQueen.clone(true);
        QueenMesh.traverse(function (child) {
            if (child instanceof three.Mesh) {
                child.material = material_1.material(this.color_);
            }
        }.bind(this));
        QueenMesh.scale.set(100, 100, 100);
        QueenMesh.position.set(x * 100 - 50, 50, z * 100 - 57);
        QueenMesh.name = `${this.id}`;
        QueenMesh.type = 'Piece';
        QueenMesh.children[0].castShadow = true;
        QueenMesh.children[0].receiveShadow = true;
        return this.mesh_ = QueenMesh;
    }
    static getGeometry() {
        return __awaiter(this, void 0, void 0, function* () {
            const loader = new three.OBJLoader();
            return yield new Promise((resolve) => {
                loader.load('obj/QueenLight.obj', (object) => {
                    Queen.meshQueen = object;
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
Queen.meshQueen = null;
exports.Queen = Queen;
//# sourceMappingURL=Queen.js.map