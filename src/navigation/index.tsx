import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useQuery} from '@apollo/client';
import {ActivityIndicator, View} from 'react-native';

// CONTEXTS
import {useAuthContext} from '../contexts/AuthContext';

// TYPES
import {RootNavigatorParamList} from '../types/navigation';

// GQL
import {getUser} from './queries';

// SCREENS
import TabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {CommentsScreen} from '../screens/Comments';
import {GetUserQuery, GetUserQueryVariables} from '../API';
import {EditProfileScreen} from '../screens/EditProfile';

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
  const {currentUser, currentUserId} = useAuthContext();
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: currentUserId}},
  );

  const userData = data?.getUser;

  if (currentUser === undefined || loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreens = null;

  if (!currentUser) {
    stackScreens = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
    );
  } else if (!userData?.username) {
    stackScreens = (
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          // title: 'Setup Profile',
          headerTitleAlign: 'center',
        }}
      />
    );
  } else {
    stackScreens = (
      <>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </>
    );
  }
  return (
    <NavigationContainer linking={linkingConfig}>
      <Stack.Navigator>{stackScreens}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
