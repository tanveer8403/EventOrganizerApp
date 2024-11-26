import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient'; 

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // Navigate to your app's main feature or dashboard
        navigation.navigate('Main');
        // Optionally handle additional user information or verification steps
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Show error message to user
        Alert.alert("Signup Failed", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#333',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
    },
    button: {
      backgroundColor: '#5cb85c',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      shadowColor: '#2a912a',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  // Usage of LinearGradient for background
  <View style={styles.container}>
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
  

export default SignupScreen;
