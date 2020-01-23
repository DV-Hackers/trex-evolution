class Simulation {
	constructor(size, mutationRate) {
		this.population = new Population(size, mutationRate)
		this.world = new World(size)
		this.world.setBrains(this.population.brains)
		this.iteration = 0
	}

	frame() {
		this.world.trexList.map(trex => {
			let next = this.world.getNextObstacle(trex)
			let decision = trex.brain.generateAction(next.dist, next.type)
			trex.update(decision)
		})

		updateUI('#score', this.world.currScore)

		if (this.world.update()) {
			this.population.newGeneration()
			this.world.reset()
			this.world.setBrains(this.population.brains)
			updateUI('#score', 0)
			updateUI('#iteration', ++this.iteration)
		}

		// this.graphics.update(this.world.trexList, this.world.obstacles)
	}
}
