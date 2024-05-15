// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Loginscreen from './screens/Loginscreen';
// import Mapscreen from './screens/Mapscreen';
// import NextScreen from './screens/NextScreen'; 
// import ChooseLocation from './screens/ChooseLocation';
// import SignUpscreen from './screens/SignUpscreen';
// import UserProfileScreen from './screens/UserProfileScreen';


// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
//         <Stack.Screen name="SignUp" component={SignUpscreen} />
//         <Stack.Screen name="Map" component={Mapscreen} />
//         <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
//         <Stack.Screen name="UserProfileScreen" component={UserProfileScreen}/>
//         <Stack.Screen name="NextScreen" component={NextScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/Loginscreen';
import Mapscreen from './screens/Mapscreen';
import NextScreen from './screens/NextScreen'; 
import ChooseLocation from './screens/ChooseLocation';
import SignUpscreen from './screens/SignUpscreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpscreen} />
        <Stack.Screen name="Map" component={Mapscreen} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
