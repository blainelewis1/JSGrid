function Player(color1, color2){
	this.color1 = color1;
	this.color2 = color2;
}

Player.prototype.act = function(tiles) {console.log("This must be overriden!!")};

function BlaineBot() {
	Player.call(this, "#112211", "#EEFFEE");
}

BlaineBot.prototype = Object.create(Player.prototype);
BlaineBot.constructor = BlaineBot;

function RandomBot() {
	Player.call(this, "#333366", "#9999CC");
}


RandomBot.prototype = Object.create(Player.prototype);
RandomBot.constructor = RandomBot;

RandomBot.prototype.act = function(tiles) {
	
	actionsQueue = [];


	for (var i = 0; i < tiles.length; i++){
	
		var possibleActions = [];
		var tile = tiles[i];

		for(var j = 0; j < tile.neighbours.length; j++) {

			if(tile.canAttack(tile.neighbours[j])){
				possibleActions.push(new Attack(tile, tile.neighbours[j], tile.bacteria - 1));
			}

			if(tile.canTransfer(tile.neighbours[j])){
				possibleActions.push(new Transfer(tile, tile.neighbours[j], tile.bacteria - 1));
			}

		}

		possibleActions.push(new DoNothing(tile));
		actionsQueue.push(Utils.getRandomElement(possibleActions));
	}

	return actionsQueue;
}

function NeutralPlayer() {
	Player.call(this, "#DDDDDD", "#DDDDDD");
}

NeutralPlayer.prototype = Object.create(Player.prototype);
NeutralPlayer.constructor = NeutralPlayer;
