import { useEffect, FC } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { playSound } from '../services/sound';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'gold',
  },
  text: {
    backgroundColor: 'red',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
});

export const BookScreen: FC<
  NativeStackScreenProps<StackParamList, 'BookScreen'>
> = observer(({ navigation, route }) => {
  // TEMP: Fling gesture
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());

  return (
    <GestureDetector gesture={fling}>
      <View style={styles.view}>
        <Text style={styles.text}>{route.params.some} Hello</Text>
        <Button title="back" onPress={() => navigation.goBack()} />
      </View>
    </GestureDetector>
  );
});
