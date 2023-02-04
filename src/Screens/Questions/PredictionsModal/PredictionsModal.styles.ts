import {ThemedStyleSheet} from '../../../Utils/ThemedStyleSheet';
import {Spacing} from '../../../Styles';

export default ThemedStyleSheet((theme) => ({
  container: {},
  modalTitle: {
    marginTop: Spacing.xsmall,
  },
  modalTitleDivider: {
    marginVertical: Spacing.small,
  },
  recalculateButton: {
    marginTop: Spacing.small,
  },

  gradientLineContainer: {
    width: '100%',
    height: 'auto',
    marginVertical: Spacing.xsmall,
  },
  gradientLine: {
    width: '100%',
    height: 16,
  },
  gradientLineNums: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
