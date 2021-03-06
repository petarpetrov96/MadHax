var connections = shuffleArray(new Array(0,1,2,3,4));
var faulty = getFaultyIndeces();
var faultyValves = faulty.length;
var repairRate = [0,0,0,0,0];
var inspect = false;
var repair = false;

function setUp(){
	var main_window = document.getElementById("window");
	
	var waterRect = document.createElement("div");
	waterRect.setAttribute("id","minigame4_water");
	
	var left_valves = document.createElement("div");
	left_valves.setAttribute("id","minigame4_left_valves");
	for(var i = 0; i<5; i++){
	(function () {
		var index = i; 
		var valve_normal = document.createElement("img");
		valve_normal.setAttribute("src","valve_normal.png");
		valve_normal.setAttribute("id","minigame4_left_valve" + i);
		valve_normal.setAttribute("class","minigame4_left_valve");
		valve_normal.addEventListener("click",function(){
			leftValveClick(index);
		});
		left_valves.appendChild(valve_normal);
	})();
	}
	
	var right_valves = document.createElement("div");
	right_valves.setAttribute("id","minigame4_right_valves");
	for(var i = 0; i<5; i++){
		var valve_normal = document.createElement("img");
		valve_normal.setAttribute("src","valve_normal.png");
		valve_normal.setAttribute("id","minigame4_right_valve" + i);
		valve_normal.setAttribute("class","minigame4_right_valve");
		right_valves.appendChild(valve_normal);
	}
	
	var inspectTool = document.createElement("img");
	inspectTool.setAttribute("id","minigame4_inspection");
	inspectTool.setAttribute("src","inspection.png");
	inspectTool.addEventListener("click",function(){
		selectInspect();
	});
	
	var repairTool = document.createElement("img");
	repairTool.setAttribute("id","minigame4_repair");
	repairTool.setAttribute("src","wrench.png");
	repairTool.addEventListener("click",function(){
		selectRepair();
	});
	
	main_window.appendChild(left_valves);
	main_window.appendChild(waterRect);
	main_window.appendChild(right_valves);
	
	main_window.appendChild(inspectTool);
	main_window.appendChild(repairTool);
	
	
}

function setUpSvg(){
	var main_window = document.getElementById("window");
	//from each valve
	//get coords from valve midpoints
	var containerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	containerSvg.setAttribute("width","500");
	containerSvg.setAttribute("height","600");
	containerSvg.setAttribute('id','minigame4_pipeline');
	var svgNS = containerSvg.namespaceURI;
	for(var i = 0; i < 5; i++){
		var polyline = document.createElementNS(svgNS,'polyline');
		polyline.setAttribute('points', 
								(0) + "," + (60 + i*120) + " " +
								(200) + "," + (290+(i+1)*4) + " " + 
								(300) + "," + (290+(i+1)*4) + " " + 
								(500) + "," + (60 + i*120));

		polyline.setAttribute('style','fill:none;stroke:black;stroke-width:10');
		containerSvg.appendChild(polyline);
	}
	
	main_window.appendChild(containerSvg);
}

function setUpInstructions(){
	var main_window = document.getElementById("window");
	var instructions = document.createElement("p");
	instructions.innerHTML = "Instructions: select the inspection tool to inspect the valves on the left. " + 
							"Inspecting takes 2 seconds. Once you find the broken valves, select the repair tool to repair them. " + 
							"Repairing takes 5 clicks. Repair all the valves to win!";
	main_window.appendChild(instructions);
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

function leftValveClick(index){
	if(!inspect)return;
	if(faulty.indexOf(index) > -1){
		setTimeout(function(){
			var ind = connections[index];
			var right_valves = document.getElementById("minigame4_right_valves");
			var img = right_valves.childNodes[ind];
			img.setAttribute("src","valve_broken.png");
			img.addEventListener("click",function(){
				repairValve(ind);
			});
		}, 2000);
		
	}
	else{
		setTimeout(function(){
			var ind = connections[index];
			var right_valves = document.getElementById("minigame4_right_valves");
			var img = right_valves.childNodes[ind];
			img.setAttribute("src","valve_working.png");
		}, 2000);
	}
}

function getFaultyIndeces(){
	var noOfFaulty = Math.floor(Math.random() * 3)+1;
	var shuffled = shuffleArray(new Array(0,1,2,3,4));
	return shuffled.slice(0, noOfFaulty);;
	
}

function selectInspect(){
	var rpr = document.getElementById("minigame4_repair");
	var ins = document.getElementById("minigame4_inspection");
	if(repair){
		repair = false;
		rpr.style.border = "solid 5px black";
	} 
	if(!inspect){ 
		inspect = true;
		ins.style.border = "solid 5px green";
	}
	else {
		inspect = false;
		ins.style.border = "solid 5px black";
	}
}

function selectRepair(){
	var rpr = document.getElementById("minigame4_repair");
	var ins = document.getElementById("minigame4_inspection");
	if(inspect){
		inspect = false;
		ins.style.border = "solid 5px black";
	}
	if(!repair){
		repair = true;
		rpr.style.border = "solid 5px green";
	}
	else {
		repair = false;
		rpr.style.border = "solid 5px black";
	}
}

function repairValve(ind){
	if(!repair) return;
	if(repairRate[ind] == 4){
		var right_valves = document.getElementById("minigame4_right_valves");
		var img = right_valves.childNodes[ind];
		img.setAttribute("src","valve_working.png");
		faultyValves-=1;
		if(faultyValves === 0){minigameSuccess();}
	}
	else{
		repairRate[ind]++;
	}
}

function minigameSuccess(){}

window.addEventListener('load',function(){
	setUpInstructions();
	setUp();
	setUpSvg();
	
});
