import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {RootNavigatorParamsList} from './types';

// SCREENS
import TabNavigator from './BottomTabNavigator';
import {CommentsScreen} from '../screens/Comments';

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const linkingConfig: LinkingOptions<RootNavigatorParamsList> = {
  prefixes: ['jaysinsta://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments', // jaysinsta://comments
      // jaysinsta://user/123
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              OtherUserProfile: 'user:/userID',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  return (
    <NavigationContainer linking={linkingConfig}>
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
