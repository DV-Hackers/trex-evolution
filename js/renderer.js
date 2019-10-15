

class Graphic
{
	constructor(imageFile,xAdd= 0,yAdd = 0)
	{
		this.xAddition = xAdd;
		this.yAddition = yAdd;
		this.image = loadImage(imageFile);

		this.xPos = 0;
		this.yPos = 0;

		print(this.image.width);


	}

	output()
	{
		image(this.image, this.xPos - this.xAddition, this.yPos - this.yAddition);
		//image(this.image, x, y);
		//stroke(255,0,0);

		/*for (let x = 0; x < this.hitBox.length; x++)
		{
			point(this.xPos + x,this.yPos + this.hitBox[x]);
		}*/

		//line(this.xPos, this.yPos, this.xPos + this.image.width, this.yPos);
		//text(this.image.width, this.xPos, this.yPos + 20);
		//print(this.image.width);
	}




}






let dinosaur = [4];
let cactus = [6];
let ground = [5];
function preload()
{
	dinosaur[0] = new Graphic('Images/Dinosaur/dinosaurIdle.png',0,36);
	/*dinosaur[0].hitbox[0] = 5;
	dinosaur[0].hitbox[1] = 5;
	dinosaur[0].hitbox[3] = 6;*/

	dinosaur[1] = new Graphic('Images/Dinosaur/dinosaurRun1WB.png',0,36);
	dinosaur[2] = new Graphic('Images/Dinosaur/dinosaurRun2WB.png',0,36);
	dinosaur[3] = new Graphic('Images/Dinosaur/dinosaurLose.png',0,36);

	ground[0] = new Graphic('Images/ground.png');

	cactus[0] = new Graphic('Images/Cactus/smallCactusWB.png',0,25);
	cactus[1] = new Graphic('Images/Cactus/largeCactusWB.png',0,40);
	cactus[2] = new Graphic('Images/Cactus/twoSmallCactusWB.png',0,25);
	cactus[3] = new Graphic('Images/Cactus/twoLargeCactusWB.png',0,40);
	cactus[4] = new Graphic('Images/Cactus/threeCactusWB.png',0,25);
	cactus[5] = new Graphic('Images/Cactus/fourCactusWB.png',0,40);
}

function setup()
{
	createCanvas(500,500);
}

let xLand = 0;
let yLand = 300;
let cactusIndex = 1;

let dinosaurTimer = 0;
let dinosaurIndex = 2;

let yPotentialEnergy = 10;
let yVelocity = 0;
let yPosition = 0;

function draw()
{
	background(200);
	background(255);

	for (let i = -800; i <= 400; i += 400)
	{
		ground[0].xPos = xLand + i;
		ground[0].yPos = yLand;
		ground[0].output();
	}

	/*for (let i = 0 ; i < cactus.length; i++)
	{
		cactus[i].xPos = i * 50 + 50;
		cactus[i].yPos = i * 50 + 50;
		cactus[i].output();
	}*/

	cactus[cactusIndex].xPos = xLand - 72;
	cactus[cactusIndex].yPos = yLand;
	cactus[cactusIndex].output();

	text(yPotentialEnergy, 10, 20);
	text(yVelocity, 10, 40);
	text(yPosition, 10, 60);

	if (keyIsDown(32) && yPosition === 0)
		yPotentialEnergy = 10;

	yVelocity = -2*(10 - yPotentialEnergy) + 10;
	yPotentialEnergy -= 0.3;
	yPosition += yVelocity;

	if (yPosition < 0)
	{
		yPosition = 0;
		yPotentialEnergy = 0;
		yVelocity = 0;
	}


	dinosaur[dinosaurIndex].yPos = yLand - yPosition;

	if ((cactus[cactusIndex].xPos <= dinosaur[dinosaurIndex].xPos + dinosaur[dinosaurIndex].image.width) && (cactus[cactusIndex].xPos + cactus[cactusIndex].image.width) >= dinosaur[dinosaurIndex].xPos)
	{
		dinosaurIndex = 3;
	}
	else
	{

		if (dinosaurTimer === 5)
		{
			dinosaurTimer = 0;
			if (dinosaurIndex === 1)
				dinosaurIndex = 2;
			else
				dinosaurIndex = 1;
		}
		if (yPosition > 0)
		{
			dinosaurIndex = 0;
		}

		dinosaurTimer++;
	}

	dinosaur[dinosaurIndex].yPos = yLand - yPosition;

	dinosaur[dinosaurIndex].xPos = 100;

	dinosaur[dinosaurIndex].output();

	if (xLand <= 0)
	{
		xLand = 800;
		cactusIndex = floor(Math.random() * 6);
	}

	xLand -= 5;
	ellipse(mouseX, mouseY, 10, 10);

}
