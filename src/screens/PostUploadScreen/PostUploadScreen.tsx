import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Platform,
} from 'react-native';
import {
  Camera,
  CameraPictureOptions,
  CameraRecordingOptions,
  CameraType,
  FlashMode,
  VideoQuality,
} from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// STYLES
import {colors} from '../../theme/colors';

const FLASH_MODES = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isCameraRecording, setIsCameraRecording] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flashType, setFlashType] = useState<FlashMode>(FlashMode.off);

  const cameraRef = useRef<Camera>(null);

  //* Request permissions from user on component render.
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const micPermission = await Camera.requestMicrophonePermissionsAsync();

      setHasPermissions(
        cameraPermission.status === 'granted' &&
          micPermission.status === 'granted',
      );
    };

    getPermission();
  }, []);

  //   Toggle which camera which is in use
  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  //   Select through a list of flash types
  const selectFlashType = () => {
    // get index of current selected flash mode
    const currentIndex = FLASH_MODES.indexOf(flashType);
    // if currentIndex is at the last index in FLASH_MODES arr, set the next index to 0, else +1
    const nextIndex =
      currentIndex === FLASH_MODES.length - 1 ? 0 : currentIndex + 1;

    setFlashType(FLASH_MODES[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !cameraRef.current || isCameraRecording) {
      return;
    }

    const options: CameraPictureOptions = {
      quality: 0.5, //* Range: 0- extremely compressed & low size to 1- compression for max quality
      base64: false, //* include base64 version of the image
      skipProcessing: Platform.OS === 'android' ? false : true, //* on android the 'processing' step messes up the orientation on some devices
    };

    try {
      const result = await cameraRef.current.takePictureAsync(options);
      console.log('result: ', result); //! notJustDev 3.14 @ 45.42
    } catch (e) {
      console.log(e);
    }

    /**
     * result = {
     * height: number,
     * width: number,
     * uri: string,
     * }
     */
  };

  const startVideoRecording = async () => {
    if (!isCameraReady || !cameraRef.current || isCameraRecording) {
      return;
    }

    const options: CameraRecordingOptions = {
      quality: VideoQuality['4:3'], //* 2160p, 1080p, 720p, 480p, 4:3
      maxDuration: 60, //* Max video duration in seconds
      maxFileSize: 10 * 1024 * 1024, //* Max video file size in bytes
      mute: false,
    };

    setIsCameraRecording(true);

    try {
      const result = await cameraRef.current.recordAsync(options);
      console.log('result: ', result); //! notJustDev 3.14 @ 1:00:30
    } catch (e) {
      console.log(e);
    }

    /**
     * result = {
     * uri: string,
     * }
     */

    setIsCameraRecording(false);
  };

  const stopVideoRecording = () => {
    if (isCameraRecording) {
      cameraRef.current?.stopRecording;
      setIsCameraRecording(false);
    }
  };

  //* if application is awaiting response, return loading
  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  //* if application is denied either camera or mic permissions, deny access to camera features
  if (hasPermissions === false) {
    return <Text>No Access to the camera</Text>;
  }

  //* if application is permitted both camera or mic permissions, allow access to camera features
  return (
    <SafeAreaView style={styles.root}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flashType}
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.buttonsContainer, styles.buttonsContainerTop]}>
        <MaterialIcons name="close" size={30} color={colors.white} />

        {/* Toggle camera flash mode */}
        <Pressable onPress={selectFlashType}>
          <MaterialIcons
            name={flashModeToIcon[flashType]}
            size={30}
            color={colors.white}
          />
        </Pressable>

        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      <View style={[styles.buttonsContainer, styles.buttonsContainerBottom]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />

        {/* Take picture/video button */}
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startVideoRecording}
            onPressOut={stopVideoRecording}>
            <View
              style={[
                styles.circle,
                isCameraRecording ? styles.recording : styles.notRecording,
              ]}
            />
          </Pressable>
        )}

        {/* Toggle camera type */}
        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    width: '100%',

    position: 'absolute',
  },
  buttonsContainerTop: {
    top: 25,
  },
  buttonsContainerBottom: {
    bottom: 25,
  },
  circle: {
    width: 75,
    aspectRatio: 1,

    borderRadius: 75,
  },
  notRecording: {
    backgroundColor: colors.white,
  },
  recording: {
    backgroundColor: colors.accent,
  },
});

export default PostUploadScreen;
