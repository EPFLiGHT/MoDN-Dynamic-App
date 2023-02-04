import {Picker} from '@react-native-picker/picker';

export interface PickerProps<T extends string = string> {
  children: React.ReactNode;
  label: string;
  handle: (props: {onPress: () => void}) => React.ReactNode;
  selectedValue?: T;
  onValueChange?: (value: T) => void;
}

export interface PickerSubComponents {
  Item: typeof Picker.Item;
}
