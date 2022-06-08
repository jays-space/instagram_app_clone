import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    width: '20%',
  },
  input: {
    borderBottomWidth: 1,
    // borderColor: colors.border,

    minHeight: 50,
  },
});
