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

import { playSound, fadeOutSound } from './services/sound';

const Component = (navigation: any) => {
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

const HomeScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());
  return (
    <GestureDetector gesture={fling}>
      <View>
        <Component />
        <Button title="second" onPress={() => navigation.navigate('Second')} />
      </View>
    </GestureDetector>
  );
};

const SecondScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
