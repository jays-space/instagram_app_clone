import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

// STYLES
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

const Input = () => {
  const [newComment, setNewComment] = useState('');

  const onPost = () => {
    if (newComment) {
      console.warn(newComment.toString());
      // TODO: Send data to backend
      setNewComment('');
    }
  };

  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.avatar}
      />
      <TextInput
        style={styles.input}
        multiline
        placeholder="Say something..."
        value={newComment}
        onChangeText={setNewComment}
      />

      <Text style={styles.submitBtn} onPress={onPost}>
        POST
      </Text>
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',

    paddingVertical: 5,
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,

    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingRight: 60,
    marginLeft: 10,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
  },
  submitBtn: {
    position: 'absolute',
    right: 30,
    bottom: 15,

    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});
