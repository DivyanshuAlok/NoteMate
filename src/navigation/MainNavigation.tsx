import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AppDrawer from './AppDrawer';

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return <AppDrawer />;
}

const MainNavigation = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default MainNavigation;
