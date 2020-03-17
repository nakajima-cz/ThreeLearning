import * as THREE from 'three';
import ThreeCanvas from '../class/canvas/index';

export default () => {

    const TC = new ThreeCanvas('webGL', true);

    const init = () => {

        // 最後の初期処理
        TC.camera.position.set(20, 10, 100);
        TC.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // オブジェクトの配置
        const axes = new THREE.AxesHelper(20);
        const planeMesh = ThreeCanvas.createMeshPlane(60, 20, 0xcccccc);
        const cubeMesh = ThreeCanvas.createMeshCube(4, 4, 4,  0x000000,true);
        const sphereMesh = ThreeCanvas.createMeshSphere(4, 20, 20,  0x00ff00, true);

        planeMesh.rotation.set(-0.5 * Math.PI, 0 ,0);
        cubeMesh.position.set(10, 10, 0);
        sphereMesh.position.set(0, 0, 0);

        // 光源追加
        const spotLight = ThreeCanvas.createSpotLight(50, 50, 50, 0xffffff, true);
        const spotLightHelper = new THREE.SpotLightHelper( spotLight );

        TC.scene.add(axes);
        TC.scene.add(planeMesh);
        TC.scene.add(cubeMesh);
        TC.scene.add(sphereMesh);
        TC.scene.add(spotLight);
        TC.scene.add(spotLightHelper);

        TC.addDatControls([
            { controlName: 'speed', initial: 0, from: 1, to: 5},
            { controlName: 'late', initial: 0, from: 1, to: 2}
        ]);

        // レンダリング開始
        TC.renderer.render( TC.scene, TC.camera );

    };

    window.addEventListener('load', init);
    // ブラウザの幅が変更されたらレンダラーとカメラをwindowサイズにリサイズ
    window.addEventListener('resize', ()=> {
        TC.camera.aspect = window.innerWidth / window.innerHeight;
        TC.camera.updateProjectionMatrix();
        TC.renderer.setSize(window.innerWidth, window.innerHeight);
    })

}