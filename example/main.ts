import { bind } from "../src/bind"
import { Rect } from "../src/marks"


let canvas = document.querySelector("canvas");

let data = [10, 20, 30, 40];

bind(canvas, data, new Rect(d => d, 20, 30, 30));