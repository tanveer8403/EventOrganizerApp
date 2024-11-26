import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firebase } from '../firebaseConfig';

function AddEditEventScreen({ route, navigation }) {
  const [title, setTitle] = useState(route.params?.event?.title || '');
  const [date, setDate] = useState(route.params?.event?.date || '');
  const eventKey = route.params?.event?.key;

  const handleSaveEvent = async () => {
    if (eventKey) {
      // Update existing event
      firebase.firestore().collection('events').doc(eventKey).update({ title, date });
    } else {
      // Add new event
      firebase.firestore().collection('events').add({
        title,
        date,
        userId: firebase.auth().currentUser.uid,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Save Event" onPress={handleSaveEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});

export default AddEditEventScreen;
