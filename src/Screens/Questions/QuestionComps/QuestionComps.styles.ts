import {StyleSheet} from 'react-native';
import {Spacing} from '../../../Styles';

export default StyleSheet.create({
  container: {
    paddingVertical: Spacing.large,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: Spacing.normal,
  },

  switch: {
    marginVertical: Spacing.xsmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  radioContainer: {
    borderRadius: 99,
    overflow: 'hidden',
  },
  radioInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
