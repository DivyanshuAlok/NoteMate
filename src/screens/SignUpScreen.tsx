import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSignUp} from '../api/useSignUp';

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
  const [email, setEmail] = useState('testuser@example.com');
  const [password, setPassword] = useState('Test@1234');
  const [confirmPassword, setConfirmPassword] = useState('Test@1234');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signUpMutation = useSignUp();

  const validateEmail = (email: string) => {
    // Simple email regex
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      valid = false;
    }
    if (!valid) return;
    try {
      await signUpMutation.mutateAsync({email, password});
      navigation.replace('Login');
    } catch (err: any) {
      setEmailError(err.message || 'Sign up failed');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>Sign Up</Text>
              {signUpMutation.isPending && (
                <ActivityIndicator
                  size="large"
                  color="#1976d2"
                  style={{marginBottom: 20}}
                />
              )}
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              onBlur={() => {
                if (!validateEmail(email)) {
                  setEmailError('Please enter a valid email address.');
                } else {
                  setEmailError('');
                }
              }}
            />
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={[styles.input, {flex: 1, marginBottom: 20}]}
                onBlur={handleConfirmPasswordBlur}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(v => !v)}
                style={styles.eyeButton}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.eyeText,
                    {color: showConfirmPassword ? '#1976d2' : '#888'},
                  ]}>
                  {showConfirmPassword ? 'HIDE' : 'SHOW'}
                </Text>
              </TouchableOpacity>
            </View>
            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
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
  errorText: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontSize: 13,
  },
  passwordRow: {
    flexDirection: 'row',
    width: screenWidth * 0.75,
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: 8,
    padding: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeText: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default SignUpScreen;
