import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../redux/store';
import type {AuthStackParamList} from '../navigation/types';
import type {StackNavigationProp} from '@react-navigation/stack';
import {loginThunk} from '../redux/authThunks';

interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
}

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('testuser@example.com'); // Prefilled email
  const [password, setPassword] = useState('Test@1234'); // Prefilled password
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await dispatch<any>(loginThunk({email, password})).unwrap();
      navigation.replace('Home');
    } catch (err: any) {
      console.log(err);

      setError(err.message || 'Login failed');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
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
            {!!error && <Text style={styles.errorText}>{error}</Text>}
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingBottom: Dimensions.get('window').height * 0.15,
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontSize: 13,
  },
});

export default LoginScreen;
