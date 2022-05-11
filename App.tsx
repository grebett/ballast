import { useState, useEffect, useCallback } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import {
  RootStore,
  RootStoreProvider,
  setupRootStore,
} from './models/rootStore';

import { createNavigationStack } from './navigation';
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';

// Main App & Navigation
const Stack = createNavigationStack();
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
