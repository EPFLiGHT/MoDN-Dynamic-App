import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {Alert, FlatList, View, ScrollView} from 'react-native';
import {Button, IconButton, Switch, TextInput} from 'react-native-paper';
import {Field, Form} from 'react-swift-form';
import {Tensor} from 'onnxruntime-react-native';
import Question from './Question/Question';
import PredictionsModal from './PredictionsModal/PredictionsModal';
import BottomBar from './BottomBar/BottomBar';
import {Text, Touchable, Picker} from '../../Components';
import {PageContainer} from '../../Containers';
import {useBackHandler, useDistributionState, useOnnxContext, useTheme} from '../../Hooks';
import QuestionsJSON from '../../Models/questions';
import DecodersJSON from '../../Models/decoders';
import {softMax} from '../../Utils/Helpers';
import {RootQuestionsScreenProps} from '../../Typings/NavigationTypes';
import GlobalStyles from '../../Styles/GlobalStyles';
import getStyles from './Questions.styles';

type Props = RootQuestionsScreenProps;

const Questions: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<PredictionsModal>(null);
  const formRef = useRef<Form>(null);
  const theme = useTheme();
  const {state: distState} = useDistributionState();
  const onnxModels = useOnnxContext();

  const [predictions, setPredictions] = useState<Record<keyof DecodersJSON, number>>();
  const [predictionsPerQuestion, setPredictionsPerQuestion] = useState<HeatmapPredictions>({
    'No Questions Answered': {
      answer: null,
      probability: Object.fromEntries(Object.keys(DecodersJSON).map((key) => [key, 0])),
    },
  });
  const [onlyOneAnswer, setOnlyOneAnswer] = useState(true);

  const [selectedQuestion, setSelectedQuestion] = useState<keyof QuestionsJSON | 'notSelected'>(
    'notSelected',
  );

  const HeaderRight = useCallback(
    () => (
      <IconButton
        icon="dots-vertical"
        iconColor={theme.colors.textStrong}
        size={20}
        onPress={() => modalRef.current?.open()}
      />
    ),
    [theme, modalRef],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [navigation, HeaderRight]);

  useBackHandler(navigation, (leavePage) => {
    Alert.alert(
      'This will reset your answers',
      "You're about to go to main page. This will reset your answers. Are you sure?",
      [
        {
          text: 'Yes, go back',
          onPress: leavePage,
          style: 'destructive',
        },
        {
          text: 'No, stay',
        },
      ],
    );
  });

  const styles = getStyles(theme);

  const onQuestionSubmitPress = async () => {
    const currentQuestion = selectedQuestion;

    const questionKeys: (typeof selectedQuestion)[] = [
      'notSelected',
      ...Object.keys(QuestionsJSON),
    ];
    const questionIndex = questionKeys.indexOf(currentQuestion) - 1;
    const nextQuestion = questionKeys[questionIndex + 2];

    const patientState = formRef.current?.getValue('patientState');
    const answeredQuestions: string[] = formRef.current?.getValue('answeredQuestions');
    const questionValue = formRef.current?.getValue(currentQuestion);

    if (onlyOneAnswer && answeredQuestions.includes(currentQuestion)) {
      Alert.alert('You have already answered this question');
      return;
    }

    if (questionValue && currentQuestion !== 'notSelected') {
      formRef.current?.changeValue('answeredQuestions', (prev: string[]) => [
        ...prev,
        currentQuestion,
      ]);

      const currState = patientState?.output_state || distState;

      const encoderModel = onnxModels.encoders[currentQuestion];

      let questionAnswer: Tensor | Tensor[] | null = null;

      questionAnswer = new Tensor(
        'float32',
        new Float32Array([parseInt(questionValue, 10) || 0]),
        [1, 1],
      );

      const newPatientState = await encoderModel.run(
        {
          state0: currState,
          x0: questionAnswer,
        },
        encoderModel.outputNames,
      );

      const predictionResults: typeof predictions = Object.fromEntries(
        await Promise.all(
          Object.entries(onnxModels.decoders).map(async ([decoderName, decoderModel]) => {
            const result = await decoderModel.run(
              {state0: newPatientState.output_state},
              decoderModel.outputNames,
            );

            return [decoderName, softMax(result.output_disease.data as unknown as number[])[1]];
          }),
        ),
      );

      setPredictions(predictionResults);

      setPredictionsPerQuestion((prev) => ({
        ...prev,

        [currentQuestion]: {
          answer: questionValue,
          probability: predictionResults
            ? Object.fromEntries(
                Object.entries(predictionResults).map(([key, value]) => [
                  DecodersJSON[key as keyof DecodersJSON],
                  value,
                ]),
              )
            : Object.fromEntries(Object.keys(DecodersJSON).map((key) => [key, 0])),
        },
      }));
      formRef.current?.changeValue('patientState', newPatientState);
    }

    if (nextQuestion) setSelectedQuestion(nextQuestion);
    else setSelectedQuestion('notSelected');
  };

  return (
    <View style={GlobalStyles.flex1}>
      <PageContainer withPadding withSafeArea edges={['bottom', 'left', 'right']}>
        <Form
          ref={formRef}
          initialState={{
            patientState: undefined,
            answeredQuestions: [],
            question1: '',
            question2: {},
            question3: '',
          }}
        >
          <View style={styles.container}>
            <View style={styles.switch}>
              <Text style={styles.switchText}>Questions can be answered only once</Text>

              <Switch
                value={onlyOneAnswer}
                onValueChange={() => setOnlyOneAnswer((prev) => !prev)}
              />
            </View>

            <Picker
              // eslint-disable-next-line react/no-unstable-nested-components
              handle={({onPress}) => (
                <Touchable onPress={onPress}>
                  <View pointerEvents="box-only">
                    <TextInput
                      value={
                        selectedQuestion !== 'notSelected'
                          ? `Q${Object.keys(QuestionsJSON).indexOf(selectedQuestion) + 1}) ${
                              QuestionsJSON[selectedQuestion].title
                            }`
                          : 'Select a Question'
                      }
                      mode="flat"
                      right={<TextInput.Icon icon="chevron-down" />}
                    />
                  </View>
                </Touchable>
              )}
              label="Select a Question"
              selectedValue={selectedQuestion}
              onValueChange={(value) => setSelectedQuestion(value as keyof QuestionsJSON)}
            >
              <Picker.Item label="Summary of Questions" value="notSelected" />

              {Object.entries(QuestionsJSON).map(([key, question], index) => (
                <Picker.Item key={key} label={`Q${index + 1}) ${question.title}`} value={key} />
              ))}
            </Picker>

            {selectedQuestion !== 'notSelected' ? (
              <ScrollView contentContainerStyle={styles.questionContent}>
                <Question id={selectedQuestion} />

                <Button mode="contained" onPress={onQuestionSubmitPress}>
                  Submit
                </Button>
              </ScrollView>
            ) : (
              <FlatList
                data={Object.entriesTypeSafe(QuestionsJSON).map<[keyof QuestionsJSON, string]>(
                  ([key, question]) => [key, question.title],
                )}
                keyExtractor={([key]) => key}
                renderItem={({item: [name, label], index}) => (
                  <Touchable onPress={() => setSelectedQuestion(name)}>
                    <View style={styles.answerItem}>
                      <Text fontSize={20}>
                        {`Q${index + 1})`} {label}
                      </Text>

                      <Field id={name}>
                        {({value}) => (
                          <Text fontSize={16} style={styles.answerItemAnswer}>
                            {value
                              ? `Answer: ${
                                  typeof value === 'object'
                                    ? JSON.stringify(value)
                                    : QuestionsJSON[name].choices[value]
                                }`
                              : 'Not answered'}
                          </Text>
                        )}
                      </Field>
                    </View>
                  </Touchable>
                )}
              />
            )}
          </View>

          <PredictionsModal
            ref={modalRef}
            navigation={navigation}
            predictions={predictions}
            predictionsPerQuestion={predictionsPerQuestion}
          />
        </Form>
      </PageContainer>

      <BottomBar
        modalRef={modalRef}
        predictionsPerQuestion={predictionsPerQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />
    </View>
  );
};

export default Questions;
