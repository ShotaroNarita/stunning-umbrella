import * as BABYLON from 'babylonjs'

import { Manipulator } from './manipulator';
import { WorldAxis } from '../worldaxis';

const canvas = <HTMLCanvasElement>document.getElementById('maincanvas');
const engine = new BABYLON.Engine(canvas, true);

const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -1000), scene);
camera.setTarget(BABYLON.Vector3.Zero());
camera.attachControl(canvas, true);

// const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-500, 500, -500), scene);
const light2 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-500, -500, -500), scene);

const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene);
const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseColor = BABYLON.Color3.Green();
// groundMat.diffuseColor = new BABYLON.Color3(0, 0.2, 0);
ground.material = groundMat;

const manip = new Manipulator();
manip.locate(scene);

const axis = new WorldAxis(200);
axis.locate(scene);

// let x = 60;
// let dx = 1;

engine.runRenderLoop(function () {
    manip.rotate(Math.PI / 1000, Math.PI / 50);
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});