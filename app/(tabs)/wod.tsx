import { View, Text } from 'react-native'
import React from 'react'

const WordOfDay = () => {
  return (
    <View>
      <Text>WordOfDay</Text>
    </View>
  )
}

export default WordOfDay




// // Install necessary packages first:
// // npx expo install expo-quick-actions react-native-view-shot react-native-gesture-handler react-native-svg expo-image-manipulator expo-camera expo-file-system expo-permissions expo-text-recognition

// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, Image, PanResponder, Dimensions, AppState } from 'react-native';
// import * as QuickActions from 'expo-quick-actions';
// import { captureScreen } from 'react-native-view-shot';
// import Svg, { Path } from 'react-native-svg';
// import * as ImageManipulator from 'expo-image-manipulator';
// // import * as TextRecognition from 'expo-text-recognition';

// const { width, height } = Dimensions.get('window');

// export default function App() {
//   const [screenshotUri, setScreenshotUri] = useState(null);
//   const [pathData, setPathData] = useState('');
//   const [croppedUri, setCroppedUri] = useState(null);
//   const points = useRef([]);

//   useEffect(() => {
//     QuickActions.setItems([
//       {
//         type: 'capture_screen',
//         title: 'Capture Screen',
//         icon: 'Capture',
//       },
//     ]);

//     const subscription = AppState.addEventListener('change', handleAppStateChange);
//     return () => subscription.remove();
//   }, []);

//   const handleAppStateChange = async (nextAppState) => {
//     if (nextAppState === 'active') {
//       const action = await QuickActions.popInitialActionAsync();
//       if (action && action.type === 'capture_screen') {
//         takeFullScreenScreenshot();
//       }
//     }
//   };

//   const takeFullScreenScreenshot = async () => {
//     try {
//       const uri = await captureScreen({
//         format: 'png',
//         quality: 1,
//       });
//       setScreenshotUri(uri);
//     } catch (error) {
//       console.error('Screenshot failed', error);
//     }
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: (evt) => {
//         points.current = [{ x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY }];
//         setPathData(`M${evt.nativeEvent.locationX},${evt.nativeEvent.locationY}`);
//       },
//       onPanResponderMove: (evt) => {
//         points.current.push({ x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY });
//         setPathData((prev) => `${prev} L${evt.nativeEvent.locationX},${evt.nativeEvent.locationY}`);
//       },
//       onPanResponderRelease: async () => {
//         if (points.current.length >= 2) {
//           await cropSelectedArea();
//         }
//       },
//     })
//   ).current;

//   const cropSelectedArea = async () => {
//     const minX = Math.min(...points.current.map((p) => p.x));
//     const minY = Math.min(...points.current.map((p) => p.y));
//     const maxX = Math.max(...points.current.map((p) => p.x));
//     const maxY = Math.max(...points.current.map((p) => p.y));

//     const cropResult = await ImageManipulator.manipulateAsync(
//       screenshotUri,
//       [{ crop: { originX: minX, originY: minY, width: maxX - minX, height: maxY - minY } }],
//       { compress: 1, format: ImageManipulator.SaveFormat.PNG }
//     );

//     setCroppedUri(cropResult.uri);
//     extractTextFromImage(cropResult.uri);
//   };

//   const extractTextFromImage = async (uri) => {
//     try {
//       const result = await TextRecognition.recognize(uri);
//       console.log('Extracted Text:', result.map(item => item.text).join(' '));
//     } catch (error) {
//       console.error('OCR Failed:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {screenshotUri && (
//         <View style={styles.imageContainer} {...panResponder.panHandlers}>
//           <Image source={{ uri: screenshotUri }} style={styles.screenshot} />
//           <Svg style={StyleSheet.absoluteFill}>
//             <Path d={pathData} fill="none" stroke="red" strokeWidth={2} />
//           </Svg>
//         </View>
//       )}

//       {croppedUri && (
//         <Image source={{ uri: croppedUri }} style={styles.croppedImage} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     width: width * 0.9,
//     height: height * 0.9,
//   },
//   screenshot: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   croppedImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginTop: 20,
//     borderWidth: 2,
//     borderColor: 'green',
//   },
// });
