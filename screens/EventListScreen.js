import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient
import { firebase } from '../firebaseConfig';

function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('events')
      .where('userId', '==', firebase.auth().currentUser .uid)
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
    <LinearGradient
      colors={['#FFB6C1', '#FF69B4']} // Light pink to hot pink gradient
      style={styles.gradient} // Apply gradient style
    >
      <View style={styles.container}>
        {/* Add Image Component */}
        <Image 
          source={{ uri: '/Users/tanveer/Documents/Semester 3 /EventOrganizerApp/myimg.jpg' }} 
          style={styles.logo}
        />
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
    </LinearGradient>
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
  gradient: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120, // Adjust as needed
    height: 120, // Adjust as needed
    marginBottom: 20, // Space between the image and the list
    borderRadius: 60, // Make it circular
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
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