var GameEngine = {
    engine: null,
    canvas: null,
    scene: null,
};

var createScene = function (GameEngine) {
    var scene = new BABYLON.Scene(GameEngine.engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(GameEngine.canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1.0, 0.0, 0.0);
    light.ambient = new BABYLON.Color3(0.5, 0.1, 0.1);
    light.intensity = 0.7;

    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 1;

    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    return scene;
};

var createScene2 = function(GameEngine) {
    var scene = new BABYLON.Scene(GameEngine.engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(GameEngine.canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1.0, 0.0, 0.0);
    light.ambient = new BABYLON.Color3(0.5, 0.1, 0.1);
    light.intensity = 0.7;

    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    return scene;
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
    GameEngine.loadNextScene(createScene);
    setTimeout(function() {
        document.getElementById("minigameblocker").style.display="none";
        document.getElementById("minigame").style.display="none";
    },5000);
});

window.addEventListener("keyup", function(event) {
    if(event.keyCode==68) {
        GameEngine.loadNextScene(createScene);
    }
    else if(event.keyCode==70) {
        GameEngine.loadNextScene(createScene2);
    }
});

window.addEventListener("resize", function() {
    if(GameEngine.engine) { GameEngine.engine.resize(); }
});