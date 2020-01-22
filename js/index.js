// $(document).ready(function() {
// 	var graphics = new Graphics('stage', 10)
//
// function body(x, y, length, width) {
// 	this.xAnchor = x
// 	this.yAnchor = y
// 	this.width = width
// 	this.height = length
// 	this.color = graphics.randColor()
// }
//
// let bodies  = []
// for (let i = 0; i < 10; ++i)
// 	bodies.push(new body(i* 10, 50, 10, 10))
//
// graphics.frame(bodies)
//
// })

let sim
function setup() {
	createCanvas(400, 100)
	sim = new Simulation(100, 0.15)
}

function draw() {
	sim.frame()
	sim.world.renderP5()
}
