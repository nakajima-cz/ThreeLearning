import * as THREE from 'three';
import {Color, Mesh, PerspectiveCamera, PointLight, Scene, SpotLight} from'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

export default class ThreeUtils {
    constructor(){

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
}