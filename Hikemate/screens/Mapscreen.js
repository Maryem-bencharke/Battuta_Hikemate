import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const Mapscreen = () => {
  const [state, setState] = useState({
    currentCoordinate: { latitude: 32.246136, longitude: -7.950090 },
    city: '',
    latitude: 32.246136,
    longitude: -7.950090,
    altitude: 0,
  });
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission Denied', 'Cannot access location');
        return;
      }

      const subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 5,
      }, async (location) => {
        const { latitude, longitude, altitude } = location.coords;

        // Reverse geocode to get the city name
        let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        let city = reverseGeocode[0]?.city || '';

        setState({
          currentCoordinate: { latitude, longitude },
          city,
          latitude,
          longitude,
          altitude,
        });
      });

      return () => subscription.remove();
    })();
  }, []);

  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setState((prevState) => ({
      ...prevState,
      currentCoordinate: { latitude, longitude }
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        mapType="standard"
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: state.latitude,
          longitude: state.longitude,
          latitudeDelta: 0.0092,
          longitudeDelta: 0.421,
        }}
        onLongPress={handleLongPress}
        showsUserLocation={true}
      >
        <Marker coordinate={state.currentCoordinate} />
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Current Location: {state.city}</Text>
        <Text style={styles.infoText}>Latitude: {state.latitude.toFixed(6)}</Text>
        <Text style={styles.infoText}>Longitude: {state.longitude.toFixed(6)}</Text>
        <Text style={styles.infoText}>Altitude: {state.altitude.toFixed(1)}m</Text>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('UserProfileScreen')}>
          <Ionicons name="person-circle-outline" size={32} color="#0782F9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ChooseLocation')}>
          <Ionicons name="map-outline" size={32} color="#0782F9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('TracksScreen')}>
          <Ionicons name="calendar-outline" size={32} color="#0782F9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Mapscreen;

