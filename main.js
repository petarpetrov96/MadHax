var GameEngine = {
    engine: null,
    canvas: null,
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

window.addEventListener("load", function() {
    GameEngine.canvas = document.getElementById("renderCanvas");
    GameEngine.engine = new BABYLON.Engine(GameEngine.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    var scene = createScene(GameEngine);

    GameEngine.engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });
    setTimeout(function() {
        document.getElementById("minigameblocker").style.display="none";
        document.getElementById("minigame").style.display="none";
    },5000);
});

// Resize
window.addEventListener("resize", function () {
    if(GameEngine.engine) { GameEngine.engine.resize(); }
});