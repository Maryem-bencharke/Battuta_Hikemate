import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NextScreen = ({ route, navigation }) => {
  const { location, destination, route: trackRoute, track } = route.params || {};
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [maxAlt, setMaxAlt] = useState(0);
  const [minAlt, setMinAlt] = useState(0);
  const [currentAlt, setCurrentAlt] = useState(0);
  const [time, setTime] = useState('00:00:00');

  const GOOGLE_MAP_KEY = 'AIzaSyCPqK2X4gXqrqJb_1H3Xg_VB_8gQp2sZoc'; 

  useEffect(() => {
    if (location && destination) {
      const getDirections = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAP_KEY}`
          );
          const data = await response.json();
          if (data.routes.length) {
            const distanceInMeters = data.routes[0].legs[0].distance.value;
            setDistance(distanceInMeters / 1000); // Convert to kilometers

            const durationInSeconds = data.routes[0].legs[0].duration.value;
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const seconds = durationInSeconds % 60;
            setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

            const avgSpeed = (distanceInMeters / durationInSeconds) * 3.6; // Convert to km/h
            setSpeed(avgSpeed.toFixed(1));
          } else {
            console.error('No routes found');
          }
        } catch (error) {
          console.error('Error fetching directions:', error);
        }
      };

      getDirections();
    }
  }, [location, destination]);

  useEffect(() => {
    if (location) {
      setCurrentAlt(location.altitude || 0);
    }
  }, [location]);

  useEffect(() => {
    if (location && destination) {
      const altitudes = [location.altitude || 0, destination.altitude || 0];
      setMaxAlt(Math.max(...altitudes));
      setMinAlt(Math.min(...altitudes));
    }
  }, [location, destination]);

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
          <Text style={styles.statLabel}>Speed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{maxAlt.toFixed(1)}m</Text>
          <Text style={styles.statLabel}>Max. Alt.</Text>
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
  detailsButton: {
    backgroundColor: '#429590',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default NextScreen;
