import {useRef} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {Picker as RNPicker} from '@react-native-picker/picker';
import {useTheme} from '../../Hooks';
import Text from '../Text/Text';
import {PickerProps, PickerSubComponents} from './Picker.props';
import getStyles from './Picker.styles';
import Modalize from '../Modalize/Modalize';
import {IsAndroid} from '../../Utils/Helpers';

const Picker: React.FC<PickerProps> & PickerSubComponents = (props) => {
  const {children, label, handle, selectedValue, onValueChange} = props;

  const modalizeRef = useRef<Modalize>(null);
  const pickerRef = useRef<RNPicker<any>>(null);

  const theme = useTheme();

  const styles = getStyles(theme);

  const onHandlePress = () => {
    if (IsAndroid) {
      pickerRef.current?.focus();
    } else {
      modalizeRef.current?.open();
    }
  };

  const onSelectPress = () => {
    modalizeRef.current?.close();
  };

  return (
    <View>
      <View style={styles.container}>{handle({onPress: onHandlePress})}</View>

      {IsAndroid ? (
        <View style={styles.android}>
          <RNPicker
            ref={pickerRef}
            mode="dialog"
            prompt={label}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
          >
            {children}
          </RNPicker>
        </View>
      ) : (
        <Modalize ref={modalizeRef}>
          <Text
            weight="bold"
            color="textStrong"
            align="center"
            fontSize={18}
            style={styles.IOStitle}
          >
            {label}
          </Text>

          <RNPicker ref={pickerRef} selectedValue={selectedValue} onValueChange={onValueChange}>
            {children}
          </RNPicker>

          <Button mode="contained" onPress={onSelectPress}>
            Select
          </Button>
        </Modalize>
      )}
    </View>
  );
};

Picker.Item = RNPicker.Item;

export default Picker;
