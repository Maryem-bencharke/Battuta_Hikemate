// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
// import { auth, db } from '../firebase';
// import { ref, onValue } from 'firebase/database';
// import { Ionicons } from '@expo/vector-icons';

// const UserProfileScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       const userRef = ref(db, 'users/' + user.uid);
//       const unsubscribe = onValue(userRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           setUserData(data);
//         } else {
//           console.error('No user data available');
//           setUserData({});
//         }
//       }, (error) => {
//         console.error('Error fetching user data:', error);
//         setUserData({});
//       });

//       return () => unsubscribe();
//     } else {
//       Alert.alert('Error', 'No user is currently logged in');
//       navigation.goBack();
//     }
//   }, [navigation]);

//   if (!userData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileHeader}>
    
//         <Text style={styles.profileName}>{userData.username || 'No username available'}</Text>
//       </View>
//       <View style={styles.profileDetails}>
//         <View style={styles.detailRow}>
//           <Ionicons name="mail-outline" size={24} color="black" />
//           <Text style={styles.detailText}>{userData.email || 'No email available'}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Ionicons name="call-outline" size={24} color="black" />
//           <Text style={styles.detailText}>{userData.phoneNumber || 'No phone number available'}</Text>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.push('Map')}>
//         <Ionicons name="arrow-back-outline" size={24} color="white" />
//         <Text style={styles.backButtonText}>Back to Map</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileDetails: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   detailText: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#555',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#429590',
//     padding: 15,
//     borderRadius: 10,
//   },
//   backButtonText: {
//     marginLeft: 10,
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default UserProfileScreen;


// UserProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      {/* Other profile details */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TracksScreen')}
      >
        <Text style={styles.buttonText}>View Saved Tracks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default UserProfileScreen;
