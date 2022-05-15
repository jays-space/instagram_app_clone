import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Camera} from 'expo-camera';

const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

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
    <SafeAreaView>
      <Text>PostUploadScreen</Text>
    </SafeAreaView>
  );
};

export default PostUploadScreen;
