import * as THREE from 'three';
import {Color, Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from "three";

export default class Canvas {
    w: number;
    h: number;
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;

    constructor (id: string, ww = window.innerWidth, wh = window.innerHeight) {
        this.w = ww;
        this.h = wh;

        // レンダラーの初期化
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.w, this.h); // 描画サイズ
        this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比->多分2とか
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        $(`#${id}`).append(this.renderer.domElement);

        // シーン初期化
        this.scene = new THREE.Scene();

        // カメラ初期化(視野角, アスペクト比, カメラの映る最短距離, カメラの映る最長距離)
        this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 1, 1000);


    }

    /**
     * @readme PlaneGeometry -> https://threejs.org/docs/#api/en/geometries/PlaneGeometry
     */
    static createMeshPlane(width: number, height: number, color: any): Mesh {
        return new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({color: color}),
        )
    }

    /**
     * light lightのT/FでBasicMaterialかLambertMaterialかを分ける
     * @readme BoxGeometry -> https://threejs.org/docs/#api/en/geometries/BoxGeometry
     */
    static createMeshCube(width: number, height: number, depth: number, color: any, light :boolean = false): Mesh {
        return new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            light === true ? new THREE.MeshLambertMaterial({color: color}) : new THREE.MeshBasicMaterial({color: color}),
        );
    }


    /**
     * @readme https://threejs.org/docs/#api/en/geometries/SphereGeometry
     */
    static createMeshSphere(radius: number, widthSegments: number, heightSegments: number, color: any, light :boolean = false): Mesh {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, widthSegments, heightSegments),
            light === true ? new THREE.MeshLambertMaterial({color: color}) :  new THREE.MeshBasicMaterial({color: color}),
        );
    }
}