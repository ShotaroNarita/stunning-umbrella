import * as BABYLON from 'babylonjs'
import { Manipulator } from './manipulator';
import { WorldAxis } from '../worldaxis';

class Simulator {
    canvas!: HTMLCanvasElement;
    engine!: BABYLON.Engine;
    scene!: BABYLON.Scene;
    manip!: Manipulator;

    private isMoving: boolean = false;

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

        const ground_material = new BABYLON.StandardMaterial("groundMat", this.scene);
        ground_material.diffuseColor = BABYLON.Color3.Green();
        ground.material = ground_material;

        this.manip = new Manipulator();
        this.manip.locate(this.scene);

        const axis = new WorldAxis(200);
        axis.locate(this.scene);

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    update(theta1: number, theta2: number, theta3: number) {
        this.manip.arms[0].set_angle(theta1);
        this.manip.arms[1].set_angle(theta2);
        this.manip.arms[2].set_angle(theta3);
        this.scene.render();
    }
}

export { Simulator };