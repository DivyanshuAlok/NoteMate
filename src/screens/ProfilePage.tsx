import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {logout} from '../redux/slices/authSlice';
import type {AppDrawerParamList} from '../navigation/types';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

const photoUrl = 'https://randomuser.me/api/portraits/men/1.jpg';

interface ProfilePageProps {
  navigation: DrawerNavigationProp<AppDrawerParamList, 'Profile'>;
}

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to read photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const ProfilePage = ({navigation}: ProfilePageProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [profilePic, setProfilePic] = useState(photoUrl);

  const openImagePicker = async () => {
    await requestCameraPermission();
    await requestStoragePermission();

    // Proceed with image picking if permissions are granted
    let options = {
      mediaType: 'photo' as MediaType,

      // Other options like maxWidth, maxHeight, quality, etc. can be added here.
    };

    launchImageLibrary(options, res => {
      // Handle the response
      setProfilePic(res?.assets[0]?.uri!);
    });
    // launchCamera(options, res => {
    //   console.log(res.assets);
    //   setProfilePic(res?.assets[0]?.uri!);
    // });
  };

  // Placeholder name and photo
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openImagePicker}>
        <Image source={{uri: profilePic}} style={styles.profilePic} />
      </TouchableOpacity>

      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.label}>Email: {user?.email}</Text>
      {/* <Text style={styles.value}>{user}</Text> */}
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
