import {View, Text, Image} from 'react-native';
import React, {memo} from 'react';

// COMPONENTS
import {Button} from '../../components/Button';

// STYLES
import {styles} from './ProfileScreen.styles';

// MOCK
import user from '../../mock/user.json';

const ProfileHeader = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {/* Profile Image */}
        <Image source={{uri: user.image}} style={styles.userImage} />

        {/* Posts, followers, following number */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>98</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>198</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>298</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>

      {/* About user */}
      <View>
        <Text style={styles.username}>{user.name}</Text>
        <Text>{user.bio}</Text>
      </View>

      {/* Tab buttons container  */}
      <View style={styles.tabButtons}>
        <Button
          title="Edit Profile"
          onPress={() => console.warn('edit profile pressed')}
        />
        <Button
          title="Another Button"
          onPress={() => console.warn('another button pressed')}
        />
      </View>
    </View>
  );
};

export default memo(ProfileHeader);
