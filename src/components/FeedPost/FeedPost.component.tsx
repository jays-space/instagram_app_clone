import React, {memo, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

// TYPES
import {Post as PostType} from '../../API';
import {
  FeedNavigationProp,
  FeedPOstToCommentsNavigationProp,
} from '../../types/navigation';

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

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false);

  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(value => !value); //? Updating local state in 'real-time' and not async 3.5 State for Likes @ 15:00

  const togglePostLike = () => setIsPostLiked(value => !value);

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
              name={isPostLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isPostLiked ? colors.accent : colors.black}
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
