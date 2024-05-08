# Sneaker Viewer / Online Store Documentation

## Introduction

In the pursuit of creating an online store, I have embarked on a journey to expand my skill set and delve into new technologies. As part of this endeavor, I have introduced an extensive database to enrich the functionality of the online store.

## Project Overview

The project aims to revolutionize the online shopping experience by integrating immersive 3D elements. Our focal point is the showcase of the iconic Uptempo model in collaboration with Nike and Supreme, blending street style with avant-garde design. Leveraging the Three.js library, I have crafted an environment where style seamlessly intersects with the digital realm.

## Technical Overview

### Technologies Used

- **Three.js Library:** Utilized for 3D graphics rendering, camera control, and model loading.
- **OrbitControls:** Integrated for intuitive camera navigation within the scene.
- **GLTFLoader:** Employed to load 3D models in the glTF format.
- **WebGLRenderer:** Implemented for rendering 3D graphics in the browser.
- **Blender:** Utilized for 3D model creation and editing.
- **Tinkercad:** Employed for foundational 3D modeling concepts.
- **CapCut:** Used for video montage.
- **Eleven Labs.io:** Utilized for voice generation.
- **Database:** A comprehensive database has been integrated to augment the functionality of the online store.

### Code Structure

The code is structured within a class named `BuildByL16H7N1N65`, encapsulating the entire project. Key methods include:

- **_Initialize:** Sets up the Three.js environment, initializes the camera, creates a scene, and loads 3D models.
- **_SetupBackground:** Configures the background image.
- **_SetupLights:** Establishes lighting conditions within the scene.
- **_SetupControls:** Initializes camera controls for user interaction.
- **_LoadModel:** Loads a 3D model using GLTFLoader.
- **_SetupCameraPosition:** Positions the camera based on the bounding box of the loaded model.
- **_AddAudio:** Integrates audio functionality, enabling users to control an accompanying soundtrack.
- **_ToggleAudio:** Toggles between play and pause for the audio.
- **_CheckAudioCompletion:** Monitors audio playback to reset the Play/Pause button upon completion.
- **_ResetPlayPauseButton:** Resets the Play/Pause button to its initial state.
- **_RAF:** Initiates the rendering loop using requestAnimationFrame.

### Additional Features

**Play/Pause Button:** A toggle button allows users to control the background audio, enhancing the immersive experience.

## Database Integration

An extensive database has been seamlessly integrated to elevate the overall functionality of the online store. This encompasses features such as product catalog management, user authentication, and order processing.

## Challenges Faced

As novice web development enthusiasts, we encountered the following challenges:

- **Camera Positioning:** Determining the optimal camera position based on the loaded 3D model necessitated understanding the bounding box and adjusting for perspective.
- **Audio Integration:** Implementing audio playback and synchronization with the Play/Pause button posed challenges with asynchronous events and button state management.
- **User Controls:** Setting up user controls for camera movement using OrbitControls required familiarity with the library's usage and customization.
- **3D Modeling:** Learning Blender for 3D modeling proved challenging, but Tinkercad served as a valuable stepping stone to grasp fundamental concepts.

## Sources and References

I owe gratitude to the following resources for their invaluable assistance throughout the development process:

- Three.js Documentation
- MDN Web Docs
- Stack Overflow
- Blender Documentation
- Tinkercad Learning Platform
- CapCut
- Eleven Labs.io

## Conclusion

Embarking on this project as a student has been a journey of growth and discovery. Overcoming challenges, acquiring new skills, and crafting an engaging online experience for sneaker enthusiasts has been immensely rewarding. The integration of an extensive database further enhances the online store's functionality, providing a robust platform for users.

**Authors:** L16H7N1N65 

Enjoy exploring the 3D sneaker, and happy coding!

