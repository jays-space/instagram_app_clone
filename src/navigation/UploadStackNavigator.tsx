import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {CreateStackNavigatorParamList} from '../types/navigation';

// SCREENS
import {CameraScreen} from '../screens/CameraScreen';
import {CreatePostScreen} from '../screens/CreatePostScreen';

const Stack = createNativeStackNavigator<CreateStackNavigatorParamList>();

export const UploadStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Create" component={CreatePostScreen} />
    </Stack.Navigator>
  );
};
