import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface NoteCardProps {
  title: string;
  content: string;
  imageUrls?: string[];
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  imageUrls = [],
}) => {
  // Show only first 2 lines of content
  const preview =
    content.length > 100 ? content.slice(0, 100) + '...' : content;
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {preview}
      </Text>
      <View style={styles.attachmentRow}>
        <Text style={styles.attachmentCount}>
          {imageUrls.length} attachment{imageUrls.length === 1 ? '' : 's'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    minWidth: 160,
    maxWidth: 220,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  content: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    maxWidth: '100%',
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentThumb: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 8,
  },
  attachmentCount: {
    fontSize: 13,
    color: '#888',
  },
});

export default NoteCard;
