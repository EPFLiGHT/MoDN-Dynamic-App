import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Field} from 'react-swift-form';
import {Text, Touchable} from '../../../Components';
import styles from './Question.styles';
import Questions from '../../../Models/questions';

export interface QuestionProps {
  id: keyof Questions;
}

const Question: React.FC<QuestionProps> = (props) => {
  const {id} = props;

  const question = Questions[id];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.subtitle}>{question.description}</Text>
      <Text style={styles.chooseText}>Choose the applicable option</Text>

      <Field id={id}>
        {({value: currentValue, changeValue}) => (
          <View>
            {(question.sort
              ? question.sort.map((sortValue) => [sortValue, question.choices[sortValue]])
              : Object.entries(question.choices)
            ).map(([value, label]) => (
              <View key={value} style={styles.radioContainer}>
                <Touchable style={styles.radioInner} onPress={() => changeValue(value)}>
                  <RadioButton
                    value={value}
                    status={currentValue === value ? 'checked' : 'unchecked'}
                    onPress={() => changeValue(value)}
                  />

                  <Text>{label}</Text>
                </Touchable>
              </View>
            ))}
          </View>
        )}
      </Field>
    </View>
  );
};

export default Question;
