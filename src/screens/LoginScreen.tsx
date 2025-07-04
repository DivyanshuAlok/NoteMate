import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/authSlice';
import type {AuthStackParamList} from '../navigation/types';
import type {StackNavigationProp} from '@react-navigation/stack';

interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
}

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add validation here
    dispatch(login(email));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, {marginBottom: 20}]}
      />
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.signupButton}>
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          color="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Dimensions.get('window').width * 0.125, // 12.5% left indent
    marginBottom: Dimensions.get('window').height * 0.15, // 10% bottom indent},
  },
  input: {
    width: screenWidth * 0.75,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    width: screenWidth * 0.75,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 0,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  signupButton: {
    width: screenWidth * 0.75,
    marginTop: 15, // Increased space between Login and Sign Up
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
});

export default LoginScreen;
