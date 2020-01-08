const trexConfig = {
	height: 50,
	width: 50,
}


/** Class for rendering trex in game **/
class Trex {
	/**
	 * Create a trex.
	 */
	constructor(x, y, config) {
		if (typeof config == 'undefined')
			config = trexConfig

		this.config = config

		this.x = x
		this.y = y
		this.vy = 0
	}

	jump() {
		this.vy = -5
	}

	update() {
		this.y += this.vy

	}

	show() {
		rect(this.x, this.y, this.config.height, this.config.width)
	}
}