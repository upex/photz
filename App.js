import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer initialRouteName='Search'>
      <Stack.Navigator screenOptions={
        {
          title: 'Photz',
          headerTitleAlign: 'center'
        }
      }
      >
        <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        />
        <Stack.Screen 
        name="ResultDetails" 
        component={ResultsShowScreen}
        options={{title: 'Result Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;