import {StyleSheet} from 'react-native';
import {Spacing} from '../../../Styles';

export default StyleSheet.create({
  container: {
    paddingVertical: Spacing.large,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
  },
  subtitle: {
    textAlign: 'left',
    marginLeft: Spacing.xsmall,
  },
  chooseText: {
    textAlign: 'center',
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
    marginLeft: Spacing.xsmall,
    fontSize: 16,
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
