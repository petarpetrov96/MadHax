var GameAudio = {ready:0,expected:0,sounds:{}};

function audioLoaded() {
    GameAudio.ready++;
}

window.addEventListener("load",function() {
    var audioList = {
        "beep":"audio/beep.mp3",
        "earthquake": "audio/earthquake.mp3",
        "intense0": "audio/intense0.mp3",
        "intense1": "audio/intense1.mp3",
        "intense2": "audio/intense2.mp3",
        "intense3": "audio/intense3.mp3",
        "intense4": "audio/intense4.mp3",
        "intro": "audio/intro.mp3",
        "narrator1": "audio/narrator/1.mp3",
        "narrator2": "audio/narrator/2.mp3",
        "narrator3": "audio/narrator/3.mp3",
        "narrator4": "audio/narrator/4.mp3",
        "narrator5": "audio/narrator/5.mp3",
        "narrator6": "audio/narrator/6.mp3",
        "narrator7": "audio/narrator/7.mp3",
        "narrator8": "audio/narrator/8.mp3",
        "narrator9": "audio/narrator/9.mp3",
        "narrator10": "audio/narrator/10.mp3"
    };
    for(var i=0;i<Object.keys(audioList).length;i++) {
        var key = Object.keys(audioList)[i];
        var value = audioList[key];
        GameAudio.sounds[key] = new Audio();
        GameAudio.sounds[key].src = value;
        GameAudio.sounds[key].addEventListener('canplaythrough', audioLoaded, false);
    }
    GameAudio.expected = Object.keys(audioList).length;
});