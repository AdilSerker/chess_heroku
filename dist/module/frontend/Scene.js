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
const Chess_1 = require("./Chess");
const main_1 = require("./main");
const main_2 = require("./main");
require('./lib/Projector');
const TrackballControls = require('./lib/TrackballControl');
const CAST_SHADOW = false;
const ANTIALIAS = true;
class ChessScene {
    constructor() {
        this.tumblerLight = false;
        this.lightVec = new three_1.Vector2();
        this.oldLightPos = new three_1.Vector2();
        this.newLightPos = new three_1.Vector2();
        this.f = 0;
        this.s = Math.PI / 180;
        this.initialized = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initScene();
            yield this.initChess();
            this.setRender();
        });
    }
    initVision() {
        this.initCamera();
        this.initLight();
        this.initControl();
        this.initialized = true;
    }
    renderLoop() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.render();
    }
    resizeWindow(event) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls.handleResize();
        this.updateCamera();
    }
    onDocumentMouseDown(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // event.preventDefault();
            this.mouse = new three_1.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
            this.interface(event);
            if (!main_2.MENU) {
                yield this.raycast();
            }
        });
    }
    interface(event) {
        /* tslint:disable */
        if (event.path[0].offsetParent.id === 'urlBox') {
            const url = event.path[0];
            let range = document.createRange();
            range.selectNode(url);
            window.getSelection().addRange(range);
            try {
                document.execCommand('copy');
                this.notify('copy to clipboard');
            }
            catch (err) {
                console.log('Can`t copy, boss');
            }
            window.getSelection().removeAllRanges();
        }
        if (event.path[0].offsetParent.id === 'shift') {
            main_1.socket.emit('change_pawn', event.path[0].id);
            this.chess.clearShiftPawn();
            this.chess.changePawn = false;
        }
        /* tslint:enable */
    }
    notify(text) {
        let notify = document.getElementById('notify');
        if (!notify) {
            notify = document.createElement('div');
            notify.id = 'notify';
        }
        const message = document.createElement('span');
        message.id = 'message';
        notify.innerHTML = '';
        message.innerText = text;
        notify.appendChild(message);
        document.body.appendChild(notify);
        setTimeout(() => {
            message.style.opacity = '0';
        }, 3000);
        message.addEventListener('transitionend', () => {
            notify.innerHTML = '';
        });
    }
    onUpdate(pieces) {
        this.chess.updateState(pieces);
    }
    onStaticUpdate(pieces) {
        this.chess.staticUpdateState(pieces);
    }
    render() {
        const dt = this.clock.getDelta();
        if (this.initialized) {
            this.update(dt);
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        }
    }
    updatePositionLight(intersects) {
        const vec = intersects[0].object.position.x === 0 ?
            intersects[0].object.parent.position :
            intersects[0].object.position;
        const newPos = this.get2Vector(vec);
        this.newLightPos = newPos;
        const currentPos = this.get2Vector(this.light.position);
        this.oldLightPos = currentPos;
        const vector = new three.Vector2().subVectors(newPos, currentPos);
        const normalVector = new three.Vector2()
            .subVectors(newPos, currentPos)
            .clone()
            .normalize();
        this.lightVec = normalVector.multiplyScalar(vector.length());
    }
    get2Vector(vector) {
        const { x, z } = vector;
        return new three.Vector2(x, z);
    }
    update(dt) {
        this.light.position.x += this.lightVec.x * 2 * dt;
        this.light.position.z += this.lightVec.y * 2 * dt;
        const currentPos = this.get2Vector(this.light.position);
        const subVec = new three_1.Vector2().subVectors(currentPos, this.oldLightPos);
        if (subVec.length() > this.lightVec.length()) {
            this.light.position.x = this.newLightPos.x;
            this.light.position.z = this.newLightPos.y;
            this.lightVec = new three_1.Vector2();
        }
        this.chess.update(dt);
        if (this.tumblerLight) {
            if (this.directionLight.intensity < 1.2) {
                this.directionLight.intensity += dt;
            }
            else if (this.light.intensity < 1) {
                this.light.intensity += dt;
            }
        }
        const { x, y, z } = this.camera.position;
        this.directionLight.position.set(x, y, z);
    }
    raycast() {
        return __awaiter(this, void 0, void 0, function* () {
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
            if (intersects.length) {
                this.updatePositionLight(intersects);
            }
            else {
                this.light.position.setX(0);
                this.light.position.setZ(0);
            }
            if (intersects[0] && this.chess.playerColor === this.chess.queue) {
                if (!this.chess.changePawn) {
                    if (intersects[0].object.parent.type === 'Piece') {
                        const pieceId = Number(intersects[0].object.parent.name);
                        yield this.chess.choisePiece(pieceId);
                    }
                    else if (intersects[0].object.type === 'Cell') {
                        const cellId = +intersects[0].object.name;
                        if (this.chess.legalMove && this.chess.legalMove.length) {
                            yield this.chess.move(cellId);
                        }
                        else {
                            yield this.chess.choiceCell(cellId);
                        }
                    }
                }
            }
        });
    }
    initControl() {
        this.projector = new three_1.Projector();
        this.raycaster = new three_1.Raycaster();
    }
    initChess() {
        return __awaiter(this, void 0, void 0, function* () {
            this.chess = new Chess_1.Chess();
            const chessState = yield this.chess.initState();
            this.scene.add(chessState);
        });
    }
    setRender() {
        const container = document.createElement('div');
        document.body.appendChild(container);
        this.renderer = new three.WebGLRenderer({ antialias: ANTIALIAS });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
    }
    initLight() {
        this.directionLight = new three.DirectionalLight(0xffffff, 0);
        this.light = new three.SpotLight(0xffffee, 0, 0, Math.PI);
        this.light.position.set(0, 100, 0);
        this.scene.add(this.light, this.directionLight);
    }
    initCamera() {
        this.camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
        this.controls = new three.TrackballControls(this.camera);
        this.controls.noRoll = true;
        this.controls.maxDistance = 6000;
        this.controls.minDistance = 2000;
        this.controls.noRoll = true;
        this.controls.noPan = true;
        if (this.chess.playerColor) {
            this.controls.position0.set(-3260, 2300, -50);
        }
        else {
            this.controls.position0.set(3260, 2300, -50);
        }
        this.controls.target.set(0, 0, 0);
    }
    resetCamera() {
        this.controls.reset();
        this.updateCamera();
    }
    updateCamera() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.lookAt(new three.Vector3());
        this.camera.updateProjectionMatrix();
    }
    initScene() {
        this.scene = new three.Scene();
        this.scene.background = new three.Color(0x000000);
        this.clock = new three.Clock();
    }
}
exports.ChessScene = ChessScene;
//# sourceMappingURL=Scene.js.map