import {View, Text, Image} from 'react-native';
import React, {memo} from 'react';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {ProfileNavigationProp} from '../../types/navigation';
import {User} from '../../API';

// COMPONENTS
import {Button} from '../../components/Button';

// STYLES
import {styles} from './ProfileScreen.styles';
import {DEFAULT_USER_IMAGE} from '../../config';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({user}: IProfileHeader) => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const {currentUserId} = useAuthContext();

  const isCurrentUser = user?.id === currentUserId; // check if the current user profile is being viewed by current user

  const navigateToEditProfile = () => {
    navigation.navigate('Edit Profile');
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {/* Profile Image */}
        <Image
          source={{uri: user?.image || DEFAULT_USER_IMAGE}}
          style={styles.userImage}
        />

        {/* Posts, followers, following number */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.nofPosts}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.nofFollowers}</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.nofFollowings}</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>

      {/* About user */}
      <View>
        <Text style={styles.username}>{user?.name}</Text>
        <Text>{user?.bio}</Text>
      </View>

      {/* Tab buttons container  */}
      {isCurrentUser && (
        <View style={styles.tabButtons}>
          <Button title="Edit Profile" inline onPress={navigateToEditProfile} />
          <Button title="Sign Out" inline onPress={() => Auth.signOut()} />
        </View>
      )}
    </View>
  );
};

export default memo(ProfileHeader);
