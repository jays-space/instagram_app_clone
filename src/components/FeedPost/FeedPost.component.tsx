import React, {memo, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post as PostType,
} from '../../API';
import {
  FeedNavigationProp,
  FeedPOstToCommentsNavigationProp,
} from '../../types/navigation';

// GQL
import {createLike, deleteLike, likesForPostByUser} from './queries';

// COMPONENTS
import {Comment} from '../Comment';
import {DoublePressable} from '../DoublePressable';
import {Carousel} from '../Carousel';
import {VideoPlayer} from '../VideoPlayer';
import {DEFAULT_USER_IMAGE} from '../../config';
import PostMenu from './PostMenu';

// STYLES
import {styles} from './FeedPost.styles';
import {colors} from '../../theme/colors';

interface IFeedPost {
  post: PostType;
  isViewable?: boolean | null;
}

const FeedPost = ({post, isViewable = null}: IFeedPost) => {
  const feedPostNavigation = useNavigation<FeedNavigationProp>();
  const rootNavigation = useNavigation<FeedPOstToCommentsNavigationProp>();

  const {currentUserId} = useAuthContext();

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);

  // on component render, fetch all likes by this user for this post
  const {data: usersLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {
    variables: {postID: post?.id, userID: {eq: currentUserId}},
  });

  const currentUserLike = usersLikeData?.LikesForPostByUser?.items?.filter(
    like => !like?._deleted,
  )?.[0]; // a like by the current user => if there is not data at [0], the we return undefined (falsy value)

  // on like create, create the like then refetch LikesForPostByUser
  const [onCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {userID: currentUserId, postID: post?.id}}, // gets all likes by the current user for this post
    refetchQueries: ['LikesForPostByUser'], // an arr of queries to run after this mutation likes CRUD (15:00:00)
  });

  const [onDeletePost] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike, {refetchQueries: ['LikesForPostByUser']});

  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(value => !value); //? Updating local state in 'real-time' and not async 3.5 State for Likes @ 15:00

  const togglePostLike = () => {
    if (currentUserLike) {
      // if the current user likes, delete the like
      onDeletePost({
        variables: {
          input: {id: currentUserLike?.id, _version: currentUserLike?._version},
        },
      });
    } else {
      // if the current user does not like, create the like
      onCreateLike();
    }
  };

  const navigateToProfile = () => {
    if (post?.User) {
      feedPostNavigation.navigate('UserProfile', {
        userId: post.User?.id, //* if no userID, send currentUserID instead
      });
    }
  };

  const navigateToComments = () => {
    rootNavigation.navigate('Comments', {
      postId: post.id,
    });
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={togglePostLike}>
        <Image
          source={{
            uri: post?.image,
          }}
          resizeMode="cover"
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post?.images && post?.images?.length > 0) {
    content = <Carousel images={post.images} onDoublePress={togglePostLike} />;
  } else if (post?.video) {
    content = (
      <DoublePressable onDoublePress={togglePostLike}>
        <VideoPlayer video={post.video} paused={!isViewable} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        {/* currentUser avatar */}
        <Image
          source={{
            uri: post?.User?.image || DEFAULT_USER_IMAGE,
          }}
          resizeMode="contain"
          style={styles.userAvatar}
        />

        {/* currentUser name */}
        <Pressable onPress={navigateToProfile}>
          <Text style={styles.userName}>{post?.User?.username}</Text>
        </Pressable>

        {/* more options icon */}
        <PostMenu post={post} />
      </View>

      {/* Content */}
      {content}

      {/* Footer */}
      <View style={styles.footer}>
        {/* icons */}
        <View style={styles.iconContainer}>
          <Pressable onPress={togglePostLike}>
            <AntDesign
              name={currentUserLike ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={currentUserLike ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>{post?.User?.username}</Text> and{' '}
          <Text style={styles.bold}>
            {(post?.nofLikes - 1).toString()} others
          </Text>
        </Text>

        {/* post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>jaymondlana</Text> {post?.description}
        </Text>

        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* comments */}
        <Text onPress={navigateToComments}>
          View all {post?.nofComments.toString()} comments
        </Text>
        {(post?.Comments?.items || []).map(comment => {
          return <Comment key={comment?.id} comment={comment} />;
        })}

        {/* posted date */}
        <Text>{post?.createdAt}</Text>
      </View>
    </View>
  );
};

export default memo(FeedPost);
