import * as BABYLON from 'babylonjs'
import { WorldAxis } from '../worldaxis';

const joint_diameter = 50; // [mm]
const arm_diameter = 20; // [mm]

class Arm {
    length: number;
    joint: BABYLON.Mesh;
    tip: BABYLON.Mesh;
    arm: BABYLON.Mesh;
    gridHelper: WorldAxis;
    axis: BABYLON.Vector3;
    angle: number = 0;

    constructor(length: number, axis: BABYLON.Vector3) {
        this.length = length;
        this.axis = axis;
        this.joint = BABYLON.MeshBuilder.CreateSphere("joint", { diameter: joint_diameter });
        this.tip = BABYLON.MeshBuilder.CreateSphere("tip", { diameter: joint_diameter / 5 });
        this.arm = BABYLON.MeshBuilder.CreateCylinder("arm", { height: this.length - joint_diameter, diameter: arm_diameter });
        this.gridHelper = new WorldAxis(joint_diameter);

        this.gridHelper.set_parent(this.joint);
        this.arm.parent = this.joint;
        this.tip.parent = this.joint;

        this.arm.translate(BABYLON.Axis.Y, this.length / 2);
        this.tip.translate(BABYLON.Axis.Y, this.length);
    }

    rotate(amount: number) {
        this.joint.rotate(this.axis, amount);
        this.angle += amount;
    }

    set_angle(target: number) {
        const dif = target - this.angle;
        this.rotate(dif);
    }

    get_angle() {
        return this.angle;
    }

    connect(root: Arm) {
        this.joint.parent = root.joint;
        this.joint.translate(BABYLON.Axis.Y, root.length);
    }

    locate(scene: BABYLON.Scene) {
        scene.addMesh(this.arm);
        scene.addMesh(this.joint);
        this.gridHelper.locate(scene);
    }
}

class Manipulator {
    arms: Array<Arm> = new Array<Arm>();

    H: number = 60;
    L1: number = 200;
    L2: number = 300;

    tip!: BABYLON.Vector3;

    private moving = false;
    private task_queue = new Array<Function>();

    constructor() {
        this.arms.push(new Arm(this.H, BABYLON.Axis.Y));
        this.arms.push(new Arm(this.L1, BABYLON.Axis.X));
        this.arms.push(new Arm(this.L2, BABYLON.Axis.X));
        this.compose();
    }

    solve(x: number, y: number, z: number) {
        // Math.atan2();
        // console.log(this.arms[2].joint.position);
    }

    tick() {
        const task = this.task_queue.shift();
        if (task) task();
    }

    compose() {
        for (let i = 1; i < this.arms.length; i++)  this.arms[i].connect(this.arms[i - 1]);
        this.rotate(0, 0, 0);
    }

    locate(scene: BABYLON.Scene) {
        for (let a of this.arms) a.locate(scene);
    }

    // rotate(theta1: number, theta2: number, theta3: number): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         if (this.moving){reject();}

    //         else{
    //             for(let i = 0; i < 100;i++){
    //                 this.task_queue.push();
    //             }

    //             resolve();
    //         }

    //         this.arms[0].rotate(theta1);
    //         this.arms[1].rotate(theta2);
    //         this.arms[2].rotate(theta3);

    //         this.tip = this.arms[this.arms.length - 1].tip.position;

    //         return true;
    //     });

    // }

    kill() {

    }

    revive() {

    }

    go(x: number, y: number, z: number) {
        const theta1 = Math.atan2(x, z);
        
        const U = y - this.H;
        const Y = Math.sqrt(x * x + z * z);

        const C2 = (Y * Y + U * U - this.L1 * this.L1 - this.L2 * this.L2) / (2 * this.L1 * this.L2);
        const S2 = Math.sqrt(1 - C2 * C2);

        const theta3 = Math.acos(C2);
        const theta2 = Math.atan2(
            -this.L2 * S2 * U + (this.L1 + this.L2 * C2) * Y,
            this.L2 * S2 * Y + (this.L1 + this.L2 * C2) * U
        )

        this.rotate(theta1, theta2, theta3);
        // this.rotate(theta1, this.arms[1].angle, this.arms[2].angle);
    }

    rotate(theta1: number, theta2: number, theta3: number): boolean {
        if (this.moving) return false;

        const steps = 100;
        const delta1 = (theta1 - this.arms[0].angle) / steps;
        const delta2 = (theta2 - this.arms[1].angle) / steps;
        const delta3 = (theta3 - this.arms[2].angle) / steps;

        this.task_queue.push(() => {
            this.moving = true;
        });

        for (let i = 0; i < steps; i++) {
            this.task_queue.push(
                () => {
                    this.arms[0].rotate(delta1);
                    this.arms[1].rotate(delta2);
                    this.arms[2].rotate(delta3);
                }
            );
        }

        this.task_queue.push(() => {
            this.moving = false;
        });

        return true;
    }
}

export { Manipulator };