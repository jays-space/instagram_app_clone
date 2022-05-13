import React, {memo} from 'react';
import {Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// TYPES
import {IPost} from '../../types/models';

// STYLES
import {styles} from './FeedPost.styles';
import {colors} from '../../theme/colors';
import {Comment} from '../Comment';

interface Props {
  post: IPost;
}

const FeedPost: React.FC<Props> = ({post}) => {
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
      <Image
        source={{
          uri: post?.image,
        }}
        resizeMode="cover"
        style={styles.image}
      />

      {/* Footer */}
      <View style={styles.footer}>
        {/* icons */}
        <View style={styles.iconContainer}>
          <AntDesign
            name={'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
          />
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
        <Text style={styles.text}>
          <Text style={styles.bold}>jaymondlana</Text> {post?.description}
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
