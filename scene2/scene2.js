var secondSceneFunctions = {};

secondSceneFunctions.animateCameraTargetToPosition = function(cam, speed, frameCount, newPos) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at3', cam, 'target', speed, frameCount, cam.target, newPos, 0, ease);
}

secondSceneFunctions.animateCameraToPosition = function(cam, speed, frameCount, newPos) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at2', cam, 'position', speed, frameCount, cam.position, newPos, 0, ease);
}

var createSecondScene = function (GameEngine) {

    // Create the scene space
    var scene = new BABYLON.Scene(GameEngine.engine);

    //Adding a light
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 15, 0), scene);
    light.intensity = 0.5;

    // Parameters : name, position, scene
    var camera = new BABYLON.ArcRotateCamera("camera2", -Math.PI/4, 1.1, 165, new BABYLON.Vector3(0, 0, -10), scene);
    camera.setPosition(new BABYLON.Vector3(0,20,0));
    camera.setTarget(new BABYLON.Vector3(0,10,150));
    camera.detachControl(GameEngine.canvas, true);


    // Add and manipulate meshes in the scene
    var front = BABYLON.MeshBuilder.CreateBox("box", {height: 90, width: 300, depth: 1}, scene);
    var back = BABYLON.MeshBuilder.CreateBox("box", {height: 90, width: 500, depth: 1}, scene);
    var left = BABYLON.MeshBuilder.CreateBox("box", {height: 90, width: 1, depth: 250}, scene);
    var right = BABYLON.MeshBuilder.CreateBox("box", {height: 90, width: 1, depth: 250}, scene);
    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 20, scene);
    var frontleft = BABYLON.MeshBuilder.CreateBox("box", {height: 90, width: 142, depth: 1}, scene);
    var cluster1 = BABYLON.MeshBuilder.CreateBox("box", {height: 30, width: 500, depth: 1}, scene);
    var cluster2 = BABYLON.MeshBuilder.CreateBox("box", {height: 60, width: 500, depth: 1}, scene);
    

    cluster1.position.z = 200;
    cluster2.position.z = 220;
    cluster1.position.y = -30;
    cluster2.rotation.x = 2 * Math.PI / 6;
    frontleft.position.z = 175;
    frontleft.position.x = 200;
    frontleft.rotation.y = Math.PI / 4;
    var frontright = frontleft.clone("box");
    frontright.position.z = 175;
    frontright.position.x = -200;
    frontright.rotation.y = -Math.PI / 4;
    front.position.z = 225;
    back.position.z = -125;
    left.position.x = -250;
    right.position.x = 250;
    ground.position.y = 45;
    var ceiling = ground.clone("ceiling");
	ceiling.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.LOCAL);
    ground.position.y = -45;
	



    var mat = new BABYLON.StandardMaterial("mat", scene);
    var texture = new BABYLON.Texture("https://i.imgur.com/qxB21gg.jpg", scene);
    mat.diffuseTexture = texture;

    var columns = 1;  // 6 columns
    var rows = 1;  // 4 rows

    var faceUV = new Array(6);

    //set all values to zero
    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
    }

    //overwrite wanted face with sprite coordinates
    faceUV[1] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
    };

    cluster2.material = mat;


    secondSceneFunctions.animateCameraToPosition(camera, 45, 300, new BABYLON.Vector3(-100, 20, 100));
    secondSceneFunctions.animateCameraTargetToPosition(camera, 45, 300, new BABYLON.Vector3(-100, 10, 150));
    
    GameAudio.sounds.intense1.play();
    setTimeout(function() {
        showCaption("Well, wires were connected, but can you deal with a task a bit faster? You are not going to finish another one… ");
        GameAudio.sounds.narrator3.play();
        setTimeout(function() {
            hideCaption();
            GameAudio.sounds.narrator3.pause();
            loadMinigame("minigame1.min.html");
        }, 8000);
    }, 5000);

    return scene;

};
