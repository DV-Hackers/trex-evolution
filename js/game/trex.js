/** Class for trex's in world. */
class Trex {
	/**
	 * Create a trex.
	 */
	constructor() {
		this.x = 10
		this.y = 0
		this.width = 10
		this.height = 20
		this.vy = 0
		this.ducking = false
		this.brain = null
	}

	jump() {
		if (this.y == 0)
			this.vy = 8
	}

	duck() {
		if (this.y == 0) {
			this.ducking = true
			this.height = 10
		}
	}

	update(decision) {
		if (this.ducking) {
			this.height = 20
			this.ducking = false
		}

		if (decision == 1)
			this.jump()
		else if (decision == 2)
			this.duck()

		this.y += this.vy
		this.vy += worldConfig.gravity
		this.y = Math.max(0, Math.min(this.y, worldConfig.height))
	}

	renderP5() {
		rectMode(CENTER)
		fill('#FF0000')
		rect(this.x, height - this.y - this.height / 2, this.width, this.height)
	}

	kill(score) {
		// this.brain.fitness = score
		this.alive = false
		console.log('trex killed')
	}
}