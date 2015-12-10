function Map(gridSize) {
	this.tiles = [];
	this.players = [];
	this.neutral = new NeutralPlayer();
	this.startingPoints = [{x : 0, y : 0}, {x : gridSize - 1, y : gridSize - 1}, 
					       {x : gridSize - 1, y : 0}, {x : 0, y : gridSize - 1}];
	this.gridSize = gridSize;
	this.neighbourDirections = [{x : -1, y : 0}, {x : 0, y : -1}, {x : 1, y : 0}, {x : 0, y : 1}];

	this.lastStarter = 0;

	Tile.prototype.neutral = this.neutral;
};

Map.prototype.init = function() {

	for(var i = 0; i < this.gridSize; i++){
		this.tiles.push([]);
		for(var j = 0; j < this.gridSize; j++){
			this.tiles[i].push(new Tile(this.neutral, 1, j, i));
		}
	}

	for(var i = 0; i < this.players.length; i++){
		this.players[i].id = i;
		var startingPoint = this.startingPoints[i];
		this.tiles[startingPoint.y][startingPoint.x].owner = this.players[i];
		
	}

	this.initNeighbours();

};

Map.prototype.doTurn = function() {
	//TODO: for each tile controlled by a player, let them act on it. Determine an acting order as well

	tiles = [];
	for(var i = 0; i < this.players.length; i++){
		tiles.push([]);
	}

	for(var i = 0; i < this.gridSize; i++){
		for(var j = 0; j < this.gridSize; j++){
			owner = this.tiles[i][j].owner;

			if(owner === Tile.prototype.neutral) {
				continue;
			}

			tiles[owner.id].push(this.tiles[i][j]);
		}
	}

	//console.log("Tiles found");

	var actionQueues = [];

	for (var i = 0; i < this.players.length; i++) {
		actionQueues.push(this.players[i].act(tiles[i]));
	}

	//console.log("Action Queues Created");

	//console.log(actionQueues);

	var actionsTaken = true;
	while(actionsTaken){
		actionsTaken = false;

		for(var i = 0; i < this.players.length; i++) {
			
			playerId = (i + this.lastStarter) % this.players.length;

			if(actionQueues[playerId].length > 0){
				actionQueues[playerId].pop().perform();
				actionsTaken = true;
			}
		}
	}

	//console.log("Action queues emptied");

	this.lastStarter = (this.lastStarter + 1) % this.players.length;
};

Map.prototype.addPlayer = function(player) {
	if(this.players.length > this.startingPoints.length){
		console.log("Not enough starting points!");
	} else {
		this.players.push(player);
	}
};

Map.prototype.initNeighbours = function () {
	for(var i = 0; i < this.gridSize; i++){
		this.tiles.push([]);
		for(var j = 0; j < this.gridSize; j++){
			this.tiles[i][j].neighbours = this.getNeighbours(j,i);
		}
	}
};

Map.prototype.getNeighbours = function(x, y) {
	neighbours = [];

	for(var i = 0; i < this.neighbourDirections.length; i++) {
		var dir = this.neighbourDirections[i];
		
		if(this.tiles[y + dir.y] !== undefined && this.tiles[y + dir.y][x + dir.x] !== undefined) {
			neighbours.push(this.tiles[y + dir.y][x + dir.x]);
		}

	}

	return neighbours;
};
