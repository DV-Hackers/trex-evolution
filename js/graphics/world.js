const worldConfig = {
	gravity: 0.5,
	ground: 50
}

/** World for rendering game in **/
class World {
	constructor(trexNum, height, width, config) {
		if (typeof config == 'undefined')
			config = worldConfig
		this.config = config
		this.dinos = Array.from({length: trexNum}, () => new Trex(20, height - this.config.ground))
		this.height = height
		this.width = width
	}

	update() {

	}
}