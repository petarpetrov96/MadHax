var startingSquare;

//create 4 squares which will spawn in the middle
function createSquares(amount, id,last=false){
	var main_window = document.getElementById("window");
	var div = document.createElement("div");
	div.setAttribute("id","minigame_squares" + id);
	for(var i = 0; i < amount; i++){
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width","100");
		svg.setAttribute("height","100");
		var svgNS = svg.namespaceURI;
		var rect = document.createElementNS(svgNS,'rect');
		rect.setAttribute('x',5);
		rect.setAttribute('y',5);
		rect.setAttribute('width',100);
		rect.setAttribute('height',100);
		if(i == startingSquare && id == 0)
			rect.setAttribute('fill','#cc99ff');
		else {
			rect.setAttribute('fill','#95B3D7');
		}
		if(last && i === startingSquare){
			rect.setAttribute("onclick","userClick(false)");
		}
		if(last && i !== startingSquare){
			rect.setAttribute("onclick","userClick(true)");
		}
		svg.appendChild(rect);
		div.appendChild(svg);
	}
	main_window.appendChild(div);
}

//creates lines connecting squares
function createLines(amount, lineSegs,id){
	//here we will have random lines connecting all elements
	var main_window = document.getElementById("window");
	var div = document.createElement("div");
	div.setAttribute("id","minigame_lines" + id);
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width","400");
	svg.setAttribute("height","100");
	var segmentArray = createLineSegments(amount,lineSegs,startingSquare);
	for(var i = 0; i < amount; i++){
		createLineFromArray(segmentArray[i],svg);
		div.appendChild(svg);
	}
	main_window.appendChild(div);
}

//returns 4 arrays where the numbers are not repeating
function createLineSegments(amount, lineSegs, startSquare){
	//instantiate the arrays with initial points
	var arrays = new Array(amount);
	for(var i = 0; i < amount; i++){
		arrays[i] = new Array(lineSegs+2).fill(-1);
		arrays[i][0] = i;
	}
	//iteratively add elements. For each line segment:
	for(var i = 0; i < lineSegs+1; i++){
		//create an ordered array
		var orderedArray = new Array(); //this is the constant array [0,1,2,3,...]
		for(var j = 0; j < amount; j++){
			orderedArray[j] = j;
		}
		var good = false;
		//shuffle the ordered array until we get an arrangement which works with previous segments
		while(!good){
			randomArray = shuffleArray(orderedArray);
			good = true;
			for(var j = 0; j < amount; j++){
				if(arrays[j][i] === randomArray[j]) good = false;
			}
		}
		//now we have a good arangement, so add the elements. Now i'm adding them rowwise, want to add them column wise
		for(var j = 0; j < amount; j++){
			arrays[j][i+1] = randomArray[j];
		}
	}
	console.log(startingSquare);
	console.log(arrays);
	startingSquare = arrays[startSquare][lineSegs+1]; // set starting square to the last;
	console.log(startingSquare);
	return arrays;
}

function createLineFromArray(lineArray, svg){
	var svgNS = svg.namespaceURI;
	var segs = lineArray.length-1;
	for(var i = 0; i < segs; i++){
		var line = document.createElementNS(svgNS,'line');
		line.setAttribute('x1',50 + lineArray[i]*100);
		line.setAttribute('y1',i*(100*1.0)/(segs));
		line.setAttribute('x2',50 + lineArray[i+1]*100);
		line.setAttribute('y2',(i+1)*(100*1.0)/(segs));
		line.setAttribute('style','stroke:rgb(255,0,0);stroke-width:2');
		svg.appendChild(line);
	}
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Taken from Stack Overflow.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}

	
//determine which one is correct
// pick an arbitrary starting point, see what it connects to through the arrays

function gameWrapper(squares,lineSegs){
	//this is the starting square, we want to propagate through the line segments to the final square.
	startingSquare = Math.floor(Math.random() * (squares)); //now I have to propagate this through squares
	createSquares(squares,0);
	createLines(squares,lineSegs,1);
	createSquares(squares,2);
	createLines(squares,lineSegs,3);
	createSquares(squares,4,last=true);
	
	//console.log(startingSquare);
}

function userClick(success){
	if(success){
		alert("YOU SUCCESSFULLY CLICKED THE RIGHT BUTTON. YOU DON'T LOSE YET);
	}
	else{
		alert("WRONG. NOW YOU GO TO GULAG")
	}
}

//TODO: Add a function that calls when minigame is over


window.addEventListener('load',function(){
	gameWrapper(4,0);
});
//