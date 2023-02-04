import {View, Image} from 'react-native';
import {Button, Switch} from 'react-native-paper';
import {Tensor} from 'onnxruntime-react-native';
import {Text} from '../../Components';
import {PageContainer} from '../../Containers';
import {useDistributionState, useSetDistributionState} from '../../Hooks';
import {STATE_SIZE} from '../../Utils/Constants';
import {RootLandingScreenProps} from '../../Typings/NavigationTypes';
import styles from './Landing.styles';
import {randomizeState} from '../../Utils/Helpers';
import GlobalStyles from '../../Styles/GlobalStyles';

type Props = RootLandingScreenProps;

const Landing: React.FC<Props> = ({navigation}) => {
  const distState = useDistributionState();
  const setDistState = useSetDistributionState();

  const onQuestionsPress = () => {
    navigation.navigate('Questions');
  };

  const toggleDistKnownState = () => {
    setDistState((prev) => {
      const isKnown = !prev.known;

      let stateArr = new Float32Array(STATE_SIZE);
      if (!isKnown) stateArr = randomizeState(stateArr);

      return {
        known: isKnown,
        state: new Tensor('float32', stateArr, [1, STATE_SIZE]),
      };
    });
  };

  return (
    <PageContainer withSafeArea withPadding style={styles.container}>
      <Text fontSize={24} align="center" style={styles.title}>
        MoDN Dynamic
      </Text>

      <View style={styles.authorContainer}>
        <Text fontSize={12} align="center" style={styles.author}>
          by
        </Text>

        <Image source={require('../../Assets/Images/logo-transparent.png')} style={styles.logo} />
      </View>

      <Text fontSize={16} align="center">
        Modular Clinical Decision Support Networks on ePOCT+ Dataset for Dynamic
      </Text>

      <Button mode="contained" onPress={onQuestionsPress} style={styles.button}>
        Go To Questions
      </Button>

      <Text fontSize={16} align="center">
        Explore the predictive importance of questions in the questionnaire of ePOCT+ for the
        diseases of anemia, dehydration, diarrhea, fever without source, malaria, malnutrition,
        pneumonia, and upper respiratory infection.
      </Text>

      {/* <View style={styles.knownSwitch}>
        <Text fontSize={16} weight="semiBold" style={styles.knownSwitchText}>
          Known Initial Distribution
        </Text>

        <View style={styles.knownSwitchButton}>
          <Text fontSize={16} weight="semiBold">
            No
          </Text>

          <Switch value={distState.known} onValueChange={toggleDistKnownState} />

          <Text fontSize={16} weight="semiBold">
            Yes
          </Text>
        </View>
      </View> */}
    </PageContainer>
  );
};

export default Landing;
