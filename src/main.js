import { Animation } from "./app/animation.js";

const canvas = document.getElementById('canvas');
const animation = new Animation(canvas);

start();


function start() {
	initCanvas();
	animation.run();
}

function initCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		animation.stop();
		animation.run();
	});
}
