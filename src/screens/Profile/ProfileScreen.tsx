import React from 'react';
import {SafeAreaView} from 'react-native';

// COMPONENTS
import ProfileHeader from './ProfileHeader';
import {FeedGridView} from '../../components/FeedGridView';

// MOCK
import user from '../../mock/user.json';

const ProfileScreen = () => {
  return (
    //   GridView Posts
    <SafeAreaView>
      <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
