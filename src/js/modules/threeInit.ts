import * as THREE from 'three';
import ThreeCanvas from '../class/canvas/index';

export default () => {

    const init = () => {
        const TC = new ThreeCanvas('webGL');

        // 最後の初期処理
        TC.camera.position.set(20, 10, 100);
        TC.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // オブジェクトの配置
        const axes = new THREE.AxesHelper(20);
        const planeMesh = ThreeCanvas.createMeshPlane(60, 20, 0xcccccc);
        const cubeMesh = ThreeCanvas.createMeshCube(4, 4, 4,  0x000000);
        const sphereMesh = ThreeCanvas.createMeshSphere(4, 20, 20,  0x00ff00);

        planeMesh.rotation.set(-0.5 * Math.PI, 0 ,0);
        cubeMesh.position.set(10, 10, 0);
        sphereMesh.position.set(0, 0, 0);

        TC.scene.add(axes);
        TC.scene.add(planeMesh);
        TC.scene.add(cubeMesh);
        TC.scene.add(sphereMesh);

        TC.renderer.render(TC.scene, TC.camera);
    };

    window.addEventListener('load', init);

}