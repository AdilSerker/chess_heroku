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
class Pawn extends Piece_1.Piece {
    initMesh() {
        const x = types_1.array[this.coordinate_.num];
        const z = types_1.array[Coordinates_1.KeyIndex[this.coordinate_.char]];
        const pawnMesh = Pawn.meshPawn.clone(true);
        pawnMesh.traverse(function (child) {
            if (child instanceof three.Mesh) {
                child.material = material_1.material(this.color_);
            }
        }.bind(this));
        pawnMesh.scale.set(100, 100, 100);
        pawnMesh.position.set(x * 100 - 50, 50, z * 100 - 57);
        pawnMesh.name = `${this.id}`;
        pawnMesh.type = 'Piece';
        pawnMesh.children[0].castShadow = true;
        pawnMesh.children[0].receiveShadow = true;
        this.mesh_ = pawnMesh;
        return pawnMesh;
    }
    static getGeometry() {
        return __awaiter(this, void 0, void 0, function* () {
            const loader = new three.OBJLoader();
            return yield new Promise((resolve) => {
                loader.load('obj/PawnLight.obj', (object) => {
                    Pawn.meshPawn = object;
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
Pawn.meshPawn = null;
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map