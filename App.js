import 'react-native-gesture-handler';
import React from 'react';
import { YellowBox, Button, TouchableOpacity } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
console.ignoredYellowBox = ['Remote debugger'];
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import { MaterialIcons } from '@expo/vector-icons';

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
        name="ResultsShowScreen" 
        component={ResultsShowScreen}
        options= {({ navigation }) => ({
          title: 'Result Details',
          headerLeft: () => {
            const goBack = () => {
              navigation.navigate('Search');
            }
            return (<TouchableOpacity style={{marginLeft: 15}} onPress={goBack}>
              <MaterialIcons style={{paddingRight: 15}} name="arrow-back" size={30} color="black" />
            </TouchableOpacity>)
          }
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
