// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Loginscreen from './screens/Loginscreen';
// import Mapscreen from './screens/Mapscreen';
// import NextScreen from './screens/NextScreen';
// import ChooseLocation from './screens/ChooseLocation';
// import SignUpscreen from './screens/SignUpscreen';
// import UserProfileScreen from './screens/UserProfileScreen';
// import TracksScreen from './screens/TracksScreen';
// import TrackDetails from './screens/TrackDetails';
// import FollowTrack from './screens/FollowTrack';
// import SplashScreen from './screens/SplashScreen';
// import EditProfileScreen from './screens/EditProfileScreen';


// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//       <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={Loginscreen}/>
//         <Stack.Screen name="SignUp" component={SignUpscreen} />
//         <Stack.Screen name="Map" component={Mapscreen} />
//         <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
//         <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
//         <Stack.Screen name="NextScreen" component={NextScreen} />
//         <Stack.Screen name="TracksScreen" component={TracksScreen} />
//         <Stack.Screen name="TrackDetails" component={TrackDetails} />
//         <Stack.Screen name="FollowTrack" component={FollowTrack} />
//         <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/Loginscreen';
import Mapscreen from './screens/Mapscreen';
import NextScreen from './screens/NextScreen';
import ChooseLocation from './screens/ChooseLocation';
import SignUpscreen from './screens/SignUpscreen';
import UserProfileScreen from './screens/UserProfileScreen';
import TracksScreen from './screens/TracksScreen';
import TrackDetails from './screens/TrackDetails';
import FollowTrack from './screens/FollowTrack';
import SplashScreen from './screens/SplashScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import TrackSelectionScreen from './screens/TrackSelectionScreen';
import MyTracksScreen from './screens/MyTracksScreen';
import EditTrackScreen from './screens/EditTrackScreen';
import { TrackProvider } from './screens/TrackContext'; 

const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={Loginscreen} />
//         <Stack.Screen name="SignUp" component={SignUpscreen} />
//         <Stack.Screen name="Map" component={Mapscreen} />
//         <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
//         <Stack.Screen name="MyTracksScreen" component={MyTracksScreen} />
//         <Stack.Screen name="TracksScreen" component={TracksScreen} />
//         <Stack.Screen name="TrackDetails" component={TrackDetails} />
//         <Stack.Screen name="FollowTrack" component={FollowTrack} />
//         <Stack.Screen name="TrackSelectionScreen" component={TrackSelectionScreen} />
//         <Stack.Screen name="NextScreen" component={NextScreen} />
//         <Stack.Screen name="EditProfile" component={EditProfileScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

export default function App() {
  return (
    <TrackProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Loginscreen}/>
        <Stack.Screen name="SignUp" component={SignUpscreen} />
        <Stack.Screen name="Map" component={Mapscreen} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
        <Stack.Screen name="TracksScreen" component={TracksScreen} />
        <Stack.Screen name="TrackDetails" component={TrackDetails} />
        <Stack.Screen name="FollowTrack" component={FollowTrack} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="TrackSelectionScreen" component={TrackSelectionScreen} />
        <Stack.Screen name="MyTracksScreen" component={MyTracksScreen} />
        <Stack.Screen name="EditTrackScreen" component={EditTrackScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
    </TrackProvider>

  );
}