import {forwardRef, useImperativeHandle, useRef} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Divider} from 'react-native-paper';
import colorInterpolate from 'color-interpolate';
import {Modalize, Text} from '../../../Components';
import {useTheme} from '../../../Hooks';
import Decoders from '../../../Models/decoders';
import Questions from '../../../Models/questions';
import GlobalStyles from '../../../Styles/GlobalStyles';
import {PredictionsModalProps} from './PredictionsModal.props';
import getStyles from './PredictionsModal.styles';

type PredictionsModal = Modalize;

const PredictionsModal = forwardRef<Modalize, PredictionsModalProps>((props, ref) => {
  const {navigation, predictions, predictionsPerQuestion} = props;

  const modalRef = useRef<Modalize>(null);

  const theme = useTheme();

  const styles = getStyles(theme);

  const interpolate = colorInterpolate(theme.gradients.predictionsText);

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.open();
    },
    close: () => {
      modalRef.current?.close();
    },
  }));

  const onHeatmapPress = () => {
    navigation.navigate('Heatmap', {predictions: predictionsPerQuestion});
    modalRef.current?.close();
  };

  const lastAnweredName = Object.keys(predictionsPerQuestion).pop() as keyof Questions;
  const lastAnswered =
    predictionsPerQuestion[lastAnweredName].answer !== null ? lastAnweredName : null;

  return (
    <Modalize ref={modalRef}>
      <Text weight="bold" color="textStrong" align="center" fontSize={24} style={styles.modalTitle}>
        Predictions
      </Text>

      <Divider style={styles.modalTitleDivider} />

      {predictions && lastAnswered ? (
        <>
          <Text align="center">Last answered question: {Questions[lastAnswered].title}</Text>

          <View style={styles.gradientLineContainer}>
            <LinearGradient
              colors={theme.gradients.predictionsText}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientLine}
            />

            <View style={styles.gradientLineNums}>
              <Text align="left" style={GlobalStyles.flex1}>
                -100%{'\n'}Likelihood of Not Having Disease
              </Text>

              <Text align="center" style={GlobalStyles.flex1}>
                0%{'\n'}Uncertain
              </Text>

              <Text align="right" style={GlobalStyles.flex1}>
                100%{'\n'}Likelihood of Having Disease
              </Text>
            </View>
          </View>

          {Object.entriesTypeSafe(predictions).map(([key, value]) => (
            <View key={key} style={[GlobalStyles.flex1, GlobalStyles.row]}>
              <View style={GlobalStyles.flex1}>
                <Text fontSize={16} lineHeight={28}>
                  {Decoders[key]}:
                </Text>
              </View>

              <Text
                fontSize={16}
                lineHeight={28}
                weight="black"
                style={{
                  color: interpolate(value),
                }}
              >
                {(value * 2 * 100 - 100).toFixed(2)}%
              </Text>
            </View>
          ))}

          <Button mode="contained" onPress={onHeatmapPress} style={styles.recalculateButton}>
            Heatmap
          </Button>

          {/* <Button mode="contained" style={styles.recalculateButton}>
          Recalculate
        </Button> */}
        </>
      ) : (
        <Text fontSize={16} lineHeight={28}>
          There are no predictions yet, please answer the questions first.
        </Text>
      )}
    </Modalize>
  );
});

export default PredictionsModal;
