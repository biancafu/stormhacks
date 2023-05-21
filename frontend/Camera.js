import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, SafeAreaSafeAreaView } from 'react-native';

export default function CameraComponent() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // added state for captured image URI
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  // add useRef for camera reference
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <SafeAreaView />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  // handle the image capturing process
  const captureImage = async() => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImageUri(photo.uri);
        // call the function to process the scanned image
        processCapturedImage(photo.uri);
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };

  // handle the captured image and send to CloudVision
  const processCapturedImage = async (imageUri) => {
    try {
      // Call your text recognition API here and pass the imageUri
      // Extract the text from the response and use it as needed
      // Update your app's state with the extracted text
    } catch (error) {
      console.log('Error processing image:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <SafeAreaView style={styles.buttonContainer}>
          {/* scan button */}
          <TouchableOpacity onPress={captureImage} style={styles.button}>
            <Text style={styles.text}>Scan</Text>
          </TouchableOpacity>
          {/* flip camera button */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Camera>
      {capturedImageUri && (
        <Image source={{ uri: capturedImageUri }} style={styles.capturedImage} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    // display: 'flex',
    // flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black',
  },
});
