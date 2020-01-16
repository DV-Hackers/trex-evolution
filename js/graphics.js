class Graphics {
	constructor(canvasId, groundLevel) {
		this.canvas = document.getElementById(canvasId)
		this.setupCtx()
		this.width =  this.canvas.width
		this.height = this.canvas.height
		this.groundLevel = this.height - groundLevel

	}

	frame(bodies) {
		this.ctx.clearRect(0, 0, this.width, this.height)

		// draw ground
		this.ctx.beginPath()
		this.ctx.moveTo(0, this.groundLevel)
		this.ctx.lineTo(this.width, this.groundLevel)
		this.ctx.stroke()

		// draw bodies
		bodies.forEach(body => {
			body.color ? this.ctx.fillStyle = body.color : this.ctx.fillStyle = '#000'
			this.ctx.fillRect(body.xAnchor, this.height - body.yAnchor, body.width, body.height)
		})
	}

	fixDpi() {
		let dpi = window.devicePixelRatio
    let styleHeight = getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2)
    let styleWidth = getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2)
    this.canvas.setAttribute('height', styleHeight * dpi)
    this.canvas.setAttribute('width', styleWidth * dpi)
	}

	randColor() {
		var letters = '0123456789ABCDEF'
		var color = '#'
		for (var i = 0; i < 6; i++)
				color += letters[Math.floor(Math.random() * 16)]
		return color
	}

	setupCtx() {
		let dpr = window.devicePixelRatio || 1
		let rect = this.canvas.getBoundingClientRect()
		this.canvas.width = rect.width * dpr
		this.canvas.height = rect.height * dpr

		this.ctx = this.canvas.getContext('2d')
		this.ctx.scale(dpr, dpr)
	}
}