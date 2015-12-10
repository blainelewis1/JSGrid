function Action(from, to, amount) {
	this.from = from;
	this.to = to;
	this.amount = amount;
}


/* Attack */

function Attack(from, to , amount){
	Action.call(this, from, to, amount);
};

Attack.prototype = Object.create(Action.prototype);
Attack.constructor = Attack;

Attack.prototype.perform = function() { 
	//Must be two different players, from can't be neutral
	if(this.from.owner === Tile.prototype.neutral){
		return;
	} else if(this.from.owner === this.to.owner) {
		new Transfer(this.from, this.to, this.amount).perform();
	} else {
		
		if(this.amount >= this.from.bacteria){
			this.amount = this.from.bacteria - 1;
		}

		this.bacteria -= this.amount;
		//TODO: better attacking logic.
		this.to.bacteria -= this.amount;
		
		if(this.to.bacteria < 0) { 
			this.to.owner = this.from.owner;
			this.to.bacteria *= -1;
		} else if(this.to.bacteria == 0){
			this.to.owner = Tile.prototype.neutral;
		}
	}
};

/* End Attack */

/* Transfer */


function Transfer(from, to, amount){
	Action.call(this, from, to, amount);
};

Transfer.prototype = Object.create(Action.prototype);
Transfer.constructor = Transfer;

Transfer.prototype.perform = function() {
	if(this.from.owner === Tile.prototype.neutral) {
		return;
	} else if(this.from.owner !== this.to.owner) {
		new Attack(this.from, this.to, this.amount).perform();
	} else {
		
		if(this.amount >= this.from.bacteria){
			this.amount = this.from.bacteria - 1;
		}

		this.from.bacteria -= this.amount;
		this.to.bacteria += this.amount;
	}
};

/* End Transfer */


/* DoNothing */

function DoNothing(tile) {
	this.tile = tile;
};

DoNothing.prototype = Object.create(Action.prototype);
DoNothing.constructor = DoNothing;

DoNothing.prototype.perform = function() {
	this.tile.bacteria = Math.ceil(this.tile.bacteria * Tile.prototype.growthRate);
};

/* End DoNothing */