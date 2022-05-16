import React from 'react';
import {SafeAreaView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

// TYPES
import {
  CurrentUserProfileNavigationProp,
  CurrentUserProfileRouteProp,
  OtherUserProfileNavigationProp,
  OtherUserProfileRouteProp,
} from '../../navigation/types';

// COMPONENTS
import ProfileHeader from './ProfileHeader';
import {FeedGridView} from '../../components/FeedGridView';

// MOCK
import user from '../../mock/user.json';

const ProfileScreen = () => {
  const navigation = useNavigation<
    CurrentUserProfileNavigationProp | OtherUserProfileNavigationProp
  >();

  const {params} = useRoute<
    CurrentUserProfileRouteProp | OtherUserProfileRouteProp
  >();

  // const {userID, username} = params; // query the user with userID

  // navigation.setOptions({title: username}); //* change screen title

  return (
    //   GridView Posts
    <SafeAreaView>
      <FeedGridView data={user?.posts} ListHeaderComponent={ProfileHeader} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
