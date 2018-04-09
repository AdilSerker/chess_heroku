"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const Scene_1 = require("./Scene");
exports.socket = io();
exports.id = Number(window.location.pathname.split('/')[2]);
const name = `player${Math.random().toString().slice(2, 8)}`;
let click = false;
exports.MENU = exports.id ? false : true;
const scene = new Scene_1.ChessScene();
const urlElement = document.createElement('span');
urlElement.id = 'url';
const url = `${window.location.host}${window.location.pathname}`;
urlElement.innerText = exports.id ? url : '';
const urlDiv = document.createElement('div');
urlDiv.id = 'urlBox';
urlDiv.appendChild(urlElement);
document.body.appendChild(urlDiv);
urlElement.addEventListener('transitionend', () => {
    urlDiv.innerHTML = '';
});
window.addEventListener('resize', scene.resizeWindow.bind(scene), false);
document.addEventListener('mousedown', () => {
    click = true;
});
document.addEventListener('mouseup', (event) => {
    if (click)
        scene.onDocumentMouseDown(event);
});
document.addEventListener('mousemove', (event) => {
    click = false;
});
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'r') {
        scene.resetCamera();
    }
});
scene.init().then(() => {
    exports.socket.emit('loaded', exports.id);
});
exports.socket.on('update', (data) => {
    const { pieces, queue } = data;
    scene.onUpdate(pieces);
    scene.chess.queue = queue;
});
exports.socket.on('notify', (data) => {
    scene.notify(data);
});
exports.socket.on('static_update', (data) => {
    const { pieces, queue } = data;
    scene.onStaticUpdate(pieces);
    scene.chess.queue = queue;
});
exports.socket.on('initial_pieces', (data) => {
    const { pieces, queue } = data;
    scene.chess.queue = queue;
    scene.chess.initPieces(pieces);
    scene.tumblerLight = true;
    if (scene.chess.changePawn) {
        scene.chess.initShiftPawn();
    }
    urlElement.style.opacity = '0';
});
exports.socket.on('is_change_pawn', (data) => {
    scene.chess.changePawn = data;
    scene.chess.initShiftPawn();
});
exports.socket.on('player', (color) => {
    scene.chess.playerColor = color;
    scene.initVision();
    scene.resetCamera();
});
exports.socket.on('tooMany', (data) => {
    if (data.boolean) {
        console.log('fail');
    }
});
exports.socket.on('legal move', (data) => {
    scene.chess.legalMove = data.legalMove;
});
scene.renderLoop();
//# sourceMappingURL=main.js.map