import React, {memo} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

// STYLES
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IButton {
  title?: string;
  onPress?: () => void;
}

const Button = ({title = '', onPress = () => {}}: IButton) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: colors.border,

    padding: 5,
    borderRadius: 5,

    alignItems: 'center',
    flex: 1,

    margin: 5,
  },
  title: {
    color: colors.black,
    fontWeight: fonts.weight.semi_bold,
  },
});

export default memo(Button);
