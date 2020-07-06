import * as THREE from 'three';
import ThreeCss from '../class/ThreeCss';
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import * as loadImage from 'blueimp-load-image';
import * as TimelineMax from "gsap/umd/TimelineMax";
import * as dat from 'dat.gui';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// todo three.jsでの配置がmatrix3dなのに対し、gsapの3d表現がtranslate3dなので位置がずれてるかも


const TC = new ThreeCss('webGL', true);

// 最後の初期処理
TC.camera.position.set(0, 0, 4000);
// TC.camera.lookAt(new THREE.Vector3(550, 0, 0));


// アロー関数にするとthisがglobalオブジェクトに束縛されてしまうのでfunction文を使う。
const guiCtrl = function () {
    this.Camera_x = 0;
    this.Camera_y = 0;
    this.Camera_z = 0;
};

let gui = new dat.GUI();
let guiObj = new guiCtrl();
let folder = gui.addFolder('Folder');
const setCameraPosition = () => {
    TC.camera.position.set(guiObj.Camera_x, guiObj.Camera_y, guiObj.Camera_z);
}

folder.add(guiObj, 'Camera_x', 0, 5000).onChange(setCameraPosition);
folder.add(guiObj, 'Camera_y', 0, 5000).onChange(setCameraPosition);
folder.add(guiObj, 'Camera_z', 0, 5000).onChange(setCameraPosition);
folder.open();


let counter: number = 0;
// DOM生成
for (let i = 1; i <= 10; i++) {

    // position
    const initialPosition = {
        x: i % 3 * 1000,
        y: (Math.floor(i / 3) % 3) * -250,
        z: (Math.floor(i / 3) % 3) * 550
    };

    //DOM
    const el = $('<div class="element">');
    const image = $('<img>');
    image.attr('src', `../images/cat_0${i}.jpg`);

    // exif情報を元に回転
    fetch(`http://localhost:3000/images/cat_0${i}.jpg`)
        .then((data) => {
            return data.blob();
        })
        .then((blob) => {
            loadImage.parseMetaData(blob, (allData) => {
                if (allData.exif) {
                    switch (allData.exif.get('Orientation')) {
                        case 6 :
                            image.css({
                                transform: 'rotate(90deg)',
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        })
    ;

    el.append(image);
    let TLObj = TimelineMax({repeat: 0});

    console.log(`../images/cat_0${i}.jpg`, initialPosition);
    $('.modal_close').on('click', () => {
        $('#modal').removeClass('active');
        TLObj
            .to(el, {
                force3D: false,
                x: initialPosition.x,
                y: initialPosition.y,
                z: initialPosition.z,
                duration: 1,
            });
    });

    el.on('click', () => {
        TLObj
            .to(el, {
                force3D: false,
                x: 550,
                y: 0,
                z: 2500,
                duration: 1,
            });

        $('#modal').addClass('active');
    });

    // jQueryObjectの場合インデックス0がHtmlElementらしい
    const tObj = new CSS3DObject(el[0]);

    tObj.position.set(initialPosition.x, initialPosition.y, initialPosition.z);

    TC.scene.add(tObj);
}