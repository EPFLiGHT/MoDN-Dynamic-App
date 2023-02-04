import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Field} from 'react-swift-form';
import {Text} from '../../../Components';
import {OnlyNumericPad} from '../../../Utils/Helpers';
import styles from './QuestionComps.styles';

const Question1: React.VFC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is question one.{'\n'}Enter the input:</Text>

      <Field id="question1">
        {({value, changeValue}) => (
          <TextInput
            label="Question label"
            placeholder="Question placeholder"
            mode="outlined"
            value={value}
            onChangeText={changeValue}
            keyboardType={OnlyNumericPad}
          />
        )}
      </Field>
    </View>
  );
};

export default Question1;
