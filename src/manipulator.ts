import * as BABYLON from 'babylonjs'
import { WorldAxis } from '../worldaxis';

const joint_diameter = 50; // [mm]

class Arm {
    length: number;
    joint: BABYLON.Mesh;
    arm: BABYLON.Mesh;
    axis: WorldAxis;


    constructor(length: number) {
        this.length = length;
        this.joint = BABYLON.MeshBuilder.CreateSphere("joint", { diameter: joint_diameter });
        this.arm = BABYLON.MeshBuilder.CreateCylinder("arm", { height: this.length - joint_diameter, diameter: joint_diameter });
        this.axis = new WorldAxis(joint_diameter * 2);

        this.axis.set_parent(this.joint)
        this.arm.parent = this.joint;
        this.arm.translate(new BABYLON.Vector3(0, 1, 0), this.length / 2);

        // this.rotate(new BABYLON.Vector3(1, 0, 0), 1);
    }

    rotate(axis: BABYLON.Vector3, angle: number) {
        this.joint.rotate(axis, angle);
    }

    connect(root: Arm) {
        this.joint.parent = root.joint;
        this.joint.translate(new BABYLON.Vector3(0, 1, 0), root.length);
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
        this.arms.push(new Arm(200));
        this.arms.push(new Arm(300));
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

    rotate(theta1: number, theta2: number) {
        this.arms[0].rotate(new BABYLON.Vector3(0, 0, 1), theta1);
        this.arms[1].rotate(new BABYLON.Vector3(0, 0, 1), theta2);
    }
}

// class Manipulator {
//     base1: BABYLON.Mesh;
//     base1_diameter = 20;

//     arm1: BABYLON.Mesh;
//     arm1_diameter = this.base1_diameter / 10;
//     arm1_length = 50;
//     arm1_theta = 0;

//     base2: BABYLON.Mesh;
//     base2_diameter = 20;

//     arm2: BABYLON.Mesh;
//     arm2_diameter = this.base1_diameter / 10;
//     arm2_length = 60;
//     arm2_theta = 0;

//     constructor() {
//         this.base1 = BABYLON.MeshBuilder.CreateSphere("base1", { diameter: this.base1_diameter });
//         this.arm1 = BABYLON.MeshBuilder.CreateCylinder("arm1", { diameter: this.arm1_diameter, height: this.arm1_length });
//         this.arm1.parent = this.base1;
//         this.base1.translate(new BABYLON.Vector3(0, 1, 0), 0);
//         this.arm1.translate(new BABYLON.Vector3(0, 1, 0), (this.base1_diameter + this.arm1_length) / 2);

//         //---------
//         this.base2 = BABYLON.MeshBuilder.CreateSphere("base2", { diameter: this.base2_diameter });
//         this.arm2 = BABYLON.MeshBuilder.CreateCylinder("arm2", { diameter: this.arm2_diameter, height: this.arm2_length });
//         this.arm2.parent = this.base2;
//         this.base2.parent = this.arm1;

//         //Specify the relative position of parent's center and the child's center
//         this.base2.translate(new BABYLON.Vector3(0, 1, 0), (this.base2_diameter + this.arm1_length) / 2);
//         this.arm2.translate(new BABYLON.Vector3(0, 1, 0), (this.base2_diameter + this.arm2_length) / 2);
//         //---------

//         //---------
//         this.operate();
//     }

//     operate() {
//         this.base1.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), this.arm1_theta);
//         this.base2.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), this.arm2_theta);
//     }

//     set_theta1(target_angle: number) {
//         this.arm1_theta = target_angle;
//         this.operate();
//     }

//     set_theta2(target_angle: number) {
//         this.arm2_theta = target_angle;
//         this.operate();
//     }

//     increment_theta1(angle_step: number) {
//         this.set_theta1(this.arm1_theta + angle_step);
//     }

//     increment_theta2(angle_step: number) {
//         this.set_theta2(this.arm2_theta + angle_step);
//     }

//     solve(x: number, y: number) {
//         const L1 = this.arm1_length + (this.base1_diameter + this.base2_diameter) / 2
//         const L2 = this.arm2_length + (this.base2_diameter + this.base2_diameter) / 2

//         const C2 = (x * x + y * y - L1 * L1 - L2 * L2) / (2 * L1 * L2);
//         const S2 = Math.sqrt(1 - C2 * C2);

//         this.arm1_theta = Math.atan2(-L2 * S2 * x + (L1 + L2 * C2) * y, L2 * S2 * y + (L1 + L2 * C2) * x);
//         this.arm2_theta = Math.acos(C2)// + this.arm1_theta;
//         this.operate();
//     }

//     locate(scene: BABYLON.Scene) {
//         scene.addMesh(this.base1);
//         scene.addMesh(this.arm1);
//         // scene.addMesh(this.arm2);

//         // scene.addMesh(this.box1);
//         // scene.addMesh(this.box2);
//     }
// }

export { Manipulator };