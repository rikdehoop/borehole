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


renderer.shadowMap.enabled = true

renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const _litho_ = {};
_litho_['layer6'] = 'f1';
_litho_['layer5'] = 'f2';
_litho_['layer4'] = 'f3';
_litho_['layer3'] = 'f4';
_litho_['layer2'] = 'f5';
_litho_['layer1'] = 'f6';

const _material_ = {};
_material_ ['layer6'] = 'Material_4.002';
_material_ ['layer5'] = 'Material_3';
_material_ ['layer4'] = 'Material_4';
_material_ ['layer3'] = 'Material_3.001';
_material_ ['layer2'] = 'Material_2';
_material_ ['layer1'] = 'Material_0';

const _mat_ = {};
const loadedMeshes = [];
const lab = [];
const loader = new GLTFLoader()
loader.load(
    'Borehole3D_Model_Mercator.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            const m = (child)
            const pntlabel = document.createElement('p')
            const div = document.createElement('div')
            const divContainer = new CSS2DObject(div)
        
 
            if (m.isMesh) {
                if (m.parent.name == 'VDH40Holes_Collars2_Downhole_Geology') {
                    console.log(m)
                    
                    if (m.material.name == _material_.layer1) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer1
                          };
                          lab.push(_litho_.layer1);
                       
                      
                    }
                    if (m.material.name == _material_.layer2) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer2
                          };
                          lab.push(_litho_.layer2);
                          
                     
                    }
                    if (m.material.name == _material_.layer3) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer3
                          };
                          lab.push(_litho_.layer3);
                    }
                    if (m.material.name == _material_.layer4) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer4
                          };
                          lab.push(_litho_.layer4);
                    }
                    if (m.material.name == _material_.layer5) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer5
                          };
                          lab.push(_litho_.layer5);
                    }
                    if (m.material.name == _material_.layer6) {
                        m.userData.myCustomData = {
                            lithology : _litho_.layer6
                          };
                          lab.push(_litho_.layer6);
                    }
                    
                    // console.log(`Parent Name: ${m.parent.name}`);

                } else {
                    console.log('ingnore');
                }

                if (m.isMesh && m.parent.name == 'xyz_dept_ref') {

                    pntlabel.textContent = (Math.round(m.position.z));
                    div.appendChild(pntlabel)
                    divContainer.position.set((m.position.x/1000),(m.position.z/1000),-(m.position.y/1000))
                    scene.add(divContainer)
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
        loadedMeshes.push(gltf.scene);
        

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
