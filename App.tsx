// import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

import { playSound, fadeOutSound } from './services/sound';

export default function App() {
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());

  return (
    <GestureDetector gesture={fling}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app or not!</Text>
        <StatusBar style="auto" />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
