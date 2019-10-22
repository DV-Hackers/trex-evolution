
// the function jump(index of dinosaur); makes one of the dinosaurs jump
const numberOfDinosaurs = 50;

const yLevel = 100;
const xLevel = 75;


const groundImage = [];
const userImage = [];
const obstacleImage = [];

const userHitbox = [];
userHitbox.push([0,30],[1,30],[2,32],[3,32],[4,34],[5,34],[6,36],[7,36],[8,38],[9,38],[10,46],[11,46],[12,46],[13,46],[14,46],[15,46],[16,46],[17,46],[18,46],[19,46],[20,46],[21,46],[22,46],[23,46],[24,34],[25,34],[26,31],[27,31],[28,26],[29,26],[30,26],[31,26],[32,18],[33,18],[34,18],[35,18],[36,14],[37,14],[38,14],[39,14]);

const obstacleHitbox = [];

obstacleHitbox.push([[0,13],[1,12],[8,1],[9,0],[13,0],[14,1],[20,11],[30,3],[31,2],[33,2],[34,3],[39,7],[51,6],[58,1],[59,0],[63,0],[64,1],[71,11],[72,12]]);
obstacleHitbox.push([[0,13],[1,12],[8,1],[9,0],[13,0],[14,1],[21,10],[22,11]]);
obstacleHitbox.push([[0,24],[1,23],[5,16],[6,15],[8,15],[9,16],[13,19],[14,20]]);
obstacleHitbox.push([[0,24],[1,23],[5,16],[6,15],[8,15],[9,16],[18,18],[22,16],[23,15],[25,15],[26,16],[35,18],[39,16],[40,15],[42,15],[43,16],[47,19],[48,20]]);
obstacleHitbox.push([[0,13],[1,12],[8,1],[9,0],[13,0],[14,1],[26,5],[33,1],[34,0],[38,0],[39,1],[46,10],[47,11]]);
obstacleHitbox.push([[0,24],[1,23],[5,16],[6,15],[8,15],[9,16],[18,19],[22,16],[23,15],[25,15],[26,16],[30,19],[31,20]]);

function preload()
{
	obstacleImage.push(loadImage('Images/Cactus/fourCactus.png'));
	obstacleImage.push(loadImage('Images/Cactus/largeCactus.png'));
	obstacleImage.push(loadImage('Images/Cactus/smallCactus.png'));
	obstacleImage.push(loadImage('Images/Cactus/threeCactus.png'));
	obstacleImage.push(loadImage('Images/Cactus/twoLargeCactus.png'));
	obstacleImage.push(loadImage('Images/Cactus/twoSmallCactus.png'));

	userImage.push(loadImage('Images/Dinosaur/dinosaurIdle.png'));
	userImage.push(loadImage('Images/Dinosaur/dinosaurLose.png'));
	userImage.push(loadImage('Images/Dinosaur/dinosaurRun1.png'));
	userImage.push(loadImage('Images/Dinosaur/dinosaurRun2.png'));

	groundImage.push(loadImage('Images/Ground/ground.png'));
}

class Graphic
{
	constructor(x = width, y = yLevel)
	{
		this.x = x;
		this.y = y;
		this.picture;
		this.hitbox;
	}

	move()
	{
		this.x -= 5;
	}

	show()
	{
		image(this.picture,this.x,this.y);
	}

	showHitbox()
	{
		stroke('red');
		for (let coord of this.hitbox)
			point(coord[0] + this.x, coord[1] + this.y);
		stroke(51);
	}

	get updatedHitbox()
	{
		let updatedHitbox = [];
		for (let coord of this.hitbox)
			updatedHitbox.push([coord[0] + this.x, coord[1] + this.y])


		return updatedHitbox
	}

}

class Ground extends Graphic
{
	constructor(x = width, y = yLevel, index = -1)
	{
		super(x, y);
		if (index === -1)
			this.picture = groundImage[Math.floor(Math.random()*groundImage.length)];
		else
			this.picture = groundImage[index];
	}

	good()
	{
		if (this.picture.width + this.x > 0)
			return true;
		else
			return false;
	}
}

class Obstacle extends Graphic
{
	constructor(x = width, y = yLevel, index = -1)
	{
		super(x, y);
		if (index === -1)
		{
			this.picture = obstacleImage[Math.floor(Math.random()*obstacleImage.length)]; // choose random image from list to be an obstacle
			this.hitbox = obstacleHitbox[obstacleImage.indexOf(this.picture)];
		}
		else
		{
			this.picture = obstacleImage[index];
			this.hitbox = obstacleHitbox[index];
		}
	}

	good()
	{
		if (this.picture.width + this.x > 0)
			return true;
		else
			return false;
	}
}

class User extends Graphic
{
	constructor(x = xLevel, y = yLevel)
	{
		super(x, y);
		this.jumpTimer = 10;

		this.pictureIndex = 0;
		this.pictureTimer = 0;
		this.pictureArray = userImage;
		this.picture = this.pictureArray[0];
		this.hitbox = userHitbox;

		this.score = 0;

		this.alive = true;
	}

	updateScore()
	{
		if (this.alive)
			this.score++;
	}

	show()
	{
		if (this.alive)
		{
			if (this.y < yLevel)
				this.pictureIndex = 0;
			else
			{
				if (this.pictureTimer >= 5)
				{
					if (this.pictureIndex === 2)
						this.pictureIndex = 3;
					else
						this.pictureIndex = 2;
					this.pictureTimer = 0;
				}
				this.pictureTimer++;
			}
		}
		else
			this.pictureIndex = 1;

		this.picture = this.pictureArray[this.pictureIndex];
		super.show();
	}

	move()
	{
		if (this.alive)
		{
			this.y += 2*this.jumpTimer - 10;
			this.jumpTimer += 0.3;

			if (this.y >= yLevel)
			{
				this.y = yLevel;
				this.jumpTimer = 10;
			}
		}
		else
		{
			super.move();
		}
	}

	jump()
	{
		this.jumpTimer = 0;
	}

	updateStatus(testHitbox)
	{
		if (!this.alive)
			return
		for (let dinoCoord of this.updatedHitbox)
		{
			for (let testCoord of testHitbox)
			{
				if (dinoCoord[0] === testCoord[0])
					if (dinoCoord[1] >= testCoord[1])
					{
						this.alive = false;
						return false;
					}
			}
		}

		return true;
	}
}

let dinosaur = [];
let cactus = [];
let ground = [];
let generation = 1;
function setup()
{
	createCanvas(600,500);
}

function draw()
{
	background(255);

	let alive = true;

	alive = false;
	for (let element of dinosaur)
		if (element.alive === true)
		{
			alive = true;
			break;
		}

	if (alive === false)
	{
		generation++;
		startNewGame()
	}


	while (ground.length*400 < width + 400)
		ground.push(new Ground(400*ground.length));


	for (let element of ground)
	{
		element.show();
		element.move();
	}

	if (!ground[0].good())
	{
		ground.shift();
	}

	if (cactus.length === 0)
		cactus.push(new Obstacle());

	for (let element of cactus)
	{
		if (cactus.length > 0)
		{
			for (let dinosaurMember of dinosaur)
				if (dinosaurMember.x + dinosaurMember.picture.width >= cactus[0].x && cactus[0].x + cactus[0].picture.width >= dinosaurMember.x)
					dinosaurMember.updateStatus(cactus[0].updatedHitbox);
		}
		element.show();
		element.move();
	}
	if (!cactus[0].good())
	{
		cactus.shift();
	}

	for (let element of dinosaur)
	{
		element.updateScore();
		element.show();
		element.move();
	}

	let i = 0;
	for (let column = 0; column < width; column += 200)
		for (let row = yLevel + 75; row < height; row += 15)
		{
			if (i >= dinosaur.length)
				break;
			text(`Gen ${generation} Dinosaur ${i} score: ${dinosaur[i].score}`,column,row);
			i++;
		}

}

function jump(index)
{
	if (index < dinosaur.length)
		dinosaur[index].jump();
	else
	{
		throw "you called an index that doesn't correspond to a dinosaur";
	}
}

function keyPressed()
{
	if (key >= 0 && key <= 9)
		if (dinosaur[key].y === yLevel)
			dinosaur[key].jump();
}

function startNewGame()
{
	dinosaur = [];
	cactus = [];
	ground = [];
	for (let i = 0; i < numberOfDinosaurs; i++)
		dinosaur.push(new User());
}
