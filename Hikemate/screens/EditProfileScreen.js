import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { ref, get, update } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username);
          setPhoneNumber(data.phoneNumber);
        } else {
          console.error('No user data available');
        }
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      update(userRef, {
        username: username,
        phoneNumber: phoneNumber,
      }).then(() => {
        Alert.alert('Success', 'Your information has been updated.');
        navigation.goBack();
      }).catch((error) => {
        console.error('Error updating user data:', error);
        Alert.alert('Error', 'Failed to update your information.');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#429590',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
