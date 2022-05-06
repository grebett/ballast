import { useState, useEffect, PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

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

  useEffect(() => {
    setupRootStore().then(setRootStore);
  }, []);

  if (!rootStore) return null;
  return (
    <RootStoreProvider value={rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootStoreProvider>
  );
}
