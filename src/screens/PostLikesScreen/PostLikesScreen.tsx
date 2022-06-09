import {ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

// TYPES
import {PostLikesRouteProp} from '../../types/navigation';

// GQL
import {likesForPostByUser} from './queries';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {ApiErrorMessage} from '../../components/ApiErrorMessage';
import {UserListItem} from '../../components/UserListItem';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {postId} = route?.params;

  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: postId}}); // if not userId, fetches all likes in this post

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Could not get post likes"
        message={error.message}
      />
    );
  }

  const postLikes = data?.LikesForPostByUser?.items.filter(
    like => !like?._deleted || [],
  );

  return (
    <FlatList
      data={postLikes}
      renderItem={({item: like}) => like && <UserListItem user={like?.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikesScreen;
