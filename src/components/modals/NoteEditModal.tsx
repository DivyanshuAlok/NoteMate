import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Note} from '../../redux/slices/noteSlice';

interface NoteEditModalProps {
  visible: boolean;
  note: Note | null;
  onClose: () => void;
  onSave: (note: Note) => void;
  onDelete: () => void;
}

const NoteEditModal: React.FC<NoteEditModalProps> = ({
  visible,
  note,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [contentHeight, setContentHeight] = useState(100);

  React.useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // You may want to pass a delete callback via props
            if (note) {
              onDelete();
            }
            onClose();
          },
        },
      ],
      {cancelable: true},
    );
  };

  if (!note) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Edit Note</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          <View style={styles.labelRow}>
            <Text style={styles.label}>Content</Text>
            <TouchableOpacity style={styles.addImageBtn}>
              <Text style={styles.addImageText}>+ Add Images</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <TextInput
              style={[styles.input, {height: Math.max(100, contentHeight)}]}
              value={content}
              onChangeText={setContent}
              placeholder="Content"
              multiline
              onContentSizeChange={e =>
                setContentHeight(e.nativeEvent.contentSize.height)
              }
            />
          </ScrollView>
          <View style={styles.buttonRow}>
            <View style={styles.rowGap}>
              <Button title="Cancel" onPress={onClose} color="#888" />
              <Button title="Delete" onPress={handleDelete} color="#f00" />
            </View>

            <Button
              title="Save"
              onPress={() =>
                onSave({
                  ...note,
                  title,
                  content,
                  updatedAt: new Date().toISOString(),
                })
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    maxHeight: '93%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#fafafa',
    textAlignVertical: 'top', // Ensures multiline text starts at the top
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rowGap: {flexDirection: 'row', gap: 10},
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
  },
  addImageBtn: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  addImageText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NoteEditModal;
