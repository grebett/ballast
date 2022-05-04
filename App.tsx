import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

export default function App() {
  const flingLeft = Gesture.Fling();
  flingLeft.direction(Directions.LEFT).onEnd(console.log);

  const flingRight = Gesture.Fling();
  flingRight.direction(Directions.RIGHT).onEnd(console.log);

  const flings = Gesture.Simultaneous(flingLeft, flingRight)


  return (
    <GestureDetector gesture={flings}>
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
