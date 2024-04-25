// Importing necessary modules from the Three.js library.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js";

class BuildByL16H7N1N65 {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    // Set up Three.js environment
    this._threejs = new THREE.WebGLRenderer({ antialias: true });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setSize(window.innerWidth, window.innerHeight);
    this._threejs.setClearColor(new THREE.Color(0xeeeeee));
    document.body.appendChild(this._threejs.domElement);

    // Handling window resize event
    window.addEventListener("resize", () => this._OnWindowResize(), false);

    // Setting up the camera
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 20, 50);
    this._camera.lookAt(new THREE.Vector3(0, 20, 0));

    // Creating a scene to hold 3D objects
    this._scene = new THREE.Scene();

    // Setting up background image
    this._SetupBackground();

    // Setting up lights
    this._SetupLights();

    // Setting up controls for camera movement
    this._SetupControls();

    // Loading a 3D model
    this._LoadModel();

    // Adding a Play/Pause button
    this._playPauseButton = this._CreatePlayPauseButton();
    document.body.appendChild(this._playPauseButton);

    // Adding audio and control logic
    this._AddAudio();

    // Starting the rendering loop
    this._RAF();
  }

  // Creates and returns the Play/Pause button
  _CreatePlayPauseButton() {
    const button = document.createElement('button');
    button.innerText = 'Play';
    button.style.position = 'absolute';
    button.style.top = '20px';
    button.style.left = '20px';
    return button;
  }

  // Handling window resize event to adjust the camera and renderer size
  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  // Setting up the background image
  _SetupBackground() {
    const textureLoader = new THREE.TextureLoader();
    const backgroundImage = textureLoader.load('resources/logo.png');
    backgroundImage.repeat.set(6, 6);
    backgroundImage.wrapS = THREE.RepeatWrapping;
    backgroundImage.wrapT = THREE.RepeatWrapping;
    this._scene.background = backgroundImage;
  }

  // Setting up lights in the scene
  _SetupLights() {
    // Key light (main light source)
    let keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(20, 100, 10);
    keyLight.target.position.set(0, 0, 0);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.001;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 500.0;
    keyLight.shadow.camera.left = 100;
    keyLight.shadow.camera.right = -100;
    keyLight.shadow.camera.top = 100;
    keyLight.shadow.camera.bottom = -100;
    this._scene.add(keyLight);

    // Front light
    let frontLight = new THREE.DirectionalLight(0xffffff, 0.9);
    frontLight.position.set(0, 20, 50);
    this._scene.add(frontLight);

    // Ambient light for overall illumination
    let ambientLight = new THREE.AmbientLight(0x404040);
    this._scene.add(ambientLight);
  }

  // Setting up controls for camera movement
  _SetupControls() {
    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.target.set(0, 20, 0);
    this._controls.enablePan = false;
    this._controls.update();
  }

  // Loading a 3D model using GLTFLoader
  _LoadModel() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./resources/supreme2.glb", (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      this._scene.add(model);

      // Calculating camera position based on the bounding box of the loaded model
      this._SetupCameraPosition(model);
    });
  }

  // Setting up camera position based on the bounding box of the loaded model
  _SetupCameraPosition(model) {
    const boundingBox = new THREE.Box3().setFromObject(model);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this._camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    cameraZ *= 1.5;
    this._camera.position.set(center.x, center.y, center.z + cameraZ);
    this._controls.target.copy(center);
    this._controls.update();
  }

  // Adding audio to the scene and handling play/pause logic
  _AddAudio() {
    const listener = new THREE.AudioListener();
    this._camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('resources/intro2.mp3', (buffer) => {
      this._audio = new THREE.Audio(listener);
      this._audio.setBuffer(buffer);
      this._audio.setVolume(0.7);

      this._playPauseButton.addEventListener('click', () => {
        this._ToggleAudio();
      });

      this._threejs.domElement.addEventListener('animate', () => {
        this._CheckAudioCompletion();
      });
    });
  }

  _ToggleAudio() {
    if (this._audio.isPlaying) {
      this._audio.pause();
    } else {
      this._audio.play();
    }
  
    // Update button text based on audio state
    this._playPauseButton.innerText = this._audio.isPlaying ? 'Pause' : 'Play';
  }

  // Checking audio currentTime against its duration
  _CheckAudioCompletion() {
    if (this._audio.isPlaying && this._audio.currentTime === this._audio.duration) {
      this._ResetPlayPauseButton();
    }
  }

  // Resetting the Play/Pause button to initial position
  _ResetPlayPauseButton() {
    this._playPauseButton.innerText = 'Play';
  }

  // Rendering loop using requestAnimationFrame
  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

// Creating an instance of the BuildByL16H7N1N65 class when the DOM content is loaded.
let _APP = null;
window.addEventListener("DOMContentLoaded", () => {
  _APP = new BuildByL16H7N1N65();
});

