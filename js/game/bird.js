class Bird extends Obstacle {
	constructor() {
		super()
		this.width = 20 // previously 10
		this.y =  2 + Math.floor(Math.random() * 24)  /*5 + Math.floor(Math.random() * 3) * 5*/
		if (this.y < 12 || Math.random() < 0.25)
		{
			this.height = 10
		}
		else
			this.height = 50 // added

		this.type = 1;
	}

	collide(obj) {

	}
}
