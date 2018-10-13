var firstSceneFunctions = {};

firstSceneFunctions.buildChimney = function(diameterBottom, diameterMiddle, diameterTop, height, centerX, centerY, centerZ, scene) {
    var mesh;
    mesh = BABYLON.MeshBuilder.CreateCylinder("chimney", {
        height: height*3/5,
        diameterBottom: diameterBottom,
        diameterTop: diameterMiddle,
        tessellation: 36,
        subdivisions: 10,
    }, scene);
    mesh.position.x = centerX;
    mesh.position.y = centerY+(height*1.5/5);
    mesh.position.z = centerZ;
    mesh = BABYLON.MeshBuilder.CreateCylinder("chimney", {
        height: height*2/5,
        diameterBottom: diameterMiddle,
        diameterTop: diameterTop,
        tessellation: 36,
        subdivisions: 40,
    }, scene);
    mesh.position.x = centerX;
    mesh.position.y = centerY + (height*4/5);
    mesh.position.z = centerZ;
};

var createFirstScene = function(GameEngine) {
    var scene = new BABYLON.Scene(GameEngine.engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, -100), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(GameEngine.canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);
    light.ambient = new BABYLON.Color3(0.8, 0.8, 0.8);
    
    firstSceneFunctions.buildChimney(40,28,30,60,0,0,0,scene);
    firstSceneFunctions.buildChimney(40,28,30,60,100,0,0,scene);
    var mainbuilding = BABYLON.MeshBuilder.CreateBox("mainbuilding",{
        width: 70,
        height: 25,
        depth: 60,
    }, scene);
    mainbuilding.position.x = 50;
    mainbuilding.position.y = 12.5;
    mainbuilding.position.z = 30;

    return scene;
};