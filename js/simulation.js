class Population {
	constructor(size, rate) {
		this.size = size
		this.brains = Array.from({length: size}).map(() => {
			return {
				genAction: () => Math.floor(Math.random() * 2)
			}
		})
	}

	newGeneration() {
		this.brains = Array.from({length: this.size}).map(() => {
			return {
				genAction: () => Math.floor(Math.random() * 3)
			}
		})
	}
}

class Simulation {
	constructor(size, mutationRate) {
		this.population = new Population(size, mutationRate)
		this.world = new World(size)
		this.world.setBrains(this.population.brains)
	}

	frame() {
		this.world.trexList.map(trex => {
			let next = this.world.getNextObstacle(trex)
			let decision = trex.brain.genAction(next)
			trex.update(decision)
		})

		if (this.world.update()) {
			this.population.newGeneration()
			this.world.reset()
			this.world.setBrains(this.population.brains)
		}

		// this.graphics.update(this.world.trexList, this.world.obstacles)
	}
}