var playerCoords = [0,0];
var dict;

function maze(x,y) {
    var n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
    var verti=[]; for (var j= 0; j<y+1; j++) verti[j]= [];
    var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    var path= [here];
    var unvisited= [];
    for (var j= 0; j<x+2; j++) {
        unvisited[j]= [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }
    while (0<n) {
        var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors= [];
        for (var j= 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n= n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else 
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here= next);
        } else 
            here= path.pop();
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
}

//(y,x) = (j-1)/2, (k-2)/4 or (j,k) = (2y+1),(4x+2)
function display(m,playerCoords) {
    var text= [];
    for (var j= 0; j<m.x*2+1; j++) {
        var line= []; //horizontal line
        if (0 == j%2) //these are the walls
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4) 
                    line[k]= '+';
                else
                    if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
                        line[k]= ' ';
                    else
                        line[k]= '-';
        else //these are the spaces
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4) //edge
                    if (k>0 && m.horiz[(j-1)/2][k/4-1])
                        line[k]= ' ';
                    else
                        line[k]= '|';
				//here we change the player display
                else if(4*playerCoords[0]+2 == k && 2*playerCoords[1]+1 == j)
					line[k]= 'P'; //player
				else
                    line[k]= ' '; //HERE IS EMPTY SPACE
        if (0 == j) line[1]= line[2]= line[3]= ' ';
        if (m.x*2-1 == j) line[4*m.y]= ' ';
        text.push(line.join('')+'\r\n');
    }
    return text.join('');
}

function setUpInstructions(){
	var main_window = document.getElementById("window");
	var instructions = document.createElement("p");
	instructions.innerHTML = "Instructions: You got lost in the nuclear maze. Don't worry, this happens to all of us. " + 
							"Use the arrow keys to find your way out.";
	main_window.appendChild(instructions);
}

function gameWrapper(){
	setUpInstructions();
	dict = maze(8,11);	
	document.getElementById('out').innerHTML = display(dict,playerCoords); 
	console.log(dict);	
}

function move(direction){
	pX = playerCoords[0];
	pY = playerCoords[1];
	
	if(direction == 37){ //left
		//check if above me is a wall. If so, do nothing
		if(pX == 0 || typeof dict.horiz[pY][pX-1] === 'undefined')
		{ 
			console.log("WALL");
		}
		else {
			playerCoords[0] = playerCoords[0] - 1;
			document.getElementById('out').innerHTML = display(dict,playerCoords); //doesn't work
		}
	}
	
	if(direction == 38){ //up	
		//check if above me is a wall. If so, do nothing
		if(pY == 0 || typeof dict.verti[pY-1][pX] === 'undefined')
		{ 
			console.log("WALL");
		}
		else {
			playerCoords[1] = playerCoords[1] - 1;
			document.getElementById('out').innerHTML = display(dict,playerCoords); //doesn't work
		}
	}
	
	if(direction == 39){ //right
		//check if above me is a wall. If so, do nothing
		if(pX == dict.y-1 || typeof dict.horiz[pY][pX] === 'undefined')
		{ 
			console.log("WALL");
		}
		else {
			playerCoords[0] = playerCoords[0] + 1;
			document.getElementById('out').innerHTML = display(dict,playerCoords); //doesn't work
		}
	}
	
	if(direction == 40){ //down	
		//check if above me is a wall. If so, do nothing
		if(pY == dict.x-1 || typeof dict.verti[pY][pX] === 'undefined')
		{ 
			console.log("WALL");
		}
		else {
			playerCoords[1] = playerCoords[1] + 1;
			document.getElementById('out').innerHTML = display(dict,playerCoords); //doesn't work
		}
	}
	
	checkFinalPos();
}

function checkFinalPos(){
	if(playerCoords[0] == dict.y-1 && playerCoords[1] == dict.x-1){ //swapped on purpose
		minigameSuccess();
	}
}

function minigameSuccess(){}

window.addEventListener('load',function(){
	gameWrapper();
});

window.addEventListener("keyup", function(event){
	var keycode = event.keyCode;
	move(keycode);
});