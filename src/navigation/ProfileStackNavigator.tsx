import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {ProfileStackNavigatorParamsList} from './types';

// SCREENS
import {ProfileScreen} from '../screens/Profile';
import {EditProfileScreen} from '../screens/EditProfile';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamsList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
