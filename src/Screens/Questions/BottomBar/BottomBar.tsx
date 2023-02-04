import {Fragment, memo} from 'react';
import {View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootQuestionsScreenProps} from '../../../Typings/NavigationTypes';
import {BottomBarProps} from './BottomBar.props';
import styles from './BottomBar.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EmptyFunction = () => {};

const BottomBar: React.FC<BottomBarProps> = (props) => {
  const {modalRef, predictionsPerQuestion, setSelectedQuestion} = props;

  const navigation = useNavigation<RootQuestionsScreenProps['navigation']>();

  return (
    <View style={styles.container}>
      <BottomNavigation
        compact
        navigationState={{
          index: 0,
          routes: [
            {
              key: 'empty',
            },
            {
              key: 'lastPredictions',
              title: 'See Last Predictions',
              unfocusedIcon: 'chart-box-outline',
              focusedIcon: 'chart-box-outline',
            },
            {key: 'heatmap', title: 'Heatmap', unfocusedIcon: 'table'},
            {
              key: 'backToSummary',
              title: 'Back to Summary',
              unfocusedIcon: 'format-list-bulleted',
            },
          ],
        }}
        onIndexChange={EmptyFunction}
        renderTouchable={({route, key, ...rest}) =>
          route.key === 'empty' ? (
            <Fragment key={key} />
          ) : (
            <BottomNavigation.Touchable key={key} route={route} {...rest} />
          )
        }
        renderScene={BottomNavigation.SceneMap({
          empty: () => null,
          lastPredictions: () => null,
          heatmap: () => null,
          backToSummary: () => null,
        })}
        onTabPress={({route}) => {
          if (route.key === 'lastPredictions') {
            modalRef.current?.open();
          }

          if (route.key === 'heatmap') {
            navigation.navigate('Heatmap', {predictions: predictionsPerQuestion});
          }

          if (route.key === 'backToSummary') {
            setSelectedQuestion('notSelected');
          }
        }}
      />
    </View>
  );
};

export default memo(BottomBar);
