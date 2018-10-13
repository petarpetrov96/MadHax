//make a window with valves


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
	svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width","100");
	svg.setAttribute("height","100");
	svg.style.position = "absolute";
	var svgNS = svg.namespaceURI;
	var rect = document.createElementNS(svgNS,'rect');
	rect.setAttribute('x',0);
	rect.setAttribute('y',0);
	rect.setAttribute('width',100);
	rect.setAttribute('height',100);
	rect.setAttribute('fill','#3b3b3b');
	svg.appendChild(rect);
	main_window.appendChild(svg);
	main_window.appendChild(genSvg);
}






window.addEventListener('load',function(){
	setUpGraphics();
});
