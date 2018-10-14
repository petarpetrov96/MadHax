var GameEngine = {
    engine: null,
    canvas: null,
    scene: null,
    camera: null,
};

GameEngine.loadNextScene = function(createSceneFunction) {
    if(GameEngine.scene) {
        GameEngine.scene.dispose();
    }
    GameEngine.scene = createSceneFunction(GameEngine);
    GameEngine.engine.stopRenderLoop();
    GameEngine.engine.runRenderLoop(function() {
        if(GameEngine.scene) {
            GameEngine.scene.render();
        }
    });
};

function startGame() {
    if(GameAudio.ready != GameAudio.expected) {
        setTimeout(startGame, 500);
        return;
    }
    //GameEngine.loadNextScene(createSecondScene);
    GameAudio.sounds.intro.play();
    showCaption("There was a casual day for Joe Trumpet. He was at ease in his usual position, looking around if everything is fine with his one and only true love – nuclear reactor.");
    GameAudio.sounds.narrator1.play();
    setTimeout(function() {
        GameAudio.sounds.narrator1.pause();
        hideCaption();
        GameEngine.loadNextScene(createFirstScene);
    },12000);
}

window.addEventListener("load", function() {
    GameEngine.canvas = document.getElementById("renderCanvas");
    GameEngine.engine = new BABYLON.Engine(GameEngine.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    startGame();
});

window.addEventListener("keyup", function(event) {
    if(event.keyCode==65) {
        GameEngine.loadNextScene(createFirstScene);
    }
});

window.addEventListener("resize", function() {
    if(GameEngine.engine) { GameEngine.engine.resize(); }
});