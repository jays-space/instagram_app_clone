import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Text, Image, Pressable, View} from 'react-native';

// TYPES
import {User} from '../../API';
import {FeedNavigationProp} from '../../types/navigation';

// STYLES
import {styles} from './UserListItem.styles';
import {DEFAULT_USER_IMAGE} from '../../config';

type IUserField =
  | 'id'
  | 'name'
  | 'username'
  | 'image'
  | 'createdAt'
  | 'updatedAt'
  | '_version'
  | '_deleted'
  | '_lastChangedAt';
type IUser = Pick<User, IUserField>;

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({user}: IUserListItem) => {
  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUserScreen = () => {
    if (!user) {
      return;
    }
    navigation.navigate('UserProfile', {userId: user?.id});
  };

  return (
    <Pressable style={styles.root} onPress={navigateToUserScreen}>
      <Image
        source={{uri: user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>{user?.username}</Text>
      </View>
    </Pressable>
  );
};

export default memo(UserListItem);
