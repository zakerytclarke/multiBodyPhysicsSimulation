var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 




camera.position.z= 35;
//camera.position.x= 10;





function initializePhysicsObjects(){
    PHYSICS.objects.map(function(obj){
        var geometry = new THREE.SphereGeometry(obj.size||0, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
        var material = new THREE.MeshNormalMaterial();
        
        // const geometry = new THREE.SphereGeometry(obj.size||0);
        // const material = new THREE.MeshBasicMaterial( { color: obj.color||0xff0000 } );
        const sphere = new THREE.Mesh(geometry, material );
        scene.add(sphere);
        obj.renderer=sphere;
    });   

}

function distance(o1,o2){
    return Math.sqrt(Math.pow(o2.position.x-o1.position.x,2)+Math.pow(o2.position.y-o1.position.y,2)+Math.pow(o2.position.z-o1.position.z,2));
}

function evaluatePhyiscs(obj){
    
    //Object kinematics
    obj.position.x+=obj.velocity.x*PHYSICS.timeScale;
    obj.position.y+=obj.velocity.y*PHYSICS.timeScale;
    obj.position.z+=obj.velocity.z*PHYSICS.timeScale;

    obj.velocity.x+=obj.acceleration.x*PHYSICS.timeScale;
    obj.velocity.y+=obj.acceleration.y*PHYSICS.timeScale;
    obj.velocity.z+=obj.acceleration.z*PHYSICS.timeScale;
    
    obj.acceleration.x+=obj.jerk.x*PHYSICS.timeScale;
    obj.acceleration.y+=obj.jerk.y*PHYSICS.timeScale;
    obj.acceleration.z+=obj.jerk.z*PHYSICS.timeScale;

    //Gravity Interactions
    obj.position.y+=PHYSICS.scene.gravity*PHYSICS.timeScale;


    //Collision Interactions
    PHYSICS.objects.map(function(collisionObj){
        var distanceObjs=distance(obj,collisionObj);

        var vecX=obj.position.x-collisionObj.position.x;
        var vecY=obj.position.y-collisionObj.position.y;
        var vecZ=obj.position.z-collisionObj.position.z;

        if(distanceObjs>0&&distanceObjs<obj.size+collisionObj.size){
            obj.velocity.x*=-Math.abs(vecX);
            obj.velocity.y*=-Math.abs(vecY);
            obj.velocity.z*=-Math.abs(vecZ);
            
        }
    });   

}


function render(){
  requestAnimationFrame (render);
    
  PHYSICS.objects.map(function(obj){
    evaluatePhyiscs(obj);
    obj.renderer.position.x=obj.position.x;
    obj.renderer.position.y=obj.position.y;
    obj.renderer.position.z=obj.position.z;
  });   
 
  renderer.render (scene, camera);
}



initializePhysicsObjects();
render();