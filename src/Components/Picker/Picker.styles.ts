import {Spacing} from '../../Styles';
import {ThemedStyleSheet} from '../../Utils/ThemedStyleSheet';

export default ThemedStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  error: {
    borderColor: theme.colors.error,
  },

  touchable: {
    paddingVertical: Spacing.xxsmall,
    paddingHorizontal: Spacing.xsmall,
  },

  android: {
    display: 'none',
    opacity: 0,
  },
  IOStitle: {
    marginVertical: Spacing.xxsmall,
  },
}));
