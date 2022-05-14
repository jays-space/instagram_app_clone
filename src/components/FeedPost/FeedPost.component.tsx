import React, {memo, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// TYPES
import {IPost} from '../../types/models';

// COMPONENTS
import {Comment} from '../Comment';
import {DoublePressable} from '../DoublePressable';
import {Carousel} from '../Carousel';
import {VideoPlayer} from '../VideoPlayer';

// STYLES
import {styles} from './FeedPost.styles';
import {colors} from '../../theme/colors';

interface IFeedPost {
  post: IPost;
  isViewable: boolean;
}

const FeedPost = ({post, isViewable}: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false);

  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(value => !value); //? Updating local state in 'real-time' and not async 3.5 State for Likes @ 15:00

  const togglePostLike = () => setIsPostLiked(value => !value);

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
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={togglePostLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={togglePostLike}>
        <VideoPlayer video={post.video} isViewable={isViewable} />
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
            uri: post?.user?.image,
          }}
          resizeMode="contain"
          style={styles.userAvatar}
        />

        {/* currentUser name */}
        <Text style={styles.userName}>{post?.user?.username}</Text>

        {/* more options icon */}
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.optionsIcon}
        />
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
          Liked by{' '}
          <Text style={styles.bold}>{post?.comments[0]?.user?.username}</Text>{' '}
          and{' '}
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
        <Text>View all {post?.nofComments.toString()} comments</Text>
        {post?.comments?.map(comment => {
          return <Comment key={comment?.id} comment={comment} />;
        })}

        {/* posted date */}
        <Text>{post?.createdAt}</Text>
      </View>
    </View>
  );
};

export default memo(FeedPost);
