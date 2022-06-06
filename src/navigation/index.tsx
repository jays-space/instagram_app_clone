import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// TYPES
import {RootNavigatorParamList} from '../types/navigation';

// SCREENS
import TabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {CommentsScreen} from '../screens/Comments';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const linkingConfig: LinkingOptions<RootNavigatorParamList> = {
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
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
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
