import React, {memo} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TYPES
import {IPost} from '../../types/models';

// STYLES
import {colors} from '../../theme/colors';

const {width} = Dimensions.get('window');
const FeedGridItem = ({post}: {post: IPost}) => {
  return (
    <View style={styles.root}>
      <Image
        source={{uri: post?.image ?? post?.images?.[0]}}
        style={styles.image}
      />
      {post.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={styles.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: (width + 2) / 3,
    padding: 1,
  },
  image: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default memo(FeedGridItem);
