
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';

// // const LocationDetails = ({ route, navigation }) => {
// //   const { location, destination, distance, time, speed, maxAlt, minAlt, currentAlt, imageUrl } = route.params;
// //   const [placeDetails, setPlaceDetails] = useState({});
// //   const GOOGLE_MAP_KEY = 'AIzaSyCPqK2X4gXqrqJb_1H3Xg_VB_8gQp2sZoc';
// //   useEffect(() => {
// //     const fetchPlaceDetails = async () => {
// //       try {
// //         const response = await fetch(
// //           `https://maps.googleapis.com/maps/api/place/details/json?placeid=${destination.placeId}&key=${GOOGLE_MAP_KEY}`
// //         );
// //         const data = await response.json();
// //         console.log('Google Places API response:', data); // Log the full response for debugging
// //         if (data.result) {
// //           setPlaceDetails(data.result);
// //         } else {
// //           console.error('No place details found');
// //           setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
// //         }
// //       } catch (error) {
// //         console.error('Error fetching place details:', error);
// //         setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
// //       }
// //     };

// //     fetchPlaceDetails();
// //   }, [destination.placeId]);

// //   return (
// //     <ScrollView style={styles.container}>
// //       {imageUrl ? (
// //         <Image source={{ uri: imageUrl }} style={styles.image} />
// //       ) : (
// //         <View style={styles.placeholderImage}>
// //           <Text style={styles.placeholderText}>No Image Available</Text>
// //         </View>
// //       )}
// //       <View style={styles.detailsContainer}>
// //         <Text style={styles.title}>{placeDetails.name || 'Unknown Place'}</Text>
// //         <Text style={styles.subtitle}>{placeDetails.formatted_address || 'No address available'}</Text>
// //         <View style={styles.statsContainer}>
// //           <View style={styles.statBox}>
// //             <Text style={styles.statValue}>{distance.toFixed(1)} km</Text>
// //             <Text style={styles.statLabel}>Distance</Text>
// //           </View>
// //           <View style={styles.statBox}>
// //             <Text style={styles.statValue}>{time}</Text>
// //             <Text style={styles.statLabel}>Duration</Text>
// //           </View>
// //           <View style={styles.statBox}>
// //             <Text style={styles.statValue}>{maxAlt.toFixed(1)} m</Text>
// //             <Text style={styles.statLabel}>Max. Alt.</Text>
// //           </View>
// //           <View style={styles.statBox}>
// //             <Text style={styles.statValue}>{minAlt.toFixed(1)} m</Text>
// //             <Text style={styles.statLabel}>Min. Alt.</Text>
// //           </View>
// //           <View style={styles.statBox}>
// //             <Text style={styles.statValue}>{currentAlt.toFixed(1)} m</Text>
// //             <Text style={styles.statLabel}>Altitude</Text>
// //           </View>
// //         </View>
// //         <View style={styles.infoContainer}>
// //           <Text style={styles.infoText}>
// //             {placeDetails.description || 'No description available'}
// //           </Text>
// //         </View>
// //         <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Map')}>
// //           <Text style={styles.startButtonText}>Back to Map</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   image: {
// //     width: '100%',
// //     height: 200,
// //   },
// //   placeholderImage: {
// //     width: '100%',
// //     height: 200,
// //     backgroundColor: '#ccc',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   placeholderText: {
// //     fontSize: 18,
// //     color: '#666',
// //   },
// //   detailsContainer: {
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },
// //   subtitle: {
// //     fontSize: 18,
// //     color: '#888',
// //     marginBottom: 10,
// //   },
// //   statsContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-around',
// //     marginVertical: 20,
// //   },
// //   statBox: {
// //     width: '45%',
// //     marginVertical: 10,
// //     alignItems: 'center',
// //     padding: 10,
// //     backgroundColor: '#f8f8f8',
// //     borderRadius: 10,
// //   },
// //   statValue: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   statLabel: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   infoContainer: {
// //     marginBottom: 20,
// //   },
// //   infoText: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   startButton: {
// //     backgroundColor: '#429590',
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   startButtonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default LocationDetails;



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { GOOGLE_MAP_KEY } from '@env'; // Import your environment variable

// const LocationDetails = ({ route, navigation }) => {
//   const { location, destination, distance, time, speed, maxAlt, minAlt, currentAlt, imageUrl } = route.params;
//   const [placeDetails, setPlaceDetails] = useState({});
//   const GOOGLE_MAP_KEY = 'AIzaSyCPqK2X4gXqrqJb_1H3Xg_VB_8gQp2sZoc';

//   useEffect(() => {
//     const fetchPlaceDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?placeid=${destination.placeId}&key=${GOOGLE_MAP_KEY}`
//         );
//         const data = await response.json();
//         console.log('Google Places API response:', data); // Log the full response for debugging
//         if (data.result) {
//           setPlaceDetails(data.result);
//         } else {
//           console.error('No place details found');
//           setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
//         }
//       } catch (error) {
//         console.error('Error fetching place details:', error);
//         setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
//       }
//     };

//     if (destination.placeId) {
//       fetchPlaceDetails();
//     } else {
//       setPlaceDetails({ name: 'Unknown Place', formatted_address: 'No address available' });
//     }
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
//         <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Map')}>
//           <Text style={styles.startButtonText}>Back to Map</Text>
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
