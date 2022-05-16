import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootNavigatorParamsList = {
  Home: undefined;
  Comments: {postId: string};
};

export type BottomTabNavigatorParamsList = {
  HomeStack: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  CurrentUserProfile: undefined;
};

export type CurrentUserProfileRouteProp = RouteProp<
  BottomTabNavigatorParamsList,
  'CurrentUserProfile'
>;

export type CurrentUserProfileNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamsList,
  'CurrentUserProfile'
>;

export type HomeStackNavigatorParamsList = {
  Feed: undefined;
  OtherUserProfile: {userID: string; username?: string};
};

export type OtherUserProfileRouteProp = RouteProp<
  HomeStackNavigatorParamsList,
  'OtherUserProfile'
>;

export type OtherUserProfileNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamsList,
  'OtherUserProfile'
>;

export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamsList,
  'Feed'
>;

export type ProfileStackNavigatorParamsList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamsList,
  'Profile'
>;
