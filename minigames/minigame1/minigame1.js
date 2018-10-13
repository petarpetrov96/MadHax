//create 4 squares which will spawn in the middle
function createSquares(amount){
	var main_window = document.getElementById("window");
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
		rect.setAttribute('fill','#95B3D7');
		svg.appendChild(rect);
		main_window.appendChild(svg);
	}
}

function createLines(amount, lineSegs){
	//here we will have random lines connecting all elements
	var main_window = document.getElementById("window");
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	//math behind - each line will have X segments connecting random sequences. Each sequence needs to get a different segment than itself
	
}

//returns 4 arrays where the numbers are not repeating
function createLineSegments(amount, lineSegs){
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
		console.log(arrays[i]);
		var good = false;
		//shuffle the ordered array until we get an arrangement which works with previous segments
		while(!good){
			randomArray = shuffleArray(orderedArray);
			good = true;
			for(var j = 0; j < amount; j++){
				if(arrays[j][i+1] === randomArray[j]) good = false;
			}
		}
		//now we have a good arangement, so add the elements
		for(var j = 0; j < amount; j++){
			arrays[i][j] = randomArray[j];
		}
	}
	return arrays;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
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

//TODO: Add a function that calls when minigame is overs


window.addEventListener('load',function(){
	createSquares(4);
});
//