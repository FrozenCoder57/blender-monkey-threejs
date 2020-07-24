
let conf = {
  blenderFilePath: '/blender/'
}



let monkey, paused = false;

let scene = new THREE.Scene();
const light = new THREE.DirectionalLight('#ffffff',0.9);
light.position.set(-20,50,100);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objLoader = new THREE.OBJLoader();
objLoader.setPath(conf.blenderFilePath);

const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath(conf.blenderFilePath);

void new Promise(resolve=> {
  mtlLoader.load('monkey.mtl', materials => {
    resolve(materials);
  })
}).then(materials=> {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.load('monkey.obj', obj=>{
      monkey = obj;
      scene.add(obj);
  })
})

let aframe = null;

function render() {
  draw();
  aframe = requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function draw(){
  if(monkey) {
    monkey.rotation.y += 0.01;
  }
}

function pause() {
  cancelAnimationFrame(aframe);
}
function resume() {
  aframe = requestAnimationFrame(render);
}

function toggle() {
  if(paused) {
    resume();
    paused = false;
    return;
  }
  pause();
  paused = true;
}

render();

window.onload = function(){
  window.onclick = function() {
    toggle();
  }
}