import * as THREE from 'three';
import {Color, Mesh, PerspectiveCamera, PointLight, Scene, SpotLight, WebGLRenderer} from'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui';

export default class Canvas {
    w: number;
    h: number;
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    orbitControls: OrbitControls;
    datControls: any;

    constructor (id: string, orbit: boolean = false, ww = window.innerWidth, wh = window.innerHeight) {
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

        // OrbitControls
        if (orbit) {
            this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
            this.orbitControls.update();
            // アロー関数であればthisのスコープがずれるのでthisが使える
            const animate = () => {
                requestAnimationFrame(animate);
                this.orbitControls.update();
                this.renderer.render(this.scene, this.camera);
            };

            animate();
        }

        // dat init
        this.datControls = new dat.GUI();

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
     * lightのT/FでBasicMaterialかLambertMaterialかを分ける
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

    /**
     * @readme https://threejs.org/docs/#api/en/lights/SpotLight
     */
    static createSpotLight(x: number, y: number, z: number, color: any, shadow: boolean = false): SpotLight {
        const spotLight = new THREE.SpotLight(color);
        spotLight.position.set(x, y, z);
        spotLight.castShadow = shadow;
        return spotLight;
    }


    //[s: string]はジェネリクスでstringのどのキーがきても大丈夫
    addDatControls(datControls: {[s: string]: string|number}[] ){
        const controls = new function (){};

        for(const dc of datControls) {
            controls[dc.controlName] = dc.initial;
            this.datControls.add(controls, dc.controlName, dc.from, dc.to);
        }
    }

}