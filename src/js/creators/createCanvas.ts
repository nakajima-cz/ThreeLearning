import { Stage, Text } from "@createjs/easeljs/dist/easeljs.cjs";
import { FONT_BASE } from "../utils/load-font";

/**
 * 文字を記述したキャンバスを返します。
 * @param label
 * @param fontSize
 * @param width
 * @param height
 */
export function createCanvas(
  label: string,
  fontSize: number,
  w: number,
  h: number
): HTMLCanvasElement {
  // レターオブジェクトを生成します。
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.setAttribute("width", w + "px");
  canvas.setAttribute("height", h + "px");

  const stage = new Stage(canvas);
  // const text1 = new Text(label, fontSize + "px " + FONT_BASE, "#FFF");
  // text1.textAlign = "center";
  // text1.x = w / 2;
  const text2 = new Text('test', fontSize + "px " + FONT_BASE, "#FFF");
  text2.textAlign = "center";
  text2.x = w / 2;
  // stage.addChild(text1);
  stage.addChild(text2);
  stage.update();

  return canvas;
}
