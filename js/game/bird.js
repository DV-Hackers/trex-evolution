class Bird extends Obstacle {
	constructor() {
		super()
		this.width = 10
		this.y = 5 + Math.floor(Math.random() * 3) * 5
		this.type = 1;
	}

	collide(obj) {

	}
}
