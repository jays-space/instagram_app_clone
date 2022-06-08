import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';

// TYPES
import {HomeStackNavigatorParamList} from '../types/navigation';

// SCREENS
import {HomeScreen} from '../screens/Home';
import {ProfileScreen} from '../screens/Profile';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Other User Profile'}}
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
