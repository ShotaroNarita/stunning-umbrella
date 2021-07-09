import * as BABYLON from 'babylonjs'
import { WorldAxis } from '../worldaxis';

const joint_diameter = 50; // [mm]
const arm_diameter = 20; // [mm]

class Arm {
    length: number;
    joint: BABYLON.Mesh;
    arm: BABYLON.Mesh;
    axis: WorldAxis;
    kaitenjiku: BABYLON.Vector3;
    angle: number = 0;

    constructor(length: number, kaitenjiku: BABYLON.Vector3 = BABYLON.Axis.X) {
        this.length = length;
        this.kaitenjiku = kaitenjiku;
        this.joint = BABYLON.MeshBuilder.CreateSphere("joint", { diameter: joint_diameter });
        this.arm = BABYLON.MeshBuilder.CreateCylinder("arm", { height: this.length - joint_diameter, diameter: arm_diameter });
        this.axis = new WorldAxis(joint_diameter * 2);

        this.axis.set_parent(this.joint);
        this.arm.parent = this.joint;
        this.arm.translate(BABYLON.Axis.Y, this.length / 2);
    }

    rotate(amount: number) {
        this.joint.rotate(this.kaitenjiku, amount);
        this.angle += amount;
    }

    set_angle(target: number) {
        const dif = target - this.angle;
        this.rotate(dif);
    }

    connect(root: Arm) {
        this.joint.parent = root.joint;
        this.joint.translate(BABYLON.Axis.Y, root.length);
    }

    locate(scene: BABYLON.Scene) {
        scene.addMesh(this.arm);
        scene.addMesh(this.joint);
        this.axis.locate(scene);
    }
}

class Manipulator {
    arms: Array<Arm> = new Array<Arm>();

    constructor() {
        this.arms.push(new Arm(60, BABYLON.Axis.Y));
        this.arms.push(new Arm(200, BABYLON.Axis.X));
        this.arms.push(new Arm(300, BABYLON.Axis.X));
        this.compose();
    }

    compose() {
        for (let i = 1; i < this.arms.length; i++) {
            this.arms[i].connect(this.arms[i - 1]);
        }
    }

    locate(scene: BABYLON.Scene) {
        for (let a of this.arms) {
            a.locate(scene);
        }
    }

    rotate(theta1: number, theta2: number, theta3: number) {
        this.arms[0].rotate(theta1);
        this.arms[1].rotate(theta2);
        this.arms[2].rotate(theta3);
    }
}

export { Manipulator };