import {ThemedStyleSheet} from '../../Utils/ThemedStyleSheet';
import {Spacing} from '../../Styles';

export default ThemedStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: Spacing.normal,
  },

  answerItem: {
    marginVertical: Spacing.small,
  },
  answerItemAnswer: {
    marginLeft: 38,
    marginTop: 6,
  },

  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchText: {
    marginRight: 12,
  },

  questionContent: {
    paddingVertical: Spacing.small,
  },
}));
