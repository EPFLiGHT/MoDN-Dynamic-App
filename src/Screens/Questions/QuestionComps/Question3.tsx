import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Field} from 'react-swift-form';
import {Text, Touchable} from '../../../Components';
import styles from './QuestionComps.styles';

const Question3: React.VFC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is question three.{'\n'}Choose the applicable options:</Text>

      <Field id="question3">
        {({value, changeValue}) => (
          <View>
            <View style={styles.radioContainer}>
              <Touchable style={styles.radioInner} onPress={() => changeValue('0')}>
                <RadioButton
                  value="0"
                  status={value === '0' ? 'checked' : 'unchecked'}
                  onPress={() => changeValue('0')}
                />

                <Text>First Option</Text>
              </Touchable>
            </View>

            <View style={styles.radioContainer}>
              <Touchable style={styles.radioInner} onPress={() => changeValue('1')}>
                <RadioButton
                  value="1"
                  status={value === '1' ? 'checked' : 'unchecked'}
                  onPress={() => changeValue('1')}
                />

                <Text>Second Option</Text>
              </Touchable>
            </View>

            <View style={styles.radioContainer}>
              <Touchable style={styles.radioInner} onPress={() => changeValue('2')}>
                <RadioButton
                  value="2"
                  status={value === '2' ? 'checked' : 'unchecked'}
                  onPress={() => changeValue('2')}
                />

                <Text>Third option</Text>
              </Touchable>
            </View>
          </View>
        )}
      </Field>
    </View>
  );
};

export default Question3;
