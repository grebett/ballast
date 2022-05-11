import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import {
  NavigationContainer,
  DarkTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { playSound } from './services/sound';
import { AnotherComponent } from './AnotherComponent'; // TEMP OTHER_COMPONENT

import {
  RootStore,
  RootStoreProvider,
  setupRootStore,
} from './models/rootStore';

// TEMP COMPONENT 1
const Component = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faf',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app or not!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

// TODO: NAVIGATION SHOULD BE TACKLED NEXT
// https://reactnavigation.org/docs/typescript/
// Should we handle the back button of android?
// see https://docs.expo.dev/versions/latest/react-native/backhandler/ and navigation-utilities in oldApp
type StackParamList = {
  HomeScreen: undefined;
  SecondScreen: { some: string };
};

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'HomeScreen'>) => {
  // TEMP: Fling gesture
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());

  return (
    <GestureDetector gesture={fling}>
      <View>
        <Component />
        <AnotherComponent />
        <Button
          title="second"
          onPress={() => navigation.navigate('SecondScreen', { some: 'param' })}
        />
      </View>
    </GestureDetector>
  );
};

const SecondScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<StackParamList, 'SecondScreen'>) => {
  return (
    <View>
      <Text>{route.params.some} Hello</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Main App & Navigation
const Stack = createNativeStackNavigator<StackParamList>();
export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        setupRootStore().then(setRootStore);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !rootStore) {
    return null;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <NavigationContainer
        onReady={onLayoutRootView}
        theme={DarkTheme}
        ref={createNavigationContainerRef()}
      >
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootStoreProvider>
  );
}
