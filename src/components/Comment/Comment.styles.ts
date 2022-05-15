import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
  },
  commentContainer: {
    flex: 1,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  commentFooter: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  footerText: {
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
});
