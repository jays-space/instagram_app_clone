import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Text, Image, Pressable} from 'react-native';

// TYPES
import {User} from '../../API';
import {FeedNavigationProp} from '../../types/navigation';

// STYLES
import {styles} from './UserListItem.styles';
import {DEFAULT_USER_IMAGE} from '../../config';

interface IUserListItem {
  user: User;
}

const UserListItem = ({user}: IUserListItem) => {
  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable style={styles.root} onPress={navigateToUserScreen}>
      <Image
        source={{uri: user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.username}>{user.username}</Text>
    </Pressable>
  );
};

export default memo(UserListItem);
