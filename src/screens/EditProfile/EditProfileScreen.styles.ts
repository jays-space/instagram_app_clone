import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,

    borderRadius: 100,
  },
  button: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi_bold,

    margin: 10,
  },
});
