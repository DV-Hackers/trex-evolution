var obstacleConfig = {
	vx: 2,
	minDistance: 100,
	maxWidth: 16, //previously 10
	maxHeight: 11 //added
	// min width is 5
	// min height is 10
}

class Obstacle {
	constructor() {
		this.width = 5 + Math.floor(Math.random() * obstacleConfig.maxWidth) /*10 + Math.floor(Math.random() * obstacleConfig.maxWidth)*/
		this.height = 10 + Math.floor(Math.random() * obstacleConfig.maxHeight)
		this.x = worldConfig.width
		this.y = 0
		this.type = 0;
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
