import {Tensor, TypedTensor} from 'onnxruntime-react-native';
import {STATE_SIZE} from '../Utils/Constants';
import createContext from '../Utils/ContextCreator';

export const {
  ContextProvider: DistributionStateProvider,
  useContext: useDistributionState,
  useSetContext: useSetDistributionState,
} = createContext<{known: boolean; state: TypedTensor<'float32'>}>({
  known: true,
  state: new Tensor('float32', new Float32Array(STATE_SIZE), [1, STATE_SIZE]),
});
