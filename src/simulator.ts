import * as BABYLON from 'babylonjs'
import { Manipulator } from './manipulator';
import { WorldAxis } from '../worldaxis';

class Simulator {
    canvas!: HTMLCanvasElement;
    engine!: BABYLON.Engine;
    scene!: BABYLON.Scene;
    manip!: Manipulator;
    cursor!: BABYLON.Mesh;

    canvasid: string;

    constructor(canvasid: string) {
        this.canvasid = canvasid;
    }

    init() {
        this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasid);
        this.engine = new BABYLON.Engine(this.canvas, true)
        this.scene = new BABYLON.Scene(this.engine)

        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 1000), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);

        new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, -1), this.scene);

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 });
        this.scene.addMesh(ground)

        this.cursor = BABYLON.MeshBuilder.CreateBox('cursor', { size: 50 });
        const mat = new BABYLON.StandardMaterial('smat', this.scene);
        mat.wireframe = true;
        this.cursor.material = mat;
        this.scene.addMesh(this.cursor);
        this.cursor.position = new BABYLON.Vector3(100, 100, 100);

        const ground_material = new BABYLON.StandardMaterial("groundMat", this.scene);
        ground_material.diffuseColor = BABYLON.Color3.Green();
        ground.material = ground_material;

        this.manip = new Manipulator();
        this.manip.locate(this.scene);

        const axis = new WorldAxis(200);
        axis.locate(this.scene);

        this.engine.runRenderLoop(() => {
            this.manip.tick();
            this.scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    update(theta1: number, theta2: number, theta3: number) {
        this.manip.rotate(theta1, theta2, theta3);
    }

    solve(x: number, y: number, z: number) {
        this.cursor.position = new BABYLON.Vector3(x, y, z);
    }

    go(x: number, y: number, z: number){
        this.manip.go(x, y, z);
    }
}

export { Simulator };