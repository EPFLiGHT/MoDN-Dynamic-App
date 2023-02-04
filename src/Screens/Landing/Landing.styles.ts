import {StyleSheet} from 'react-native';
import {Spacing} from '../../Styles';

export default StyleSheet.create({
  container: {
    paddingVertical: Spacing.xxlarge,
  },
  title: {
    fontWeight: '700',
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.normal,
  },
  author: {
    marginRight: Spacing.xsmall,
  },
  logo: {
    width: 32,
    height: 32,
  },

  button: {
    marginVertical: Spacing.medium,
  },

  knownSwitch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  knownSwitchText: {
    marginBottom: 4,
  },
  knownSwitchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
