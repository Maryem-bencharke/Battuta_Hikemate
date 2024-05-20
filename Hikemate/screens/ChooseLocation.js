// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import * as Location from 'expo-location';
// import MapViewDirections from 'react-native-maps-directions';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { GOOGLE_MAP_KEY } from '@env';

// const ChooseLocation = ({ navigation }) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [isTracking, setIsTracking] = useState(false);
//   const [destinationName, setDestinationName] = useState('');
//   const [description, setDescription] = useState('');
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!isTracking) return;

//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'Cannot access location');
//         setIsTracking(false);
//         return;
//       }

//       const subscription = await Location.watchPositionAsync({
//         accuracy: Location.Accuracy.BestForNavigation,
//         distanceInterval: 5,
//       }, (location) => {
//         const { latitude, longitude, altitude } = location.coords;
//         const timestamp = new Date().getTime();
//         setCurrentLocation({ latitude, longitude, altitude, timestamp });
//         setRoute(prevRoute => [...prevRoute, { latitude, longitude, altitude, timestamp }]);
//       });

//       return () => subscription.remove();
//     })();
//   }, [isTracking]);

//   const handleMapPress = (e) => {
//     if (!isTracking) {
//       const coords = e.nativeEvent.coordinate;
//       setDestination(coords);
//     }
//   };

//   const startTracking = () => {
//     setIsTracking(true);
//     setRoute([]);
//   };

//   const stopTracking = () => {
//     setIsTracking(false);
//     if (route.length > 0) {
//       setDestination(route[route.length - 1]);
//     }
//   };

//   const calculateTotalDistance = (route) => {
//     let totalDistance = 0;
//     for (let i = 1; i < route.length; i++) {
//       const prev = route[i - 1];
//       const curr = route[i];
//       totalDistance += Math.sqrt(
//         Math.pow(curr.latitude - prev.latitude, 2) +
//         Math.pow(curr.longitude - prev.longitude, 2)
//       );
//     }
//     return totalDistance * 111; // Convert to kilometers
//   };

//   const calculateTotalTime = (route) => {
//     if (route.length < 2) return '00:00:00';
//     const startTime = route[0].timestamp;
//     const endTime = route[route.length - 1].timestamp;
//     const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);

//     const hours = Math.floor(totalTimeInSeconds / 3600);
//     const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
//     const seconds = totalTimeInSeconds % 60;

//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const saveTrack = async (userId, track) => {
//     try {
//       await addDoc(collection(firestore, 'tracks'), {
//         userId,
//         ...track,
//         createdAt: serverTimestamp(),
//       });
//       console.log('Track saved successfully');
//     } catch (error) {
//       console.error('Error saving track:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!currentLocation || !destination) {
//       Alert.alert('Error', 'Please select both your current location and a destination.');
//       return;
//     }

//     const track = {
//       trackName: destinationName,
//       description, // Add the description here
//       coordinates: route,
//       distance: calculateTotalDistance(route),
//       time: calculateTotalTime(route),
//       maxAlt: Math.max(...route.map(p => p.altitude)),
//       minAlt: Math.min(...route.map(p => p.altitude)),
//       imageUrl: '' // Set imageUrl to an empty string since it's no longer used
//     };

//     const user = auth.currentUser;
//     if (user) {
//       await saveTrack(user.uid, track);
//     }

//     navigation.navigate('NextScreen', { location: currentLocation, destination, route, track });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={currentLocation || {
//           latitude: 32.246136,
//           longitude: -7.950090,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         onPress={handleMapPress}
//         showsUserLocation={true}
//       >
//         {currentLocation && <Marker coordinate={currentLocation} title="Current Location" />}
//         {destination && <Marker coordinate={destination} title="Destination" />}
//         {route.length > 1 && (
//           <Polyline
//             coordinates={route}
//             strokeColor="#000"
//             strokeWidth={3}
//           />
//         )}
//         {currentLocation && destination && (
//           <MapViewDirections
//             origin={currentLocation}
//             destination={destination}
//             apikey={GOOGLE_MAP_KEY}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             onReady={result => {
//               mapRef.current.fitToCoordinates(result.coordinates, {
//                 edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
//                 animated: true,
//               });
//             }}
//             onError={(errorMessage) => {
//               console.error('MapViewDirections error:', errorMessage);
//             }}
//           />
//         )}
//       </MapView>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Destination Name"
//         value={destinationName}
//         onChangeText={setDestinationName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Description"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <Button title="Start Tracking" onPress={startTracking} disabled={isTracking} />
//       <Button title="Stop Tracking and Set Destination" onPress={stopTracking} disabled={!isTracking} />
//       <Button title="Confirm Selection" onPress={handleSubmit} disabled={!destination} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     margin: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default ChooseLocation;



import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { firestore, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GOOGLE_MAP_KEY } from '@env';

const ChooseLocation = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [destinationName, setDestinationName] = useState('');
  const [description, setDescription] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isTracking) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot access location');
        setIsTracking(false);
        return;
      }

      const subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 5,
      }, (location) => {
        const { latitude, longitude, altitude } = location.coords;
        const timestamp = new Date().getTime();
        setCurrentLocation({ latitude, longitude, altitude, timestamp });
        setRoute(prevRoute => [...prevRoute, { latitude, longitude, altitude, timestamp }]);
      });

      return () => subscription.remove();
    })();
  }, [isTracking]);

  const handleMapPress = (e) => {
    if (!isTracking) {
      const coords = e.nativeEvent.coordinate;
      setDestination(coords);
    }
  };

  const startTracking = () => {
    setIsTracking(true);
    setRoute([]);
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (route.length > 0) {
      setDestination(route[route.length - 1]);
    }
  };

  const calculateTotalDistance = (route) => {
    let totalDistance = 0;
    for (let i = 1; i < route.length; i++) {
      const prev = route[i - 1];
      const curr = route[i];
      totalDistance += Math.sqrt(
        Math.pow(curr.latitude - prev.latitude, 2) +
        Math.pow(curr.longitude - prev.longitude, 2)
      );
    }
    return totalDistance * 111; // Convert to kilometers
  };

  const calculateTotalTime = (route) => {
    if (route.length < 2) return '00:00:00';
    const startTime = route[0].timestamp;
    const endTime = route[route.length - 1].timestamp;
    const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);

    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const saveTrack = async (userId, track) => {
    try {
      await addDoc(collection(firestore, 'tracks'), {
        userId,
        ...track,
        createdAt: serverTimestamp(),
      });
      console.log('Track saved successfully');
    } catch (error) {
      console.error('Error saving track:', error);
    }
  };

  const handleSubmit = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please select both your current location and a destination.');
      return;
    }

    const track = {
      trackName: destinationName,
      description, // Add the description here
      coordinates: route,
      distance: calculateTotalDistance(route),
      time: calculateTotalTime(route),
      maxAlt: Math.max(...route.map(p => p.altitude)),
      minAlt: Math.min(...route.map(p => p.altitude)),
      imageUrl: '' // Set imageUrl to an empty string since it's no longer used
    };

    const user = auth.currentUser;
    if (user) {
      await saveTrack(user.uid, track);
    }

    navigation.navigate('NextScreen', { location: currentLocation, destination, route, track });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLocation || {
          latitude: 32.246136,
          longitude: -7.950090,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
        showsUserLocation={true}
      >
        {currentLocation && <Marker coordinate={currentLocation} title="Current Location" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
        {route.length > 1 && (
          <Polyline
            coordinates={route}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
        {currentLocation && destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              });
            }}
            onError={(errorMessage) => {
              console.error('MapViewDirections error:', errorMessage);
            }}
          />
        )}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Enter Destination Name"
        value={destinationName}
        onChangeText={setDestinationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Start Tracking" onPress={startTracking} disabled={isTracking} />
      <Button title="Stop Tracking and Set Destination" onPress={stopTracking} disabled={!isTracking} />
      <Button title="Confirm Selection" onPress={handleSubmit} disabled={!destination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default ChooseLocation;
