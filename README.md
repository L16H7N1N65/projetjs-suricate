Project Documentation: Sneaker Viewer / Online Store

Introduction

With the assignment to complete an online store, we found it intriguing to push the boundaries and initiate ourselves with new competencies. As part of our initiative, we have also provided a new extensive database to enhance the overall functionality of the online store.

Project Overview
The project aims to enhance the online store experience by integrating 3D elements. We took the initiative to showcase an iconic Uptempo model in collaboration with Nike and Supreme, blending street style with cutting-edge design. The integration of the Three.js library allows for an immersive 3D experience, elevating the online platform where style seamlessly meets the streets.

Technical Overview
Technologies Used
Three.js Library: Utilized for 3D graphics rendering, camera control, and model loading.
OrbitControls: Integrated for easy camera navigation in the scene.
GLTFLoader: Employed to load 3D models in the glTF format.
WebGLRenderer: Implemented for rendering 3D graphics in the browser.
Blender: Used for 3D model creation and editing.
Tinkercad: Employed for training and understanding 3D modelling concepts.
CapCut: Utilized for video montage.
Eleven Labs.io: Used for voice generation.
Database: A new extensive database has been implemented to enhance the functionality of the online store.
Code Structure
The code is structured into a class named BuildByL16H7N1N65, encapsulating the entire project. Key methods include:

_Initialize: Sets up the Three.js environment, initializes the camera, creates a scene, and loads 3D models.
_SetupBackground: Configures the background image.
_SetupLights: Sets up lighting conditions in the scene.
_SetupControls: Initializes camera controls for user interaction.
_LoadModel: Loads a 3D model using GLTFLoader.
_SetupCameraPosition: Positions the camera based on the bounding box of the loaded model.
_AddAudio: Integrates audio functionality, allowing users to play/pause an accompanying soundtrack.
_ToggleAudio: Toggles between play and pause for the audio.
_CheckAudioCompletion: Monitors audio playback to reset the Play/Pause button upon completion.
_ResetPlayPauseButton: Resets the Play/Pause button to its initial state.
_RAF: Initiates the rendering loop using requestAnimationFrame.
Additional Features
Play/Pause Button
A Play/Pause button has been added to control the background audio. Clicking the button toggles between play and pause states, providing us with control over the accompanying soundtrack.

Database Integration
An extensive database has been implemented to enhance the overall functionality of the online store. This includes features such as product catalogue management, user authentication, and order processing.

Challenges Faced
As beginner web development students, the following challenges were encountered:

Camera Positioning: Determining the optimal camera position based on the loaded 3D model required understanding the bounding box and adjusting for an appropriate perspective.

Audio Integration: Implementing audio playback and synchronization with the Play/Pause button involved dealing with asynchronous events and ensuring proper button state updates.

User Controls: Setting up user controls for camera movement using OrbitControls requires understanding the library's usage and customization.

3D Modeling: Learning Blender for 3D modelling was challenging, but Tinkercad provided a stepping stone to grasp fundamental concepts.

Sources and References
The following websites and tools were instrumental in the development of this project:

Three.js Documentation
MDN Web Docs
Stack Overflow
Blender Documentation
Tinkercad Learning Platform
CapCut
Eleven Labs.io
These sources provided valuable insights, code snippets, and training resources throughout our development process.

Conclusion
As students tasked with creating an online store, this project enabled us to go beyond our competencies. Our journey involved overcoming challenges, learning new tools, and creating an engaging online experience for sneakers enthusiasts. Additionally, the implementation of an extensive database enhances the overall functionality of the online store, providing a robust platform for users.

L16H7N1N65 & Chr1stopherPerez

Enjoy exploring the 3D sneaker, and happy coding!
