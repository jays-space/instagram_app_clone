import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';

// SCREENS
import {HomeScreen} from '../screens/Home';
import {ProfileScreen} from '../screens/Profile';
import {CommentsScreen} from '../screens/Comments';
import {EditProfileScreen} from '../screens/EditProfile';
import {PostUploadScreen} from '../screens/PostUploadScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{headerTitle: HeaderTitle, headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderTitle = () => (
  <Image
    source={require('../assets/images/logo.png')}
    resizeMode="contain"
    style={styles.logo}
  />
);

const styles = StyleSheet.create({logo: {width: 150, height: 40}});

export default RootNavigation;
