import {createContext, useContext} from 'react';
import {InferenceSession} from 'onnxruntime-react-native';
import Questions from '../Models/questions';
import Decoders from '../Models/decoders';

export const OnnxContext = createContext<{
  encoders: Record<keyof Questions, InferenceSession>;
  decoders: Record<keyof Decoders, InferenceSession>;
}>({
  encoders: {} as any,
  decoders: {} as any,
});

export const useOnnxContext = () => {
  return useContext(OnnxContext);
};
