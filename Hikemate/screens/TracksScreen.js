import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, get } from 'firebase/database';

const TracksScreen = () => {
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'tracks'));
        const tracksList = await Promise.all(querySnapshot.docs.map(async doc => {
          const trackData = doc.data();
          if (trackData.userId !== auth.currentUser.uid) {
            const userSnapshot = await get(ref(db, `users/${trackData.userId}`));
            const userData = userSnapshot.val();
            return { id: doc.id, ...trackData, username: userData?.username || 'Unknown' };
          }
        }));
        setTracks(tracksList.filter(track => track)); // Filter out undefined values
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
      <Text style={styles.trackUser}>Created by: {item.username}</Text>
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
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  trackItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  trackDetails: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  trackUser: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default TracksScreen;
