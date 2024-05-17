import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const TrackDetails = ({ route }) => {
  const { track } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: track.coordinates[0].latitude,
          longitude: track.coordinates[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={track.coordinates}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
      <View style={styles.detailsContainer}>
        {track.imageUrl ? (
          <Image source={{ uri: track.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        <Text style={styles.title}>{track.trackName}</Text>
        <Text style={styles.detail}>Distance: {track.distance.toFixed(1)} km</Text>
        <Text style={styles.detail}>Time: {track.time}</Text>
        <Text style={styles.detail}>Max Altitude: {track.maxAlt} m</Text>
        <Text style={styles.detail}>Min Altitude: {track.minAlt} m</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FollowTrack', { track })}
        >
          <Text style={styles.buttonText}>Follow this Track</Text>
        </TouchableOpacity>
      </View>
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
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
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

export default TrackDetails;


