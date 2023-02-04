import {useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import {InferenceSession} from 'onnxruntime-react-native';
import {useTheme} from './Hooks';
import Providers from './Providers';
import Router from './Router';
import {ThemedStyleSheet} from './Utils/ThemedStyleSheet';
import {LoadModel} from './Utils/LoadModel';
import {OnnxContext} from './Hooks/OnnxContext';
import Questions from './Models/questions';
import Decoders from './Models/decoders';

function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}

const AppContent: React.FC = () => {
  const encoderModels = useRef<Record<keyof Questions, InferenceSession>>({} as any);
  const decoderModels = useRef<Record<keyof Decoders, InferenceSession>>({} as any);

  const loadModels = async () => {
    await Promise.all(
      Object.keys(Questions).map(async (key) => {
        encoderModels.current[key] = await InferenceSession.create(await LoadModel(`${key}.ort`));
      }),
    );

    await Promise.all(
      Object.keys(Decoders).map(async (key) => {
        decoderModels.current[key] = await InferenceSession.create(await LoadModel(`${key}.ort`));
      }),
    );
  };

  useEffect(() => {
    loadModels();
  }, []);

  const theme = useTheme();

  const styles = getStyles(theme);

  const onnxContextValue = useMemo(
    () => ({encoders: encoderModels.current, decoders: decoderModels.current}),
    [encoderModels, decoderModels],
  );

  return (
    <View style={styles.container}>
      <OnnxContext.Provider value={onnxContextValue}>
        <Router />
      </OnnxContext.Provider>
    </View>
  );
};

const getStyles = ThemedStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default App;
