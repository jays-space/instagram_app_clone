import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';

// COMPONENTS
import {UserListItem} from '../../components/UserListItem';

// STYLES
import {styles} from '../Profile/ProfileScreen.styles';

// MOCK
import {USERS} from '../../mock/users';

const UserSearchScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={USERS}
        keyExtractor={item => item.id}
        renderItem={({item}) => <UserListItem user={item} />}
      />
    </SafeAreaView>
  );
};

export default UserSearchScreen;
