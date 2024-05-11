import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Text, TouchableOpacity, Image } from 'react-native';


const Mapscreen = () => {
  const [state, setState] = useState({
    coordinates: [
      {
        latitude: 32.246136, // UM6P Benguerir latitude
        longitude: -7.950090, // UM6P Benguerir longitude
      }
    ],
  });
  const mapRef = useRef(null);

  // Function to handle long press and add markers
  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setState({
      ...state,
      coordinates: [...state.coordinates, { latitude, longitude }]
    });
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        mapType="standard"
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 32.246136,
          longitude: -7.950090,
          latitudeDelta: 0.0092,  // Smaller value for closer zoom
          longitudeDelta: 0.421, // Smaller value for closer zoom
        }}
        
        onLongPress={handleLongPress} // Add marker on long press
      >
        {state.coordinates.map((coord, index) => (
          <Marker key={index} coordinate={coord} />
        ))}
      </MapView>
      <Button
        title="Fit Markers"
        onPress={() => {
          mapRef.current.fitToCoordinates(state.coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ChooseLocation')}>
     <Text style={styles.buttonText}>Choose Location</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Mapscreen;
