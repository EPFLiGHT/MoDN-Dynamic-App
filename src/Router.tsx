import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './Typings/NavigationTypes';

import Landing from './Screens/Landing/Landing';
import Questions from './Screens/Questions/Questions';
import Heatmap from './Screens/Heatmap/Heatmap';

const RootStack = createNativeStackNavigator<RootStackParams>();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Landing"
        screenOptions={{headerShown: false, orientation: 'portrait'}}
      >
        <RootStack.Screen name="Landing" component={Landing} />

        <RootStack.Screen name="Questions" component={Questions} options={{headerShown: true}} />

        <RootStack.Screen
          name="Heatmap"
          component={Heatmap}
          options={{headerShown: true, orientation: 'landscape'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
