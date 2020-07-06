import * as THREE from 'three';


const init = () => {
    // サイズを指定
    const width = 960;
    const height = 540;
    let rot = 0;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: <HTMLCanvasElement>document.querySelector('#webGL')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(50, 100, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 地面を作成
    const plane2 = new THREE.GridHelper(600, 50);
    scene.add(plane2);
    const plane = new THREE.AxesHelper(300);
    scene.add(plane);

    // 直方体を作成
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.SphereGeometry(30, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
        // ラジアンに変換する
        const radian = (rot * Math.PI) / 180;
        // 角度に応じてカメラの位置を設定
        mesh.position.x = 200 * Math.sin(radian);
        mesh.position.y = 50;
        mesh.position.z = 200 * Math.cos(radian);

        // レンダリング
        renderer.render(scene, camera);

        // 球体のワールド座標を取得する
        const project = mesh.position.project(camera);
        const sx: any = (width / 2) * (+project.x + 1.0);
        const sy: any = (height / 2) * (-project.y + 1.0);

        const tf = document.getElementById('hud');
        // テキストフィールドにスクリーン座標を表示
        tf.innerHTML = `👆スクリーン座標(${Math.round(sx)}, ${Math.round(sy)})`;
        tf.style.transform = `translate(${sx}px, ${sy}px)`;

        // SVGでラインを描画
        const line = document.getElementById('svgLine');
        line.setAttribute('x2', sx);
        line.setAttribute('y2', sy);

        requestAnimationFrame(tick);
    }
}

window.addEventListener('load', init);
