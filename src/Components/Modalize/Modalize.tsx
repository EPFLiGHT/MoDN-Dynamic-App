import {forwardRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Modalize as RNModalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useTheme} from '../../Hooks';
import {IsIOS} from '../../Utils/Helpers';
import {ModalizeProps} from './Modalize.props';
import getStyles from './Modalize.styles';

type Modalize = RNModalize;

const Modalize = forwardRef<RNModalize, ModalizeProps>((props, ref) => {
  const {children, modalStyle, ...modalizeProps} = props;

  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <Portal>
      <RNModalize
        adjustToContentHeight
        modalStyle={[styles.modal, modalStyle]}
        handlePosition={IsIOS ? 'inside' : 'outside'}
        {...modalizeProps}
        ref={ref}
      >
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.content}>
          {children}
        </SafeAreaView>
      </RNModalize>
    </Portal>
  );
});

export default Modalize;
