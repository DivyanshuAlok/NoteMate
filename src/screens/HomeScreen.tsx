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
import NoteCard from '../components/NoteCard';
import {addNote, deleteNote, Note, updateNote} from '../redux/slices/noteSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import NoteEditModal from '../components/modals/NoteEditModal';

interface HomeScreenProps {
  navigation: DrawerNavigationProp<AppDrawerParamList, 'Home'>;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
      <View style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
        {notes.length === 0 ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 0.8}}>
            <Text style={{color: '#888', fontSize: 18, marginTop: 32}}>
              No notes here, please add a note.
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {notes.map(note => (
                <TouchableOpacity
                  key={note.id}
                  onPress={() => {
                    setSelectedNote(note);
                    setModalVisible(true);
                  }}>
                  <NoteCard
                    title={note.title}
                    content={note.content}
                    imageUrls={note.imageUrls || []}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{height: 120}} />
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          const id = Date.now().toString();
          dispatch(
            addNote({
              id,
              title: 'New Note',
              content: 'This is a new note.',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              imageUrls: [],
            }),
          );
        }}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <NoteEditModal
        visible={modalVisible}
        note={selectedNote}
        onClose={() => setModalVisible(false)}
        onSave={updatedNote => {
          dispatch(updateNote(updatedNote));
          setModalVisible(false);
        }}
        onDelete={() => {
          dispatch(deleteNote(selectedNote?.id || ''));
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
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
