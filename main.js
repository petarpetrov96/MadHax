var GameEngine = {
    engine: null,
    canvas: null,
    scene: null,
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

window.addEventListener("load", function() {
    GameEngine.canvas = document.getElementById("renderCanvas");
    GameEngine.engine = new BABYLON.Engine(GameEngine.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    GameEngine.loadNextScene(createFirstScene);
});

window.addEventListener("keyup", function(event) {
    if(event.keyCode==65) {
        GameEngine.loadNextScene(createFirstScene);
    }
});

window.addEventListener("resize", function() {
    if(GameEngine.engine) { GameEngine.engine.resize(); }
});