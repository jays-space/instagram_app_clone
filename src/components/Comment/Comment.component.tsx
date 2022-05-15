import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// TYPES
import {IComment} from '../../types/models';

// STYLES
import {styles} from './Comment.styles';
import {colors} from '../../theme/colors';

interface ICommentProps {
  comment: IComment;
  includeDetails?: boolean;
}

const Comment = ({comment, includeDetails = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleLike = () => {
    setIsLiked(value => !value);
  };

  return (
    <View
      key={comment?.id}
      style={[styles.root, includeDetails && conditionalStyles.root]}>
      {/* user avatar */}
      {includeDetails && (
        <Image source={{uri: comment?.user?.image}} style={styles.avatar} />
      )}

      <View style={styles.commentContainer}>
        {/* comment content */}
        <Text
          style={[
            styles.commentText,
            includeDetails && conditionalStyles.commentText,
          ]}>
          <Text style={styles.bold}>{comment?.user?.username}</Text>{' '}
          {comment?.comment}
        </Text>

        {/* comment footer */}
        {includeDetails && (
          <View style={styles.commentFooter}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>

      <Pressable onPress={toggleLike} hitSlop={8}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

const conditionalStyles = StyleSheet.create({
  root: {
    marginBottom: 10,
  },
  commentText: {
    marginHorizontal: 10,
  },
});

export default memo(Comment);
