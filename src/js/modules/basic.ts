import { Container, Text } from "@createjs/easeljs/dist/easeljs.cjs";
import { Cubic, Quart } from "gsap/umd/EasePack";
import * as TimelineMax from "gsap/umd/TimelineMax";
import * as TweenMax from "gsap/umd/TweenMax";
import * as THREE from "three";
import { IconsView } from "../class/ThreeIconsView";
import { createCanvas } from "../creators/createCanvas";
import { createParticleCloud } from "../creators/createParticleCloud";
import { FONT_ICON, loadFont } from "../utils/load-font";

window.addEventListener("DOMContentLoaded", async () => {
    await loadFont();
    const world = new DemoIconsWorld();
});

/**
 * 3Dのパーティクル表現のクラスです。
 * @author Yausnobu Ikeda a.k.a clockmaker
 */
class DemoIconsWorld extends IconsView {
    private WORD_LIST = ["creadorz"];

    constructor() {
        super();
        this.setup();
        this.createLogo();
        this.startRendering();
    }

    public onTick(): void {
        super.onTick();

        this.camera.lookAt(this.HELPER_ZERO);

        // 背景をカメラの反対側に配置
        const vec = this.camera.position.clone();
        vec.negate(); // vector座標の反転
        vec.normalize(); // 単位ベクトルに変換
        vec.multiplyScalar(25000); // スカラ倍
        this._bg.position.copy(vec); // 変数vocのvector座標に_bgをセットする
        this._bg.lookAt(this.camera.position); // _bgはカメラを見るようセット
    }

    /**
     * セットアップします。
     */
    private setup(): void {
        this.createWorld();

        // ------------------------------
        // パーティクルのテクスチャアトラス(スプライトシート キャラクター等を構成する部品を平面上に並べた画像)を生成
        // ------------------------------
        const container = new Container();

        const SIZE = 256;
        const len = this._matrixLength * this._matrixLength;
        for (let i = 0; i < len; i++) {
            // html5のアイコンのユニコード → f13b これを10進数で表すと「61755」となる
            // ユニコード変換 https://ics.media/entry/8385/
            // charにはfontawesomeで表示されるであろうアイコン(html5とか)の文字が入る
            const char = String.fromCharCode(61730 + i);
            const text2 = new Text(char, "200px " + FONT_ICON, "#FFF");
            text2.textBaseline = "middle";
            text2.textAlign = "center"; // ex.) i = 1;
            text2.x = SIZE * (i % this._matrixLength) + SIZE / 2; // ex.) 256 * (1 % 8) + 256 / 2 -> 256 * 1 + 128 = 384
            text2.y = SIZE * Math.floor(i / this._matrixLength) + SIZE / 2; // ex.) 256 * 0 + 256 / 2 = 128
            // text2.x = 1000;
            // text2.y = 1000;
            container.addChild(text2);
        }

        container.cache(0, 0, SIZE * this._matrixLength, SIZE * this._matrixLength);
        const texture: THREE.Texture = new THREE.Texture(container.cacheCanvas);
        texture.needsUpdate = true;

        // fontawesomのアイコン群を作成
        this.createParticle(texture);

        // particle群を追加
        const icons = createParticleCloud();
        this.scene.add(icons);
    }

    /**
     * ロゴを生成し、モーションします。
     */
    private createLogo(): void {
        const canvas = createCanvas(
            this.WORD_LIST[this._wordIndex],
            42,
            this.CANVAS_W,
            this.CANVAS_H
        );

        this._wordIndex++;
        if (this._wordIndex >= this.WORD_LIST.length) {
            this._wordIndex = 0;
        }

        const timeline = new TimelineMax({
            onComplete: () => {
                const tm = new TimelineMax();
                tm.to("#coverBlack", 1.0, { css: { opacity: 1.0 } });
                tm.call(() => {
                    this.createLogo();
                });
            }
        });

        this.createLetter(canvas, timeline);

        // カメラモーション
        timeline.set(this.camera.position, { x: 200, y: -200, z: 1000 }, 0);
        timeline.to(
            this.camera.position,
            10.0,
            { x: 0, y: 0, z: 5000, ease: Quart.easeInOut },
            0
        );
        timeline.set(this.camera, { fov: 90 }, 0);
        timeline.to(this.camera, 14.0, { fov: 45, ease: Quart.easeInOut }, 0);

        // タイムスケール
        timeline.timeScale(3.0);

        timeline.addCallback(() => {
            TweenMax.to(timeline, 1.0, { timeScale: 0.05, ease: Cubic.easeInOut });
            TweenMax.to(timeline, 0.5, {
                timeScale: 3.0,
                delay: 3.5,
                ease: Cubic.easeInOut
            });
        }, 3.5);

        // // ------------------------
        // // 3種類のカメラモーションのいずれかを適用する
        // // ------------------------
        // if (Math.random() < 0.3) {
        //     timeline.set(this.camera.position, { x: 200, y: -200, z: 1000 }, 0);
        //     timeline.to(
        //         this.camera.position,
        //         14.0,
        //         { x: 0, y: 0, z: 5000, ease: Quart.easeInOut },
        //         0
        //     );
        //     timeline.set(this.camera, { fov: 90 }, 0);
        //     timeline.to(this.camera, 14.0, { fov: 45, ease: Quart.easeInOut }, 0);
        // } else if (Math.random() < 0.5) {
        //     timeline.set(this.camera.position, { x: 100, y: +1000, z: 1000 }, 0);
        //     timeline.to(
        //         this.camera.position,
        //         14.0,
        //         { x: 0, y: 0, z: 5000, ease: Quart.easeInOut },
        //         0
        //     );
        // } else {
        //     timeline.set(this.camera.position, { x: -3000, y: 3000, z: 0 }, 0);
        //     timeline.to(
        //         this.camera.position,
        //         15.0,
        //         { x: 0, y: 0, z: 5000, ease: Quart.easeInOut },
        //         0
        //     );
        // }

        // 黒マットのフェードイン
        timeline.to("#coverBlack", 1.0, { css: { opacity: 0.0 } }, 0.0);

        // ------------------------
        // 3種類のタイムリマップのいずれかを適用する
        // ------------------------
        // if (Math.random() < 0.3) {
        //     timeline.timeScale(3.0);
        //
        //     timeline.addCallback(() => {
        //         TweenMax.to(timeline, 1.0, { timeScale: 0.05, ease: Cubic.easeInOut });
        //         TweenMax.to(timeline, 0.5, {
        //             timeScale: 3.0,
        //             delay: 3.5,
        //             ease: Cubic.easeInOut
        //         });
        //         TweenMax.to(timeline, 0.5, {
        //             timeScale: 0.05,
        //             delay: 4.0,
        //             ease: Cubic.easeInOut
        //         });
        //         TweenMax.to(timeline, 2.0, {
        //             timeScale: 5.0,
        //             delay: 9.0,
        //             ease: Cubic.easeIn
        //         });
        //     }, 3.5);
        // } else if (Math.random() < 0.5) {
        //     timeline.timeScale(6.0);
        //     TweenMax.to(timeline, 4.0, { timeScale: 0.005, ease: Cubic.easeOut });
        //     TweenMax.to(timeline, 4.0, {
        //         timeScale: 2.0,
        //         ease: Cubic.easeIn,
        //         delay: 5.0
        //     });
        // } else {
        //     timeline.timeScale(1.0);
        // }

        // 背景の色変更
        (this._bg.material as THREE.MeshLambertMaterial).color.setHSL(
            this._hue,
            1.0,
            0.5
        );

        // 色相を移動
        this._hue += 0.2;
        if (this._hue >= 1.0) {
            this._hue = 0.0;
        }
    }
}
