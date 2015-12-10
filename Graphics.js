function Graphics(canvas, context, map, drawBacteriaAmount){
	this.canvas = canvas;
	this.context = context;
	this.map = map;
	this.tileSize = (canvas.width - 10) / map.gridSize; 
	this.drawBacteriaAmount = drawBacteriaAmount;
	context.translate(1,1);
}


Graphics.prototype.drawMap = function () {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);       

	for (var y = 0; y < this.map.tiles.length; y++) {
		for (var x = 0; x < this.map.tiles[y].length; x++) {
			this.drawTile(this.map.tiles[y][x]);
		}
	}
}

Graphics.prototype.drawTile = function(tile) {
	if(tile.owner === Tile.prototype.neutral){
		this.context.fillStyle = tile.owner.color1;
	} else {
		this.context.fillStyle = Utils.shadeBlend(1/tile.bacteria, tile.owner.color1, tile.owner.color2);
	}

	this.context.strokeStyle = "#666666";
	this.context.lineWidth = "0.5";

	this.context.strokeRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
	this.context.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);

	if(this.drawBacteriaAmount){
		var padding = this.tileSize / 2; // For both sides
		var fontSize = this.tileSize - padding;

		this.context.fillStyle = "#333333";
		this.context.font = fontSize + "px Helvetica";
		this.context.textAlign = "center";
		this.context.baseline = "middle";

		var offset = fontSize;
		
		this.context.fillText(tile.bacteria, tile.x * this.tileSize + offset, tile.y * this.tileSize + offset);
	}
}