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

function createLines(amount, lineSeg){
	//here we will have random lines connecting all elements
	var main_window = document.getElementById("window");
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	//math behind - each line will have X segments
}



window.addEventListener("load",function() {
	createSquares(4);
});