import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {logout} from '../redux/slices/authSlice';
import type {AppDrawerParamList} from '../navigation/types';
import type {DrawerNavigationProp} from '@react-navigation/drawer';

interface ProfilePageProps {
  navigation: DrawerNavigationProp<AppDrawerParamList, 'Profile'>;
}

const ProfilePage = ({navigation}: ProfilePageProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  // Placeholder name and photo
  const name = user ? user.split('@')[0] : 'User';
  const photoUrl = 'https://randomuser.me/api/portraits/men/1.jpg';
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Image source={{uri: photoUrl}} style={styles.profilePic} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user}</Text>
      <Text style={{marginTop: 32}} />
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    marginTop: 8,
  },
});

export default ProfilePage;
