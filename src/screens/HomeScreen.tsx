import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import {RootState} from '../redux/store';
import type {StackNavigationProp} from '@react-navigation/stack';

type AppStackParamList = {
  Home: undefined;
  Login: undefined;
};

interface HomeScreenProps {
  navigation: StackNavigationProp<AppStackParamList, 'Home'>;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome, {user}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
