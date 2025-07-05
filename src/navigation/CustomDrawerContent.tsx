import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet} from 'react-native';

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.appName}>Note Mate +</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196f3',
    marginTop: 2,
  },
});

export default CustomDrawerContent;
