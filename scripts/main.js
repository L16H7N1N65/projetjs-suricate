// Importing the necessary modules from the Three.js library.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js";

// Define a class named BuildByL16H7N1N65

class BuildByL16H7N1N65 {
  // Constructor method is called when an instance of the class is created.
  constructor() {
    // Initialize the Three.js environment by calling the _Initialize method.
    this._Initialize();
  }

  // Method to set up the Three.js scene and rendering.
  _Initialize() {
    // Create a WebGLRenderer for rendering the 3D graphics.
    this._threejs = new THREE.WebGLRenderer({
      antialias: true, // Enable antialiasing for smoother edges.
    });
    
    // Enable shadows in the scene.
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows for a more realistic look.

    // Set the size of the renderer to match the window size.
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    // Set the background color of the scene to light gray.
    this._threejs.setClearColor(new THREE.Color(0xeeeeee));

    // Append the renderer's DOM element to the document body.
    document.body.appendChild(this._threejs.domElement);

    // Add a listener to resize the renderer when the window size changes.
    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    // Set up the camera with perspective projection.
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 20, 50); // Set initial camera position.
    this._camera.lookAt(new THREE.Vector3(0, 20, 0)); // Make the camera look at the center of the scene.

    // Create a Three.js scene.
    this._scene = new THREE.Scene();

    // Create a directional light (main light source) with shadows.
    let keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(20, 100, 10); // Set the position of the light.
    keyLight.target.position.set(0, 0, 0); // Set the light's target.
    keyLight.castShadow = true; // Enable shadow casting.
    keyLight.shadow.bias = -0.001; // Bias to reduce shadow artifacts.
    keyLight.shadow.mapSize.width = 2048; // Shadow map size.
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1; // Near and far planes for shadow camera.
    keyLight.shadow.camera.far = 500.0;
    keyLight.shadow.camera.left = 100; // Orthographic shadow camera parameters.
    keyLight.shadow.camera.right = -100;
    keyLight.shadow.camera.top = 100;
    keyLight.shadow.camera.bottom = -100;
    this._scene.add(keyLight);

    

    // Create an additional light from the front.
    let frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(0, 20, 50); // Adjust position.
    this._scene.add(frontLight);

    // Create ambient light to add some overall illumination.
    let ambientLight = new THREE.AmbientLight(0x404040);
    this._scene.add(ambientLight);

    // Create OrbitControls for easy camera navigation.
    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.enablePan = false;
    controls.update();

   // Add a background image
const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('resources/logo.png');
this._scene.background = backgroundImage;

    // Set the scene background color and load a 3D model using GLTFLoader.
    this._scene.background = new THREE.Color(0xffffff);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./resources/supreme2.glb", (gltf) => {
      // Retrieve the loaded 3D model from the GLTF file.
      const model = gltf.scene;
      model.position.set(0, 0, 0); // Set the initial position of the model.
      this._scene.add(model); // Add the model to the scene.

      // Set the camera position based on the bounding box of the loaded model.
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());

      // Calculate the camera position to frame the model appropriately.
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = this._camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

      cameraZ *= 1.5; // Adjust the multiplier for the desired distance.

      // Set the camera position, target, and update controls.
      this._camera.position.set(center.x, center.y, center.z + cameraZ);
      controls.target.copy(center);
      controls.update();
    });

    // Start the rendering loop.
    this._RAF();
  }

  // Method to handle window resize events.
  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  // Rendering loop method using requestAnimationFrame.
  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF(); // Call itself recursively for continuous rendering.
    });
  }
}

// Create an instance of the BasicWorldDemo class when the DOM content is loaded.
let _APP = null;
window.addEventListener("DOMContentLoaded", () => {
  _APP = new BuildByL16H7N1N65();
});
