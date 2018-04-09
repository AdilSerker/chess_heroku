"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
exports.material = (bool) => {
    return new three.MeshStandardMaterial({
        map: null,
        bumpScale: -0.05,
        metalness: bool ? 0.2 : 0.5,
        roughness: bool ? 0 : 0.5,
        color: bool ? 0xffffff : 0x222222,
        wireframe: false,
        side: three.DoubleSide
    });
};
//# sourceMappingURL=material.js.map