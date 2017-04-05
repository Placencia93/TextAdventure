//gameboard
var gameboard = [
    // 0      1      2      3      4      5      6      7
	["wall","wall","wall","door","door","wall","wall","wall"],//0
	["wall","path","wall","path","path","wall","path","wall"],//1
	["wall","path","wall","path","path","wall","path","wall"],//2
	["wall","path","task","path","path","path","path","wall"],//3
	["wall","path","path","path","path","task","path","wall"],//4
	["wall","path","wall","path","path","wall","path","wall"],//5
	["wall","task","wall","item","path","path","item","wall"],//6
	["wall","wall","wall","wall","wall","wall","wall","wall"],//7
];
//variables
var row = Math.floor(Math.random()*6)+1;
var col = Math.floor(Math.random()*6)+1;
	console.log(gameboard[row][col]);
	
var onPath = false;
//checking for path
while(onPath == true){
	if(gameboard[row][col] === "path"){
		onPath = true;
	}else{
		row = Math.floor(Math.random()*6)+1;
		col = Math.floor(Math.random()*6)+1;
	}
}

//functions
function errorCheck(move,row,col,gameboard){
	var moveCheck = move;
	var rowCheck = row;
	var colCheck = col;
	var gameboardCheck = gameboard;
	
	if(moveCheck == "up"){rowCheck--}
	if(moveCheck == "down"){rowCheck++}
	if(moveCheck == "left"){colCheck--}
	if(moveCheck == "right"){colCheck++}
	
	
	if(gameboardCheck[rowCheck][colCheck] == "wall"){
		return true;
	}
	else{
		return false;
	}
}

function print(x){
	console.log(x);
}

//hazards
function triviaHazard(){
	
	var name = "Video Game Trivia(easy)"
	console.log(name);
	var question = "What is the name of the second 3D legend of zelda game that came out on the nintendo 64? \n 1. Ocarina Of Time \n 2. Majora's Mask \n 3. Wind Waker"
	var correctA = "majora's mask"
	var answer = prompt(question);
	if(answer == "2"){
		return true;
	}else{
		return false;
	}
	
}

//monsters
var tentcileMonster = {
	name:"Tenticle Monster",
	health : 10,
	attackName : " Tenticle Whip",
	attackdamage : 3
	
}

var winCondition = false;
var playerDied = false;
var end = false;
//Starting Game
var playerName = prompt("What is your name adventurer");
console.log(playerName);
document.write("<h3>Welcome Adventurer: "+playerName+"</h3>");

var player = {
	health : 25,
	attackName : "spaghetti punch",
	items : [],
	attackPower : 0
}
//Other Variables
var count = 0;
var winCondition = false;
var playerDied = false;
var end = false;

//Items
var item1 = false;
var item2 = false;

//create Table for the first time
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < 8; i++){
        var tr = tbl.insertRow();
		
        for(var j = 0; j < 8; j++){
            if(i == row && j == col){
				var td = tr.insertCell();
                td.appendChild(document.createTextNode("^-^"));
                td.style.border = '1px solid black';
            }
			else if(gameboard[i][j] == "wall"){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("////"));
                td.style.border = '1px solid black';
            }			
			else if(gameboard[i][j] == "door"){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("[[]]"));
                td.style.border = '1px solid black'; 
            }
			else{
				var td = tr.insertCell();
                td.appendChild(document.createTextNode("___"));//gameboard[i][j]
                td.style.border = '1px solid black';
			}
        }
    }
    body.appendChild(tbl);

//create table function
function tableCreate(body,row, col, gameboard){
    //var body = document.body,
    tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < 8; i++){
        var tr = tbl.insertRow();
		
        for(var j = 0; j < 8; j++){
            if(i == row && j == col){
				var td = tr.insertCell();
                td.appendChild(document.createTextNode("^-^"));
                td.style.border = '1px solid black';
            } 
			else if(gameboard[i][j] == "wall"){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("////"));
                td.style.border = '1px solid black';
            }
			else if(gameboard[i][j] == "door"){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("[[]]"));
                td.style.border = '1px solid black'; 
            }
			else{
				var td = tr.insertCell();
                td.appendChild(document.createTextNode("___"));
                td.style.border = '1px solid black';
			}
        }
    }
    body.appendChild(tbl);
}

function changeText(x) {
    document.getElementById("p1").innerHTML = x;
}
//gamelogic
function up(){
	
	var move = "up";
	var error = errorCheck(move,row,col,gameboard);
	
	if(move == "end"){
		end = true;
	}
	
	if(error === false){
		if(move == "up"){row--}
		if(move == "down"){row++}
		if(move == "left"){col--}
		if(move == "right"){col++}
		
		var tile = gameboard[row][col];
		if(tile == "task"){
			answer = prompt("your about to take on a task...\n Challenge? Yes or No ")
			if(answer == "yes"){
				var answer = triviaHazard();
				if(answer == true){
					var correct = "Correct ^_^";
					changeText(correct);
				}
				else{
					var wrong = "Wrong -_-";
					changeText(wrong);
				}
				console.log(answer);
			}
		}
		if(tile == "item"){
			if(row == 6 && col == 3 && item1 == false){
				var foundKey1 = "You found the a key on the floor\n good job ^_^";
				changeText(foundKey1);
				player.items.push("key1");
				item1 = true;
				console.log("Count: "+count+" Items: "+player.items.forEach(print));
			}
			
		}
		
		//tableDelete();
		body.removeChild(tbl);
		tableCreate(body,row,col,gameboard);
		
	}
	else{
		//alert("You hit a wall");
		var wallHit = "You hit a wall\n";
		changeText(wallHit);
		
	}
	console.log("Row: "+row+"  Col: "+col+"  Gameboard: "+gameboard[row][col]+"  Move: "+move+"  Error: "+error);
	
}
function down(){
	
	var move = "down";
	var error = errorCheck(move,row,col,gameboard);
	
	if(move == "end"){
		end = true;
	}
	
	if(error === false){
		if(move == "up"){row--}
		if(move == "down"){row++}
		if(move == "left"){col--}
		if(move == "right"){col++}
		
		var tile = gameboard[row][col];
		if(tile == "task"){
			answer = prompt("your about to take on a task...\n Challenge? Yes or No ")
			if(answer == "yes"){
				var answer = triviaHazard();
				if(answer == true){
					var correct = "Correct ^_^";
					changeText(correct);
				}
				else{
					var wrong = "Wrong -_-";
					changeText(wrong);
				}
				console.log(answer);
			}
		}
		if(tile == "item"){
			if(row == 6 && col == 3 && item1 == false){
				var foundKey1 = "You found the a key on the floor\n good job ^_^";
				changeText(foundKey1);
				player.items.push("key1");
				item1 = true;
				console.log("Count: "+count+" Items: "+player.items.forEach(print));
			}
			
		}
		
		//tableDelete();
		body.removeChild(tbl);
		tableCreate(body,row,col,gameboard);
		
	}
	else{
		//alert("You hit a wall");
		var wallHit = "You hit a wall\n";
		changeText(wallHit);
		
	}
	console.log("Row: "+row+"  Col: "+col+"  Gameboard: "+gameboard[row][col]+"  Move: "+move+"  Error: "+error);
	
}
function left(){
	
	var move = "left";
	var error = errorCheck(move,row,col,gameboard);
	
	if(move == "end"){
		end = true;
	}
	
	if(error === false){
		if(move == "up"){row--}
		if(move == "down"){row++}
		if(move == "left"){col--}
		if(move == "right"){col++}
		
		var tile = gameboard[row][col];
		if(tile == "task"){
			answer = prompt("your about to take on a task...\n Challenge? Yes or No ")
			if(answer == "yes"){
				var answer = triviaHazard();
				if(answer == true){
					var correct = "Correct ^_^";
					changeText(correct);
				}
				else{
					var wrong = "Wrong -_-";
					changeText(wrong);
				}
				console.log(answer);
			}
		}
		if(tile == "item"){
			if(row == 6 && col == 3 && item1 == false){
				var foundKey1 = "You found the a key on the floor\n good job ^_^";
				changeText(foundKey1);
				player.items.push("key1");
				item1 = true;
				console.log("Count: "+count+" Items: "+player.items.forEach(print));
			}
			
		}
		
		//tableDelete();
		body.removeChild(tbl);
		tableCreate(body,row,col,gameboard);
		
	}
	else{
		//alert("You hit a wall");
		var wallHit = "You hit a wall\n";
		changeText(wallHit);
		
	}
	console.log("Row: "+row+"  Col: "+col+"  Gameboard: "+gameboard[row][col]+"  Move: "+move+"  Error: "+error);
	
}
function right(){
	
	var move = "right";
	var error = errorCheck(move,row,col,gameboard);
	
	if(move == "end"){
		end = true;
	}
	
	if(error === false){
		if(move == "up"){row--}
		if(move == "down"){row++}
		if(move == "left"){col--}
		if(move == "right"){col++}
		
		var tile = gameboard[row][col];
		if(tile == "task"){
			answer = prompt("your about to take on a task...\n Challenge? Yes or No ")
			if(answer == "yes"){
				var answer = triviaHazard();
				if(answer == true){
					var correct = "Correct ^_^";
					changeText(correct);
				}
				else{
					var wrong = "Wrong -_-";
					changeText(wrong);
				}
				console.log(answer);
			}
		}
		if(tile == "item"){
			if(row == 6 && col == 3 && item1 == false){
				var foundKey1 = "You found the a key on the floor\n good job ^_^";
				changeText(foundKey1);
				player.items.push("key1");
				item1 = true;
				console.log("Count: "+count+" Items: "+player.items.forEach(print));
			}
			
		}
		
		//tableDelete();
		body.removeChild(tbl);
		tableCreate(body,row,col,gameboard);
		
	}
	else{
		//alert("You hit a wall");
		var wallHit = "You hit a wall\n";
		changeText(wallHit);
		
	}
	console.log("Row: "+row+"  Col: "+col+"  Gameboard: "+gameboard[row][col]+"  Move: "+move+"  Error: "+error);
	
}
/*
	ideas: 3d array to tell to track movement
*/