import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const ChooseLocation = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef(null);
  const GOOGLE_MAP_KEY = 'AIzaSyCPqK2X4gXqrqJb_1H3Xg_VB_8gQp2sZoc';

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
        console.log('New location:', location);
        const { latitude, longitude, altitude } = location.coords;
        setCurrentLocation({ latitude, longitude, altitude });
        setRoute(prevRoute => [...prevRoute, { latitude, longitude, altitude }]);
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

  const handleSubmit = () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please select both your current location and a destination.');
      return;
    }
    console.log('Navigating to NextScreen with:', { location: currentLocation, destination, route });
    navigation.navigate('NextScreen', { location: currentLocation, destination, route });
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
          />
        )}
      </MapView>
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
});

export default ChooseLocation;


