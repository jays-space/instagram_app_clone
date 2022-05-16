import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {RootNavigatorParamsList} from './types';

// SCREENS
import TabNavigator from './BottomTabNavigator';
import {CommentsScreen} from '../screens/Comments';

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
