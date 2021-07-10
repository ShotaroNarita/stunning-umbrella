import * as BABYLON from 'babylonjs'

class WorldAxis {
    size: number;
    axisX: BABYLON.LinesMesh;
    axisY: BABYLON.LinesMesh;
    axisZ: BABYLON.LinesMesh;

    constructor(size: number) {
        this.size = size;

        this.axisX = BABYLON.MeshBuilder.CreateLines("axisX", {
            points: [
                BABYLON.Vector3.Zero(),
                new BABYLON.Vector3(size, 0, 0),
            ],
        });

        this.axisX.color = new BABYLON.Color3(0, 0, 1);

        this.axisY = BABYLON.MeshBuilder.CreateLines("axisY", {
            points: [
                BABYLON.Vector3.Zero(),
                new BABYLON.Vector3(0, size, 0),
            ]
        });

        this.axisY.color = new BABYLON.Color3(0, 1, 0);

        this.axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, 0, size),
        ],
        );

        this.axisZ.color = new BABYLON.Color3(1, 0, 0);

    }

    set_parent(parent: BABYLON.Mesh){
        this.axisX.parent = parent;
        this.axisY.parent = parent;
        this.axisZ.parent = parent;
    }

    locate(scene: BABYLON.Scene) {
        scene.addMesh(this.axisX);
        scene.addMesh(this.axisY);
        scene.addMesh(this.axisZ);
    }
}

export { WorldAxis };
