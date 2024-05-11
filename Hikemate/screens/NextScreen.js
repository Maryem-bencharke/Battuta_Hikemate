import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NextScreen = ({ route, navigation }) => {
  const { location, destination } = route.params;

  console.log("Received in NextScreen - Location:", location, "Destination:", destination); // Log received parameters

  return (
    <View style={styles.container}>
      <Text>Current Location: {location.latitude}, {location.longitude}</Text>
      <Text>Destination: {destination.latitude}, {destination.longitude}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default NextScreen;


