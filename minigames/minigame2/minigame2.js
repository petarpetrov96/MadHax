//TODO
/*
	Win condition
 
*/
var mousePosition;
var offset = [0,0];
var waterStart = [0,0];
var waterEnd = [0,0];

var containerStart= [0,0];
var containerEnd = [0,0];
var bucket; //THIS IS THE BUCKET ONE
var isDown = false;
var bucketHasWater = false;

function gameWrapper(){
	setUpGraphics();
}

function setUpGraphics(){
	var main_window = document.getElementById("window");
	
	//water
	var waterBackground = document.createElement("div");
	waterBackground.setAttribute("id","minigame2_water");
	waterBackground.style.width = "500px";
	waterBackground.style.height = "500px";
	main_window.appendChild(waterBackground);
	waterStart = [waterBackground.offsetLeft, waterBackground.offsetTop];
	containerStart = waterStart;
	waterEnd = [waterStart[0]+waterBackground.offsetWidth,
				waterStart[1]+waterBackground.offsetHeight];
	containerEnd = waterEnd;
	//water container
	var containerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	containerSvg.setAttribute("width","500");
	containerSvg.setAttribute("height","500");
	containerSvg.setAttribute('id','minigame2_container');
	var svgNS = containerSvg.namespaceURI;
	var polyline = document.createElementNS(svgNS,'polyline');
	polyline.setAttribute('points', 
								(waterStart[0]-195) + "," + (waterStart[1]-150) + " " +
								(waterStart[0]-195) + "," + (waterEnd[1]-145)+ " " + 
								(waterEnd[0]- 205) + "," + (waterEnd[1]-145) + " " + 
								(waterEnd[0]- 205) + "," + (waterStart[1]-150));

	polyline.setAttribute('style','fill:none;stroke:black;stroke-width:10');
	containerSvg.appendChild(polyline);
	main_window.appendChild(containerSvg);
		
	//"generator"
	var genSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	genSvg.setAttribute("width","100");
	genSvg.setAttribute("height","100");
	genSvg.setAttribute('id','minigame2_generator');
	var svgNS = genSvg.namespaceURI;
	var rect = document.createElementNS(svgNS,'rect');
	rect.setAttribute('x',0);
	rect.setAttribute('y',0);
	rect.setAttribute('width',100);
	rect.setAttribute('height',100);
	rect.setAttribute('fill','#000000');
		genSvg.appendChild(rect);
	

	//"bucket"
	/*
	svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width","100");
	svg.setAttribute("height","100");
	svg.style.position = "absolute";
	svg.setAttribute("id","minigame2_bucket");
	var svgNS = svg.namespaceURI;
	var rect = document.createElementNS(svgNS,'rect');
	rect.setAttribute('x',0);
	rect.setAttribute('y',0);
	rect.setAttribute('width',100);
	rect.setAttribute('height',100);
	rect.setAttribute('fill','#3b3b3b');
	svg.appendChild(rect);
	main_window.appendChild(svg);
	main_window.appendChild(genSvg);*/
	
	bucket = document.createElement("img");
	bucket.setAttribute("src","bucket_empty.png");
	bucket.setAttribute("width","100");
	bucket.setAttribute("height","100");
	bucket.style.position = "absolute";
	bucket.setAttribute("id","minigame2_bucket");
	main_window.appendChild(bucket);
	main_window.appendChild(genSvg);
}

function setUpInstructions(){
	var main_window = document.getElementById("window");
	var instructions = document.createElement("p");
	instructions.innerHTML = "Instructions: Oh no! Our generator is flooded with water. Use your trusty grey bucket to empty all the water. " + 
							"Drag the bucket in and out of the tank to drain the water. Drain all the water!";
	main_window.appendChild(instructions);
}

function fillBucket(){
	bucketHasWater = true;
	//make water go down a little
	var gameWindow = document.getElementById("window");
	var waterDiv = gameWindow.firstElementChild;
	var newHeight = waterDiv.offsetHeight - 50;
	waterDiv.style.height = newHeight + "px";
	waterDiv.style.marginTop = (500 - newHeight);
	var waterBackground = document.getElementById("minigame2_water");
	waterStart = [waterBackground.offsetLeft, waterBackground.offsetTop];
	waterEnd = [waterStart[0]+waterBackground.offsetWidth,
				waterStart[1]+waterBackground.offsetHeight];

}

function emptyBucket(){
	bucket.setAttribute("src","bucket_empty.png");
	bucketHasWater = false;
	var gameWindow = document.getElementById("window");
	var waterDiv = gameWindow.firstElementChild;
	var newHeight = waterDiv.offsetHeight - 50;
	if(newHeight < 0){
		minigameSuccess();
	}
}

function isBucketInWater(bucketX,bucketY){
	return ((bucketX >= waterStart[0] && bucketX <= waterEnd[0]) &&
			 (bucketY >= waterStart[1] && bucketY <= waterEnd[1]))
}

function isBucketOutsideContainer(bucketX,bucketY){
	return (!(bucketX >= containerStart[0] && bucketX <= containerEnd[0]) ||
			 !(bucketY+50 >= containerStart[1] && bucketY <= containerEnd[1]))
}

function minigameFail(){
}

function minigameSuccess() {}


window.addEventListener('load',function(){

	gameWrapper();
	setUpInstructions();
	document.addEventListener('mouseup', function() {
		isDown = false; 
		}, true);

	document.addEventListener('mousemove', function(event) {
		
		event.preventDefault();
		if (isDown) {
			mousePosition = {
				x : event.clientX,
				y : event.clientY
			};
			bucketX = (mousePosition.x + offset[0])
			bucketY = (mousePosition.y + offset[1])
			bucket.style.left = bucketX + 'px';
			bucket.style.top  = bucketY + 'px';
			if(!bucketHasWater && isBucketInWater(bucketX,bucketY)){
				bucket.setAttribute("src","bucket_full.png");
				fillBucket();
			}
			else if(bucketHasWater && isBucketOutsideContainer(bucketX,bucketY)){
				emptyBucket();
			}
		}
	}, true);

	bucket.addEventListener('mousedown', function(e) {
		isDown = true;
		var svgRect = bucket.getBoundingClientRect();
		offset = [
			svgRect.x - e.clientX,
			svgRect.y - e.clientY
		];
	}, true);
});