import {View} from 'react-native';
import {Switch} from 'react-native-paper';
import {Field} from 'react-swift-form';
import {Text} from '../../../Components';
import styles from './QuestionComps.styles';

const Question2: React.VFC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is question two.{'\n'}Choose the applicable options:</Text>

      <Field id="question2">
        {({value, changeValue}) => (
          <>
            <View style={styles.switch}>
              <Text fontSize={16}>First option</Text>

              <Switch
                value={value[0]}
                onValueChange={() => changeValue((prev: any) => ({...prev, 0: !prev[0]})) as any}
              />
            </View>

            <View style={styles.switch}>
              <Text fontSize={16}>Second Option</Text>

              <Switch
                value={value[1]}
                onValueChange={() => changeValue((prev: any) => ({...prev, 1: !prev[1]})) as any}
              />
            </View>

            <View style={styles.switch}>
              <Text fontSize={16}>Third Option</Text>

              <Switch
                value={value[2]}
                onValueChange={() => changeValue((prev: any) => ({...prev, 2: !prev[2]})) as any}
              />
            </View>
          </>
        )}
      </Field>
    </View>
  );
};

export default Question2;
