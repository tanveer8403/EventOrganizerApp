import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { firebase } from '../firebaseConfig';

function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('events')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const events = [];
        querySnapshot.forEach(documentSnapshot => {
          events.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setEvents(events);
      }, (error) => {
        Alert.alert('Error fetching events', error.message);
      });

    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => navigation.navigate('AddEditEvent', { event: item })} />
              <Button title="Delete" color="red" onPress={() => deleteEvent(item.key)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <Button title="Add Event" onPress={() => navigation.navigate('AddEditEvent', { event: null })} />
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

const deleteEvent = async (key) => {
  try {
    await firebase.firestore().collection('events').doc(key).delete();
    Alert.alert('Event Deleted', 'The event has been successfully deleted.');
  } catch (error) {
    Alert.alert('Error', 'Failed to delete the event.');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default EventListScreen;
