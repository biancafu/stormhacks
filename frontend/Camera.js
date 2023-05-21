import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, SafeAreaSafeAreaView } from 'react-native';
// import { VisionClient } from '@google-cloud/vision';

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
        const image = await cameraRef.current.takePictureAsync();
        setCapturedImageUri(image.uri);
        // call the function to process the scanned image
        processCapturedImage(image.uri);
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };

  // handle the captured image and send to CloudVision
  // const processCapturedImage = async (imageUri) => {
  //   try {
  //     // Call your text recognition API here and pass the imageUri
  //     // Make a request to the Google Cloud Vision API for text detection
  //     const [result] = await VisionClient.textDetection(imageUri);
  //     const textAnnotations = result.textAnnotations;
  //     // Extract the text from the response and use it as needed
  //     const extractedText = textAnnotations ? textAnnotations[0].description : '';
  //     // Update your app's state with the extracted text
  //     console.log('Extracted Text:', extractedText);
  //   } catch (error) {
  //     console.log('Error processing image:', error);
  //   }
  // };

  const processCapturedImage = async (imageUri) => {
    console.log('imageUri', imageUri);
    try {
      const apiKey = 'AIzaSyD_6js-OuAyKeyLI50BgYH227Oui8niVoM'; // Replace with your Google Cloud Vision API key
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
      const base64Image = await convertImageToBase64(imageUri);
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
              },
            ],
          },
        ],
      };
  
      console.log('requestBody', requestBody);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('response: ', response);
  
      const data = await response.json();
      console.log('data', data);
  
      // Extract the text from the response and use it as needed
      const extractedText = data.responses[0].textAnnotations[0].description;
      console.log('Extracted Text:', extractedText);
    } catch (error) {
      console.log('Error processing image:', error);
    }
  };
  
  const convertImageToBase64 = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64String = await convertBlobToBase64(blob);
    return base64String;
  };
  
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
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
