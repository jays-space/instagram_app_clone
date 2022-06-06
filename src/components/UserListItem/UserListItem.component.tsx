import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Text, Image, Pressable} from 'react-native';

// TYPES
import {IUser} from '../../types/models';

// STYLES
import {styles} from './UserListItem.styles';

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({user}: IUserListItem) => {
  const navigation = useNavigation();

  const navigateToUserScreen = () => {
    navigation.navigate('OtherUserProfile', {userID: user.id});
  };

  return (
    <Pressable style={styles.root} onPress={navigateToUserScreen}>
      <Image source={{uri: user?.image}} style={styles.avatar} />
      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.username}>{user.username}</Text>
    </Pressable>
  );
};

export default memo(UserListItem);
