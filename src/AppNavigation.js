import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VideoDemo from './screens/VideoDemo';

const Stack = createStackNavigator();

const AppNavigation = () => {

  return (
      <Stack.Navigator
        initialRouteName="video"
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
          unmountInactiveScreen: true,
          detachPreviousScreen: true,
        }}>
        <Stack.Screen name="video" component={VideoDemo} />
      </Stack.Navigator>
  );
};

export default AppNavigation;
