var turnsPerSecond = 2;
var timePerTurn = 1000 / turnsPerSecond;

var interval;
var map;
var graphics;
var turn;

Tile.prototype.growthRate = 1.1;

init();



function tick() {

	map.doTurn();
	graphics.drawMap();

	turn++;
}

function init() {
	map = new Map(20);

	turn = 0;
	
	player1 = new RandomBot();
	player2 = new RandomBot();

	player1.color1 = "#336633"; 
	player1.color2 = "#99CC99";

	map.addPlayer(player1);
	map.addPlayer(player2);

	map.init();

	graphics = new Graphics(document.getElementById("canvas"), canvas.getContext("2d"), map, false);
	
	interval = setInterval(tick, timePerTurn);
}


function updateTurnsPerFrame(){
	console.log($('#turnsPerSecond').val);

	clearInterval(interval);
	turnsPerSecond = parseInt($('#turnsPerSecond').val());
	timePerTurn = 1000 / turnsPerSecond;
	interval = setInterval(tick, timePerTurn);
}





