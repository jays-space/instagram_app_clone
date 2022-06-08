import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// GQL
import {getUser} from './queries';
import {GetUserQuery, GetUserQueryVariables} from '../../API';

// TYPES
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation';

// COMPONENTS
import ProfileHeader from './ProfileHeader';
import {FeedGridView} from '../../components/FeedGridView';
import {ApiErrorMessage} from '../../components/ApiErrorMessage';

const ProfileScreen = () => {
  const navigation = useNavigation<
    MyProfileNavigationProp | UserProfileNavigationProp
  >();
  const {params} = useRoute<MyProfileRouteProp | UserProfileRouteProp>();
  // navigation.setOptions({title: username}); //* change screen title

  // query the user with userID
  const userId = params?.userId;

  const {currentUserId} = useAuthContext();

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId || currentUserId}},
  );
  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user profile"
        message={error?.message || 'User not found'}
      />
    );
  }

  return (
    //   GridView Posts
    <SafeAreaView>
      <FeedGridView
        data={user?.Posts?.items || []}
        ListHeaderComponent={() => <ProfileHeader user={user} />}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
