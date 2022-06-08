import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {ProfileStackNavigatorParamList} from '../types/navigation';

// SCREENS
import {ProfileScreen} from '../screens/Profile';
import {EditProfileScreen} from '../screens/EditProfile';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
