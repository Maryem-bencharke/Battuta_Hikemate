// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { GOOGLE_MAP_KEY, UNSPLASH_ACCESS_KEY } from '@env';

// const LocationDetails = ({ route, navigation }) => {
//   const { location, destination, distance, time, speed, maxAlt, minAlt, currentAlt } = route.params;
//   const [placeDetails, setPlaceDetails] = useState({});
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     const fetchPlaceDetails = async () => {
//       const examplePlaceId = 'ChIJLU7jZClu5kcR4PcOOO6p3I0'; // Place ID for the Eiffel Tower (for testing)
//       try {
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?placeid=${examplePlaceId}&key=${GOOGLE_MAP_KEY}`
//         );
//         const data = await response.json();
//         console.log('Google Places API response:', data); // Log the full response for debugging
//         if (data.result) {
//           setPlaceDetails(data.result);
//           fetchImage(data.result.name);
//         } else {
//           console.error('No place details found');
//           setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
//         }
//       } catch (error) {
//         console.error('Error fetching place details:', error);
//         setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
//       }
//     };

//     const fetchImage = async (placeName) => {
//       try {
//         const response = await fetch(
//           `https://api.unsplash.com/search/photos?query=${placeName}&client_id=${UNSPLASH_ACCESS_KEY}`
//         );
//         const data = await response.json();
//         if (data.results.length > 0) {
//           setImageUrl(data.results[0].urls.regular);
//         } else {
//           console.error('No images found');
//         }
//       } catch (error) {
//         console.error('Error fetching image:', error);
//       }
//     };

//     fetchPlaceDetails();
//   }, [destination.placeId]);

//   return (
//     <ScrollView style={styles.container}>
//       {imageUrl ? (
//         <Image source={{ uri: imageUrl }} style={styles.image} />
//       ) : (
//         <View style={styles.placeholderImage}>
//           <Text style={styles.placeholderText}>No Image Available</Text>
//         </View>
//       )}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{placeDetails.name || 'Unknown Place'}</Text>
//         <Text style={styles.subtitle}>{placeDetails.formatted_address || 'No address available'}</Text>
//         <View style={styles.statsContainer}>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{distance.toFixed(1)} km</Text>
//             <Text style={styles.statLabel}>Distance</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{time}</Text>
//             <Text style={styles.statLabel}>Duration</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{maxAlt.toFixed(1)} m</Text>
//             <Text style={styles.statLabel}>Max. Alt.</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{minAlt.toFixed(1)} m</Text>
//             <Text style={styles.statLabel}>Min. Alt.</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{currentAlt.toFixed(1)} m</Text>
//             <Text style={styles.statLabel}>Altitude</Text>
//           </View>
//         </View>
//         <View style={styles.infoContainer}>
//           <Text style={styles.infoText}>
//             {placeDetails.description || 'No description available'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('ChooseLocation')}>
//           <Text style={styles.startButtonText}>Start the Track</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   placeholderImage: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#888',
//     marginBottom: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//   },
//   statBox: {
//     width: '45%',
//     marginVertical: 10,
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   infoContainer: {
//     marginBottom: 20,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   startButton: {
//     backgroundColor: '#429590',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default LocationDetails;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_MAP_KEY, UNSPLASH_ACCESS_KEY } from '@env';

const LocationDetails = ({ route, navigation }) => {
  const { location, destination, distance, time, speed, maxAlt, minAlt, currentAlt } = route.params;
  const [placeDetails, setPlaceDetails] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${destination.placeId}&key=${GOOGLE_MAP_KEY}`
        );
        const data = await response.json();
        console.log('Google Places API response:', data); // Log the full response for debugging
        if (data.result) {
          setPlaceDetails(data.result);
          fetchImage(data.result.name);
        } else {
          console.error('No place details found');
          setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
        setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
      }
    };

    const fetchImage = async (placeName) => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${placeName}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        console.log('Unsplash API response:', data); // Log the full response for debugging
        if (data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular);
        } else {
          console.error('No images found');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchPlaceDetails();
  }, [destination.placeId]);

  return (
    <ScrollView style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{placeDetails.name || 'Unknown Place'}</Text>
        <Text style={styles.subtitle}>{placeDetails.formatted_address || 'No address available'}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{distance.toFixed(1)} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{time}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{maxAlt.toFixed(1)} m</Text>
            <Text style={styles.statLabel}>Max. Alt.</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{minAlt.toFixed(1)} m</Text>
            <Text style={styles.statLabel}>Min. Alt.</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{currentAlt.toFixed(1)} m</Text>
            <Text style={styles.statLabel}>Altitude</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {placeDetails.description || 'No description available'}
          </Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('ChooseLocation')}>
          <Text style={styles.startButtonText}>Start the Track</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
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
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#429590',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationDetails;
