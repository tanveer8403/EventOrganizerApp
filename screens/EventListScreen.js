import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
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
      });

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}, Date: {item.date}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('AddEditEvent', { event: item })} />
          </View>
        )}
      />
      <Button title="Add Event" onPress={() => navigation.navigate('AddEditEvent')} />
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 4,
    borderColor: 'gray',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

export default EventListScreen;
