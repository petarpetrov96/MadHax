var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    //Adding a light
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 15, 0), scene);
    light.intensity = 0.5;

    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

// Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

// Attach the camera to the canvas
    camera.attachControl(canvas, true);


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



    return scene;

};
