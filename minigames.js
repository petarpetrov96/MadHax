var showMinigame = function() {
    document.getElementById("minigameblocker").style.display="block";
    document.getElementById("minigame").style.display="block";
};

var hideMinigame = function() {
    document.getElementById("minigameblocker").style.display="none";
    document.getElementById("minigame").style.display="none";
};

var executeAllScripts = function(element) {
    var scripts = element.getElementsByTagName("script");
    for(var i=0;i<scripts.length;i++) {
        eval(scripts[i].innerHTML);
    }
};

var loadMinigame = function(name) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET",name,true);
    ajax.onreadystatechange=function() {
        if(ajax.readyState==4) {
            document.getElementById("minigame").innerHTML=ajax.responseText;
            executeAllScripts(document.getElementById("minigame"));
            showMinigame();
        }
    };
    ajax.send(null);
};

var unloadMinigame = function() {
    hideMinigame();
    document.getElementById("minigame").innerHTML = "";
}

/* window.addEventListener("load",function() {
    loadMinigame("minigame1.min.html");
}); */