import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useTracks } from './TrackContext';

const EditTrackScreen = ({ route, navigation }) => {
  const { track } = route.params;
  const { updateTrack } = useTracks();
  const [trackName, setTrackName] = useState(track.trackName);
  const [distance, setDistance] = useState(track.distance.toString());
  const [time, setTime] = useState(track.time);
  const [description, setDescription] = useState(track.description); // New state for description

  useEffect(() => {
    console.log('Track data:', track);
  }, [track]);

  const handleUpdate = async () => {
    try {
      await updateTrack(track.id, {
        trackName,
        distance: parseFloat(distance),
        time,
        description, // Include description in the update
      });
      Alert.alert('Success', 'Track updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update track');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Track Name</Text>
      <TextInput
        style={styles.input}
        value={trackName}
        onChangeText={setTrackName}
      />
      <Text style={styles.label}>Distance (km)</Text>
      <TextInput
        style={styles.input}
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Description</Text> 
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Track</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
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

export default EditTrackScreen;
