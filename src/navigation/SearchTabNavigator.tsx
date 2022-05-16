import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// TYPES
import {SearchTopTabNavigatorParamsList} from './types';

// SCREENS
import {UserSearchScreen} from '../screens/UserSearchScreen';
import {CommentsScreen} from '../screens/Comments';

// STYLES
import {colors} from '../theme/colors';

const Tab = createMaterialTopTabNavigator<SearchTopTabNavigatorParamsList>();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: insets.top},
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
      }}>
      <Tab.Screen name="Users" component={UserSearchScreen} />
      <Tab.Screen name="Posts" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
