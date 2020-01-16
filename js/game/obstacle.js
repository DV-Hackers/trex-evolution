var obstacleConfig = {
	vx: 2,
	minDistance: 50
}

class Obstacle {
	constructor() {
		this.width = 10 + Math.floor(Math.random() * 5)
		this.height = 10
		this.x = worldConfig.width
		this.y = 0
	}

	update() {
		this.x -= obstacleConfig.vx
	}

	renderP5() {
		rectMode(CENTER)
		fill('#0000FF')
		rect(this.x, height - this.y - this.height / 2, this.width, this.height)
	}
}