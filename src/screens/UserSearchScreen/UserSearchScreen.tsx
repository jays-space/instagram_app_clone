import React from 'react';
import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/client';

// GQL
import {listUsers} from './queries';

// COMPONENTS
import {UserListItem} from '../../components/UserListItem';

// STYLES
import {styles} from '../Profile/ProfileScreen.styles';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';
import {ApiErrorMessage} from '../../components/ApiErrorMessage';

const UserSearchScreen = () => {
  // get users query => useQuery gql
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Cannot fetch users" message={error.message} />
    );
  }

  const USERS = data?.listUsers?.items || [];

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={USERS}
        keyExtractor={item => (item ? item?.id : '')}
        renderItem={({item}) => item && <UserListItem user={item} />}
        refreshing={loading}
        onRefresh={() => refetch()}
      />
    </SafeAreaView>
  );
};

export default UserSearchScreen;
