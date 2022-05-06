import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default App = () => {
	return(
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Splash' component={SplashScreen}/>
				<Stack.Screen name='Main' component={MainScreen}/>
				<Stack.Screen name='Detail' component={DetailScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}