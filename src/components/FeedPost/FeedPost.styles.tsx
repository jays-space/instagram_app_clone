import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
  },
  userAvatar: {
    marginRight: 10,

    width: 50,
    aspectRatio: 1,

    borderRadius: 25,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  optionsIcon: {
    marginLeft: 'auto',
  },
  post: {},
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
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
  commentText: {
    flex: 1,
    color: colors.black,
    lineHeight: 18,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
