import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { labelImage } from 'vision-camera-image-labeler';
import { runOnJS } from 'react-native-reanimated'
import { Camera, useFrameProcessor } from 'react-native-vision-camera'
import { OCRFrame, scanOCR } from 'vision-camera-ocr'
import { useScanCameraDevice } from './hooks.js'

export default function App() {

  const [ocrFrame, setOCRFrame] = React.useState(null)

  const { device, deviceText, devices, nextDevice } = useScanCameraDevice()
  const cameraRef = useRef(Camera)
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const data = scanOCR(frame);
    console.log(JSON.stringify(data, undefined, '  '))
    runOnJS(setOCRFrame)(data)
    // console.log('OCRFrame', OCRFrame);
  }, []);

  // data 
  // OCRFrame = {
  //   result: {
  //     text: '', // Raw result text
  //     blocks: [], // Each recognized element broken into blocks
  //   },
  // };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!
        <Button onPress={() => {
          const OCRFrame = frameProcessor();
          console.log('OCRFrame', OCRFrame);
        }}>

        </Button>
      </Text>
      <StatusBar style="auto" />
      <Text>
        {ocrFrame.result.text}
      </Text>
      <Camera
            ref={cameraRef}
            style={{ width: '100%', height: '100%' }}
            device={device}
            focusable={true}
            isActive={true}
            enableZoomGesture={true}
            torch={'on'}
            frameProcessorFps={1}
            frameProcessor={frameProcessor}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
