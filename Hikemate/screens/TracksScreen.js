// TracksScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const TracksScreen = () => {
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'tracks'));
        const tracksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTracks(tracksList);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => navigation.navigate('TrackDetails', { track: item })}
    >
      <Text style={styles.trackName}>{item.trackName}</Text>
      <Text style={styles.trackDetails}>{item.distance.toFixed(1)} km, {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  trackItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default TracksScreen;
