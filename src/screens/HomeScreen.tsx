import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import {RootState} from '../redux/store';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {AppDrawerParamList} from '../navigation/types';

interface HomeScreenProps {
  navigation: DrawerNavigationProp<AppDrawerParamList, 'Home'>;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const notes = useSelector((state: RootState) => state.notes.notes);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search your notes"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {notes.length === 0 ? (
          <>
            <Text style={{color: '#888', fontSize: 18, marginTop: 32}}>
              No notes here, please add a note.
            </Text>
            <View style={{height: 120}} />
          </>
        ) : (
          <Text>Welcome, {user}!</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          /* handle add note */
        }}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  searchBar: {
    flex: 1,
    height: 44, // Increased height
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  profilePicContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 40,
    color: '#2196f3',
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

export default HomeScreen;
