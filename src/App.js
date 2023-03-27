import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Navigation';
import AppProvider from './AppProvider';

// Enable screens
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer ref={navigationRef}>
          <AppNavigation />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
