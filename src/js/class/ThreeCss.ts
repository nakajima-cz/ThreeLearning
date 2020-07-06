import * as THREE from 'three';
import {Color, Mesh, PerspectiveCamera, PointLight, Scene, SpotLight} from'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

export default class ThreeCss {
    w: number;
    h: number;
    renderer: CSS3DRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    orbitControls: OrbitControls;
    datControls: any;

    constructor (id: string, orbit: boolean = false, ww = window.innerWidth, wh = window.innerHeight) {
        this.w = ww;
        this.h = wh;

        // レンダラーの初期化
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(this.w, this.h); // 描画サイズ
        $(`#${id}`).append(this.renderer.domElement);

        // シーン初期化
        this.scene = new THREE.Scene();

        // カメラ初期化(視野角, アスペクト比, カメラの映る最短距離, カメラの映る最長距離)
        this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 1, 1000);


        // OrbitControls
        if (orbit) {
            // this.animation();
        }

        const controls = new TrackballControls(this.camera, this.renderer.domElement);
        controls.minDistance = 500;
        controls.maxDistance = 6000;

        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
            controls.update();
        }
        animate();

        // dat init
        this.datControls = new dat.GUI();

    }


    animation() {
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.update();
        // アロー関数であればthisのスコープがずれるのでthisが使える
        const animate = () => {
            requestAnimationFrame(animate);
            this.orbitControls.update();

            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

}