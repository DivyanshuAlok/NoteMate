import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
};

interface SignUpScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const screenWidth = Dimensions.get('window').width;

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Add sign up logic here
    // For now, just navigate back to Login
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        style={styles.input}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={[styles.input, {marginBottom: 20}]}
      />
      <View style={styles.button}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <View style={styles.loginButton}>
        <Button
          title="Back to Login"
          onPress={() => navigation.pop()}
          color="#888"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: screenWidth * 0.125,
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
  loginButton: {
    width: screenWidth * 0.75,
    marginTop: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
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
});

export default SignUpScreen;
