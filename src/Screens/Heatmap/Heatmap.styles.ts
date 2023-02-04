import {ThemedStyleSheet} from '../../Utils/ThemedStyleSheet';
import {Spacing} from '../../Styles';

export default ThemedStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingVertical: Spacing.pagePadding,
    flexDirection: 'column',
  },

  heatmap: {},

  viewShot: {
    backgroundColor: theme.colors.background,
  },

  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },

  classNames: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 6,
  },

  questionNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNameContent: {
    justifyContent: 'center',
    transform: [{rotate: '90deg'}],
    marginTop: 8,
  },
  questionName: {
    top: 0,
    lineHeight: 13,
    paddingTop: 1,
  },

  gradientRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.small,
  },
  gradient: {
    width: 8 + Spacing.small,
    height: '100%',
  },
  gradientNums: {
    marginHorizontal: Spacing.xxsmall,
    justifyContent: 'space-between',
  },

  saveButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  saveButton: {
    margin: Spacing.xsmall,
  },
}));
