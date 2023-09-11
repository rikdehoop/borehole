import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import data from './assets/DataInJSON.json';

data = data

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

// const light = new THREE.SpotLight()
// light.position.set(5, 5, 5)
// scene.add(light)

const params = {
    color: '#acacac'
  };
scene.background = new THREE.Color( params.color );
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 16
camera.position.y = 8
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'None'
document.body.appendChild(labelRenderer.domElement)
const renderer = new THREE.WebGLRenderer()

// renderer.physicallyCorrectLights = true // is now deprecated since Three r150. Use renderer.useLegacyLights = false instead.
// renderer.useLegacyLights = false

renderer.shadowMap.enabled = true

renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// const label = document.createElement('p');
// label.className = 'tooltip';
// const div = document.createElement('div');
// div.appendChild(label)
 
// const mousePos = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();

// window.addEventListener('mousemove', function(e){
//     mousePos.x = (e.clientX / this.window.innerWidth) * 2 - 1;
//     mousePos.y = (e.clientY / this.window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mousePos, camera);
//     const intersects = raycaster.intersectObject(group)
// })



// const divContainer = new CSS2DObject(div)
// scene.add(divContainer);
// divContainer.position.set(0,-6,0);

const loader = new GLTFLoader()
loader.load(
    'AI_generated_BHM.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            const m = (child)
            if (m.isMesh) {
                if (m.parent && m.parent.name == 'generated_CSVbh_data') {
                    if (m.name.length == 6) {
                        let i = parseInt(m.name[5])-1

                        m.userData.myCustomData = {
                            z : data[i].Z,
                            x : data[i].X,
                            y : data[i].Y,
                            lithology : data[i].Lithology,
                            stratigraphy : data[i].Stratigraphy,
                            stage : data[i].Stage
                          };
                    }
                    if (m.name.length == 7) {
                        
                        let i = parseInt(m.name.slice(5, 7))-1
                        
                        m.userData.myCustomData = {
                            z : data[i].Z,
                            x : data[i].X,
                            y : data[i].Y,
                            lithology : data[i].Lithology,
                            stratigraphy : data[i].Stratigraphy,
                            stage : data[i].Stage
                          };
                    }
                    const pntlabel = document.createElement('p')
                    pntlabel.textContent = m.userData.myCustomData.lithology;
                    const div = document.createElement('div')
                    div.appendChild(pntlabel)
                    const divContainer = new CSS2DObject(div)
                    divContainer.position.set(child.position.x/1000000, child.position.y/1000000, child.position.z/1000000)
                    child.add(divContainer)
                    // const label = new CSS2DObject(pntlabel)
                    

                    
                    
                    console.log(`Parent Name: ${m.parent.name}`);

                } else {
                    console.log("Ignoring this object");
                }

                // console.log(m)
                m.receiveShadow = true
                m.castShadow = true
            }
            if (((child)).isLight) {
                const l = (child)
                l.castShadow = true
                l.shadow.bias = -.003
                l.shadow.mapSize.width = 2048
                l.shadow.mapSize.height = 2048
            }
        })
        // console.log(gltf.scene);
        scene.add(gltf.scene)
        

    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    scene.rotation.y += 0.0012;
    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    
}

animate()