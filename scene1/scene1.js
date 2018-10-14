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

firstSceneFunctions.animateCameraTargetToPosition = function(cam, speed, frameCount, newPos) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at5', cam, 'target', speed, frameCount, cam.target, newPos, 0, ease);
}

firstSceneFunctions.animateCameraToPosition = function(cam, speed, frameCount, newPos) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at4', cam, 'position', speed, frameCount, cam.position, newPos, 0, ease);
}

var createFirstScene = function(GameEngine) {
    var scene = new BABYLON.Scene(GameEngine.engine);
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI/4, 1.1, 165, new BABYLON.Vector3(0, 70, -140), scene);
    camera.setTarget(new BABYLON.Vector3(50,25,0));
    camera.detachControl(GameEngine.canvas, true);

    var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(50, 50, -30), scene);
    light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);
    light.ambient = new BABYLON.Color3(0.8, 0.8, 0.8);
    light.intensity = 0.5;
    
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
    
    var greenery = new BABYLON.StandardMaterial(scene);
    greenery.alpha = 1;
    greenery.diffuseColor = new BABYLON.Color3(0.10, 0.58, 0.27);
    greenery.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    greenery.ambientColor = new BABYLON.Color3(0.10, 0.58, 0.27);
    
    var ground = BABYLON.MeshBuilder.CreateBox("ground",{
        width: 1000,
        height: 0.1,
        depth: 1000,
    }, scene);
    ground.position.x = 0;
    ground.position.y = -0.05;
    ground.position.z = 0;
    ground.material = greenery;
    
    firstSceneFunctions.animateCameraToPosition(camera, 45, 900, new BABYLON.Vector3(50, 10, -30));
    firstSceneFunctions.animateCameraTargetToPosition(camera, 45, 900, new BABYLON.Vector3(50, 0, 0));
    
    setTimeout(function() {
        showCaption("But suddenly Joe noticed that something really terrible is happening… Joe knows that he being strong independent man is the only one who can prevent power plant from enormous disaster.");
        GameAudio.sounds.narrator2.play();
        setTimeout(function() {
            hideCaption();
            GameAudio.sounds.narrator2.pause();
            GameAudio.sounds.intro.pause();
            GameEngine.loadNextScene(createSecondScene);
        }, 11000);
    }, 15000);
    return scene;
};