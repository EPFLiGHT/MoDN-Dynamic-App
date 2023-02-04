import {ThemedStyleSheet} from '../../Utils/ThemedStyleSheet';
import {Spacing} from '../../Styles';

export default ThemedStyleSheet((theme) => ({
  modal: {
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: Spacing.pagePadding,
  },
}));
