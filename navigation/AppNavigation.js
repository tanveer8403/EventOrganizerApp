import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventListScreen from '../screens/EventListScreen';
import AddEditEventScreen from '../screens/AddEditEventScreen';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Events" component={EventListScreen} />
        <Stack.Screen name="AddEditEvent" component={AddEditEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
