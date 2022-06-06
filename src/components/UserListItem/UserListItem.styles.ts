import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,

    marginRight: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
  },
  username: {
    color: colors.grey,
  },
});
