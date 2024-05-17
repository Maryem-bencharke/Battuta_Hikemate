// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { auth, db } from '../firebase';
// import { ref, onValue } from 'firebase/database';
// import { Ionicons } from '@expo/vector-icons';

// const UserProfileScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const navigation = useNavigation();

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
//         <ActivityIndicator size="large" color="#429590" />
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
//           <Ionicons name="mail-outline" size={24} color="#429590" />
//           <Text style={styles.detailText}>{userData.email || 'No email available'}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Ionicons name="call-outline" size={24} color="#429590" />
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
//     justifyContent: 'center',
//     flex: 1,
//     backgroundColor: '#f8f8f8',
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
//     marginTop: 10,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   profileName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileDetails: {
//     width: '100%',
//     marginBottom: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
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
//     marginTop: 40,
//     elevation: 2,
//   },
//   backButtonText: {
//     marginLeft: 10,
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default UserProfileScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
        } else {
          console.error('No user data available');
          setUserData({});
        }
      }, (error) => {
        console.error('Error fetching user data:', error);
        setUserData({});
      });

      return () => unsubscribe();
    } else {
      Alert.alert('Error', 'No user is currently logged in');
      navigation.goBack();
    }
  }, [navigation]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out');
      });
  };

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#429590" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{userData.username || 'No username available'}</Text>
      </View>
      <View style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={24} color="#429590" />
          <Text style={styles.detailText}>{userData.email || 'No email available'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={24} color="#429590" />
          <Text style={styles.detailText}>{userData.phoneNumber || 'No phone number available'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.push('Map')}>
        <Ionicons name="arrow-back-outline" size={24} color="white" />
        <Text style={styles.backButtonText}>Back to Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDetails: {
    width: '100%',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#555',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#429590',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#429590',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  backButtonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
