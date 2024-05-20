// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { firestore, auth } from '../firebase';
// import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

// const MyTracksScreen = () => {
//   const [tracks, setTracks] = useState([]);
//   const navigation = useNavigation();

//   const fetchTracks = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const q = query(collection(firestore, 'tracks'), where('userId', '==', user.uid));
//         const querySnapshot = await getDocs(q);
//         const tracksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTracks(tracksList);
//       }
//     } catch (error) {
//       console.error('Error fetching tracks:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchTracks();
//     }, [])
//   );

//   const handleDelete = async (trackId) => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const trackRef = doc(firestore, 'tracks', trackId);
//         await deleteDoc(trackRef);
//         setTracks(tracks.filter(track => track.id !== trackId));
//         Alert.alert('Success', 'Track deleted successfully');
//       }
//     } catch (error) {
//       console.error('Error deleting track:', error);
//       Alert.alert('Error', 'Failed to delete track');
//     }
//   };

//   const handleEdit = (track) => {
//     navigation.navigate('EditTrackScreen', { track, onGoBack: fetchTracks });
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.trackItem}>
//       <TouchableOpacity onPress={() => navigation.navigate('TrackDetails', { track: item })}>
//         <Text style={styles.trackName}>{item.trackName}</Text>
//         <Text style={styles.trackDetails}>{item.distance.toFixed(1)} km, {item.time}</Text>
//       </TouchableOpacity>
//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
//           <Text style={styles.actionText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
//           <Text style={styles.actionText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   trackItem: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   trackName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   trackDetails: {
//     fontSize: 14,
//     color: '#666',
//   },
//   actions: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   actionButton: {
//     marginRight: 10,
//     padding: 10,
//     backgroundColor: '#429590',
//     borderRadius: 5,
//   },
//   actionText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default MyTracksScreen;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTracks } from './TrackContext';

const MyTracksScreen = () => {
  const { tracks, fetchTracks, deleteTrack } = useTracks();
  const navigation = useNavigation();

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleDelete = (trackId) => {
    deleteTrack(trackId)
      .then(() => {
        Alert.alert('Success', 'Track deleted successfully');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete track');
      });
  };

  const handleEdit = (track) => {
    navigation.navigate('EditTrackScreen', { track });
  };

  const renderItem = ({ item }) => (
    <View style={styles.trackItem}>
      <TouchableOpacity onPress={() => navigation.navigate('TrackDetails', { track: item })}>
        <Text style={styles.trackName}>{item.trackName}</Text>
        <Text style={styles.trackDetails}>{item.distance.toFixed(1)} km, {item.time}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#429590',
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyTracksScreen;
