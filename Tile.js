function Tile(owner, bacteria, x, y) {
	this.owner = owner;
	this.bacteria = bacteria;
	this.x = x;
	this.y = y;
	this.neighbours = [];
}

Tile.prototype.canAttack = function(tile) {
	return this.owner !== tile.owner && this.bacteria > 1;
}

Tile.prototype.canTransfer = function(tile) {
	return this.owner === tile.owner && this.bacteria > 1;
}