import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Host as PortalizeProvider} from 'react-native-portalize';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {DistributionStateProvider} from './Hooks';

const Providers: React.FC<{children: React.ReactNode}> = ({children}) => {
  const paperTheme: typeof DefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff5555',
      surfaceVariant: '#FFDDDD',

      elevation: {
        ...DefaultTheme.colors.elevation,
        level2: '#FFDDDD',
      },
    },
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <DistributionStateProvider>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <PortalizeProvider>{children}</PortalizeProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </DistributionStateProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

export default Providers;
