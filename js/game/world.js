const worldConfig = {
	gravity: -0.5,
	maxObsDist: 800,
	width: 800,
	height: 200
}


class World {
	constructor(trexNum) {
		this.trexList = Array.from({length: trexNum}).map(() => new Trex())
		this.obstacles = new Array()
		this.obstacleTimer = 0
		this.currScore = 0
	}

	update() {
		this.currScore++
		let allDead = true

		this.trexList.forEach(trex => {
			if (trex.alive) {
				if (this.hitObstacle(trex)) {
					trex.kill(this.currScore)
				}
				else
					allDead = false
			}
		})
		this.updateObstacles()

		return allDead
	}

	reset() {
		this.currScore = 0
		let topScorer = this.trexList[0]
		this.trexList.forEach(trex => {
			trex.brains = null
			trex.alive = true
			trex.y = 0
			obstacleConfig.vx = 2;
			if (trex.brain.fitness > topScorer.brain.fitness)
				topScorer = trex
		})

		console.log("top score: " + topScorer.brain.fitness)
		console.log(topScorer.brain.nn.serialize());
		this.obstacles = new Array()
	}

	updateObstacles() {
		this.obstacleTimer++
		obstacleConfig.vx += 0.0002

		if (this.obstacleTimer > obstacleConfig.minDistance + (Math.random() * worldConfig.maxObsDist))
			this.addObstacle()

		if (this.obstacles.length && this.obstacles[0].x < 0)
			this.obstacles.shift()

		this.obstacles.forEach(obs => obs.update())
	}

	addObstacle() {
		// if (this.currScore > 1000 && Math.random() < 0.15)
		if (Math.random() > 0.5 && this.currScore > 1000)
			this.obstacles.push(new Bird())
		else
			this.obstacles.push(new Obstacle())

		this.obstacleTimer = 0
	}

	hitObstacle(trex) {
		for (let i = 0; i < this.obstacles.length; ++i) {
			let outcome = this.collide(trex, this.obstacles[i])
			if (outcome == true)
				return true
		}

		return false
	}

	getNextObstacle(trex) {
		let min = { dist: worldConfig.width, /*type: 0,*/ y: 0 }
		let tmp
		for (let i = 0; i < this.obstacles.length; ++i) {
			tmp = this.collide(trex, this.obstacles[i])
			if (typeof tmp != 'object')
				return { dist: 0, /*type: this.obstacles[i].type,*/ y: this.obstacles[i].y }
			else
				min = min.dist > tmp.dist ? tmp : min
		}

		return min
	}

	collide(trex, obstacle) {
		let trexLeft = trex.x - trex.width / 2
		let trexRight = trex.x + trex.width / 2
		let obsLeft = obstacle.x - obstacle.width / 2
		let obsRight = obstacle.x + obstacle.width / 2

		if ((trexLeft <= obsRight && trexRight >= obsLeft) || (obsLeft <= trexRight && obsRight >= trexLeft)) {
			let trexDown = trex.y
			let trexUp = trex.y + trex.height
			let obsUp = obstacle.y + obstacle.height
			let obsDown = obstacle.y
			if (trexDown <= obsUp && trexUp >= obsDown)
				return true
		}

		return {
			dist: obstacle.x - trex.x,
			/*type: obstacle.type,*/
			y: obstacle.y
		}
	}

	renderP5() {
		background('#C6DABF')
		this.trexList.forEach(trex => {if (trex.alive) trex.renderP5()})
		this.obstacles.forEach(obs => obs.renderP5())
	}

	setBrains(brains) {
		for (let i = 0; i < this.trexList.length; ++i)
			this.trexList[i].brain = brains[i]
	}
}
