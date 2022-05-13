import React, {memo} from 'react';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// TYPES
import {IComment} from '../../types/models';

// STYLES
import {styles} from './Comment.styles';
import {colors} from '../../theme/colors';

interface Props {
  comment: IComment;
}

const Comment: React.FC<Props> = ({comment}) => {
  return (
    <View key={comment?.id} style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>{comment?.user?.username}</Text>{' '}
        {comment?.comment}
      </Text>
      <AntDesign name={'hearto'} style={styles.icon} color={colors.black} />
    </View>
  );
};

export default memo(Comment);
