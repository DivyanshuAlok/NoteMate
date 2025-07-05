import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {AppStackParamList} from '../navigation/types';
import {useDispatch} from 'react-redux';
import {updateNote} from '../redux/slices/noteSlice';

// This assumes you have a note type and navigation param type set up

type EditNoteScreenRouteProp = RouteProp<AppStackParamList, 'EditNote'>;

const EditNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditNoteScreenRouteProp>();
  const dispatch = useDispatch();
  const {note} = route.params;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    dispatch(updateNote({...note, title, content}));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit Note</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="#888" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default EditNoteScreen;
