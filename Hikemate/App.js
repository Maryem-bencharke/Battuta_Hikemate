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
        <Stack.Screen name="TracksScreen" component={TracksScreen} />
        <Stack.Screen name="TrackDetails" component={TrackDetails} />
        <Stack.Screen name="FollowTrack" component={FollowTrack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
