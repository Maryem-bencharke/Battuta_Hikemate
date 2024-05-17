import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

const FollowTrack = ({ route }) => {
  const { track } = route.params;

  const initialRegion = {
    latitude: track.coordinates[0].latitude,
    longitude: track.coordinates[0].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {track.coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            title={`Point ${index + 1}`}
          />
        ))}
        <Polyline
          coordinates={track.coordinates}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
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

export default FollowTrack;
