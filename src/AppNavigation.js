import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Style from './styles/Style';
import {AppContext} from './AppProvider';
import VideoDemo from './screens/VideoDemo';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [appContext, setAppContext] = useContext(AppContext);

  return (
    // <View
    //   style={[
    //     styles.navigator,
    //     !appContext.menuVisible && styles.navigatorFullscreen,
    //   ]}>
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
    // </View>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  app: {
    width: Style.px(1920),
    height: Style.px(1080),
    flex: 1,
    flexDirection: 'row',
  },
  navigator: {
    width: Style.px(1520),
    height: Style.px(1080),
  },
  navigatorFullscreen: {
    width: Style.px(1920),
  },
});
