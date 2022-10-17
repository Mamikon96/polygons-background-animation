export class Animation {

	points = [];
	raf = null;

	constructor(canvas, color = 'purple') {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.color = color;
	}

	run = () => {
		this.createPoints();
		this.drawPoints();
		this.startAnimation(1);
	};

	stop = () => {
		this.clearPoints();
		this.stopAnimation();
	}

	createPoints(count) {

		const radius = 5;

		for (let i = -100, row = 0; i < this.canvas.width + 200; i += 200, row++) {
			this.points[row] = [];
			for (let j = -100; j < this.canvas.height + 100; j += 200) {
				const startX = i + 4 * radius;
				const startY = j + 4 * radius + (row % 2) * 100;
				const maxDrift = 50;
				this.points[row].push(new Point(startX, startY, radius, maxDrift, this.color, 5));
			}
		}
	}

	clearPoints() {
		this.points = [];
	}

	drawPoints() {
		this.clearCanvas();
		this.points.forEach(pointsRow => {
			pointsRow.forEach(point => point.draw(this.ctx));
		});

		for (let i = 0; i < this.points.length - 1; i++) {
			for (let j = 0; j < this.points[i].length - 1; j++) {
				this.drawLine(this.ctx, this.points[i][j], this.points[i][j + 1]);
				this.drawLine(this.ctx, this.points[i][j], this.points[i + 1][j]);

				if (i % 2) {
					this.drawLine(this.ctx, this.points[i][j], this.points[i + 1][j + 1]);
				} else {
					
					this.drawLine(this.ctx, this.points[i + 1][j], this.points[i][j + 1]);
				}
			}
		}
	}

	startAnimation(time) {
		let timer = time;

		const step = () => {
			if (timer === 0) {
				for (let i = 0; i < this.points.length; i++) {
					for (let j = 0; j < this.points[i].length; j++) {
						this.points[i][j].move();
					}
				}
				this.drawPoints();
				timer = time;
			} else {
				timer--;
			}
			this.raf = requestAnimationFrame(step);
		}

		step();
		// requestAnimationFrame(this.animatePoints.bind(this));
	}

	stopAnimation() {
		cancelAnimationFrame(this.raf);
	}

	drawLine(ctx, p1, p2) {
		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

class Point {

	dx = 0;
	dy = 0;

	constructor(x, y, radius, maxDrift, color, stepsCount) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.maxDrift = maxDrift;
		this.color = color;
		this.stepsCount = stepsCount;
		this.curStep = stepsCount;
		this.minX = this.x - maxDrift / 2;
		this.maxX = this.x + maxDrift / 2;
		this.minY = this.y - maxDrift / 2;
		this.maxY = this.y + maxDrift / 2;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}

	move() {
		let delta = this.getDelta();

		while (this.x + delta.dx < this.minX
			|| this.x + delta.dx > this.maxX
			|| this.y + delta.dy < this.minY
			|| this.y + delta.dy > this.maxY) {
				delta = this.getDelta();
			}


		// console.log(delta);
		this.x += delta.dx;
		this.y += delta.dy;
	}

	getDelta() {
		if (this.curStep !== 0) {
			this.curStep--;
		} else {
			this.curStep = this.stepsCount;
			this.dx = this.getRandomDelta();
			this.dy = this.getRandomDelta();
		}
		return {
			dx: this.dx,
			dy: this.dy
		};
	}

	getRandomDelta() {
		const delta = Math.round( (Math.random() - 0.5) * 2 );
		// console.log(delta);
		switch ( delta ) {
			case -1:
				return -1;
			case 0:
				return 0;
			case 1:
				return 1;

		}
	}
}