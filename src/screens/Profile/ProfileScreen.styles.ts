import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.full,
    color: colors.black,
  },
  username: {
    color: colors.black,
    fontWeight: fonts.weight.semi_bold,
  },
  tabButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
