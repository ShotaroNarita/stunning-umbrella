/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babylonjs/babylon.js":
/*!*******************************************!*\
  !*** ./node_modules/babylonjs/babylon.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar BABYLON = __importStar(__webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\"));\nvar manipulator_1 = __webpack_require__(/*! ./manipulator */ \"./src/manipulator.ts\");\nvar worldaxis_1 = __webpack_require__(/*! ../worldaxis */ \"./worldaxis.ts\");\nvar canvas = document.getElementById('maincanvas');\nvar engine = new BABYLON.Engine(canvas, true);\nvar scene = new BABYLON.Scene(engine);\nvar camera = new BABYLON.ArcRotateCamera(\"Camera\", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -1000), scene);\ncamera.setTarget(BABYLON.Vector3.Zero());\ncamera.attachControl(canvas, true);\n// const sphere = BABYLON.MeshBuilder.CreateSphere(\"sphere\", { diameter: 2 }, scene);\nvar light1 = new BABYLON.HemisphericLight(\"light1\", new BABYLON.Vector3(-500, 500, -500), scene);\nvar light2 = new BABYLON.HemisphericLight(\"light1\", new BABYLON.Vector3(-500, -500, -500), scene);\nvar ground = BABYLON.MeshBuilder.CreateGround(\"ground\", { width: 1000, height: 1000 }, scene);\nvar groundMat = new BABYLON.StandardMaterial(\"groundMat\", scene);\ngroundMat.diffuseColor = BABYLON.Color3.Green();\n// groundMat.diffuseColor = new BABYLON.Color3(0, 0.2, 0);\nground.material = groundMat;\nvar manip = new manipulator_1.Manipulator();\nmanip.locate(scene);\nvar axis = new worldaxis_1.WorldAxis(200);\naxis.locate(scene);\n// let x = 60;\n// let dx = 1;\nengine.runRenderLoop(function () {\n    manip.rotate(Math.PI / 1000, Math.PI / 50);\n    scene.render();\n});\nwindow.addEventListener(\"resize\", function () {\n    engine.resize();\n});\n\n\n//# sourceURL=webpack://small_template/./src/main.ts?");

/***/ }),

/***/ "./src/manipulator.ts":
/*!****************************!*\
  !*** ./src/manipulator.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Manipulator = void 0;\nvar BABYLON = __importStar(__webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\"));\nvar worldaxis_1 = __webpack_require__(/*! ../worldaxis */ \"./worldaxis.ts\");\nvar joint_diameter = 50; // [mm]\nvar Arm = /** @class */ (function () {\n    function Arm(length) {\n        this.length = length;\n        this.joint = BABYLON.MeshBuilder.CreateSphere(\"joint\", { diameter: joint_diameter });\n        this.arm = BABYLON.MeshBuilder.CreateCylinder(\"arm\", { height: this.length - joint_diameter, diameter: joint_diameter });\n        this.axis = new worldaxis_1.WorldAxis(joint_diameter * 2);\n        this.axis.set_parent(this.joint);\n        this.arm.parent = this.joint;\n        this.arm.translate(new BABYLON.Vector3(0, 1, 0), this.length / 2);\n        // this.rotate(new BABYLON.Vector3(1, 0, 0), 1);\n    }\n    Arm.prototype.rotate = function (axis, angle) {\n        this.joint.rotate(axis, angle);\n    };\n    Arm.prototype.connect = function (root) {\n        this.joint.parent = root.joint;\n        this.joint.translate(new BABYLON.Vector3(0, 1, 0), root.length);\n    };\n    Arm.prototype.locate = function (scene) {\n        scene.addMesh(this.arm);\n        scene.addMesh(this.joint);\n        this.axis.locate(scene);\n    };\n    return Arm;\n}());\nvar Manipulator = /** @class */ (function () {\n    function Manipulator() {\n        this.arms = new Array();\n        this.arms.push(new Arm(200));\n        this.arms.push(new Arm(300));\n        this.compose();\n    }\n    Manipulator.prototype.compose = function () {\n        for (var i = 1; i < this.arms.length; i++) {\n            this.arms[i].connect(this.arms[i - 1]);\n        }\n    };\n    Manipulator.prototype.locate = function (scene) {\n        for (var _i = 0, _a = this.arms; _i < _a.length; _i++) {\n            var a = _a[_i];\n            a.locate(scene);\n        }\n    };\n    Manipulator.prototype.rotate = function (theta1, theta2) {\n        this.arms[0].rotate(new BABYLON.Vector3(0, 0, 1), theta1);\n        this.arms[1].rotate(new BABYLON.Vector3(0, 0, 1), theta2);\n    };\n    return Manipulator;\n}());\nexports.Manipulator = Manipulator;\n\n\n//# sourceURL=webpack://small_template/./src/manipulator.ts?");

/***/ }),

/***/ "./worldaxis.ts":
/*!**********************!*\
  !*** ./worldaxis.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WorldAxis = void 0;\nvar BABYLON = __importStar(__webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\"));\nvar WorldAxis = /** @class */ (function () {\n    function WorldAxis(size) {\n        this.size = size;\n        this.axisX = BABYLON.MeshBuilder.CreateLines(\"axisX\", {\n            points: [\n                BABYLON.Vector3.Zero(),\n                new BABYLON.Vector3(size, 0, 0),\n            ],\n        });\n        this.axisX.color = new BABYLON.Color3(0, 0, 1);\n        this.axisY = BABYLON.MeshBuilder.CreateLines(\"axisY\", {\n            points: [\n                BABYLON.Vector3.Zero(),\n                new BABYLON.Vector3(0, size, 0),\n            ]\n        });\n        this.axisY.color = new BABYLON.Color3(0, 1, 0);\n        this.axisZ = BABYLON.Mesh.CreateLines(\"axisZ\", [\n            BABYLON.Vector3.Zero(),\n            new BABYLON.Vector3(0, 0, size),\n        ]);\n        this.axisZ.color = new BABYLON.Color3(1, 0, 0);\n    }\n    WorldAxis.prototype.set_parent = function (parent) {\n        this.axisX.parent = parent;\n        this.axisY.parent = parent;\n        this.axisZ.parent = parent;\n    };\n    WorldAxis.prototype.locate = function (scene) {\n        scene.addMesh(this.axisX);\n        scene.addMesh(this.axisY);\n        scene.addMesh(this.axisZ);\n    };\n    return WorldAxis;\n}());\nexports.WorldAxis = WorldAxis;\n\n\n//# sourceURL=webpack://small_template/./worldaxis.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;