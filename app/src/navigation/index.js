import DetailScreen from '../screen/detail/DetailScreen';
import HomeScreen from '../screen/home/HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const HomeStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const HomeStackContainer = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Home" component={HomeStackContainer} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
