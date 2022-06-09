import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';

// TYPES
import {HomeStackNavigatorParamList} from '../types/navigation';

// SCREENS
import {HomeScreen} from '../screens/Home';
import {ProfileScreen} from '../screens/Profile';
import {UpdatePostScreen} from '../screens/UpdatePostScreen';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{headerShown: true, headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle}}
      />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{title: 'Edit Post'}}
      />
    </Stack.Navigator>
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

export default HomeStackNavigator;
