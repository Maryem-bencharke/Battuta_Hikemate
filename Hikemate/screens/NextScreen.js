import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as geolib from 'geolib';

const NextScreen = ({ route, navigation }) => {
  const { location = {}, destination = {}, route: routeCoords = [] } = route.params || {};
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState('');
  const [maxAlt, setMaxAlt] = useState(0);
  const [minAlt, setMinAlt] = useState(0);
  const [currentAlt, setCurrentAlt] = useState(0);
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    console.log('Received routeCoords:', routeCoords);

    if (routeCoords.length > 1) {
      // Calculate total distance of the route
      const totalDistance = geolib.getPathLength(routeCoords);
      setDistance(totalDistance / 1000); // Convert to kilometers

      // Calculate altitudes
      const altitudes = routeCoords.map(coord => coord.altitude);
      setMaxAlt(Math.max(...altitudes));
      setMinAlt(Math.min(...altitudes));
      setCurrentAlt(location.altitude || 0);

      // Assuming average speed in m/s (example calculation)
      const timeInSeconds = (routeCoords.length * 2); // Example calculation
      const avgSpeed = totalDistance / timeInSeconds;
      setSpeed((avgSpeed * 3.6).toFixed(1)); // Convert to km/h

      // Calculate ETA (assuming constant speed)
      const estimatedTime = (totalDistance / avgSpeed) / 60; // in minutes
      const etaHours = Math.floor(estimatedTime / 60);
      const etaMinutes = Math.floor(estimatedTime % 60);
      setEta(`${etaHours}h${etaMinutes.toString().padStart(2, '0')}`);

      // Calculate the total time taken for the route
      const totalTimeInSeconds = timeInSeconds; // Example calculation
      const hours = Math.floor(totalTimeInSeconds / 3600);
      const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
      const seconds = totalTimeInSeconds % 60;
      setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else if (location.latitude && destination.latitude) {
      // Calculate direct distance between current location and destination
      const directDistance = geolib.getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: destination.latitude, longitude: destination.longitude }
      );
      setDistance(directDistance / 1000); // Convert to kilometers

      // For simplicity, assume a constant speed of 5 km/h (example)
      const avgSpeed = 5;
      setSpeed(avgSpeed.toFixed(1)); // in km/h

      // Calculate ETA based on direct distance
      const estimatedTime = (directDistance / 1000) / avgSpeed * 60; // in minutes
      const etaHours = Math.floor(estimatedTime / 60);
      const etaMinutes = Math.floor(estimatedTime % 60);
      setEta(`${etaHours}h${etaMinutes.toString().padStart(2, '0')}`);

      // For the total time, assume the user has just started (time is 0)
      setTime('00:00:00');

      // Altitude data might not be available, set to default or average
      setMaxAlt(location.altitude || 0);
      setMinAlt(location.altitude || 0);
      setCurrentAlt(location.altitude || 0);
    }
  }, [routeCoords, location, destination]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Duration</Text>
        <Text style={styles.headerTime}>{time}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{distance.toFixed(1)}km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{speed}km/h</Text>
          <Text style={styles.statLabel}>Vitesse</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{eta}</Text>
          <Text style={styles.statLabel}>ETA</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{maxAlt.toFixed(1)}m</Text>
          <Text style={styles.statLabel}>Max. Alt.</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{minAlt.toFixed(1)}m</Text>
          <Text style={styles.statLabel}>Min. Alt.</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{currentAlt.toFixed(1)}m</Text>
          <Text style={styles.statLabel}>Altitude</Text>
        </View>
      </View>
      <View style={styles.mapIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map-outline" size={32} color="#0782F9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTime: {
    fontSize: 20,
    color: '#0782F9',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBox: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  mapIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default NextScreen;
