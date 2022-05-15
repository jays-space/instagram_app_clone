import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, View, Pressable} from 'react-native';
import {Camera, CameraType, FlashMode} from 'expo-camera';
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
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flashType, setFlashType] = useState<FlashMode>(FlashMode.off);

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
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flashType}
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
        <View style={styles.circle} />

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

    backgroundColor: colors.transparent.black[60],
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
    backgroundColor: colors.white,
  },
});

export default PostUploadScreen;
