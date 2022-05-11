import { Button, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';


import { StackParamList, NativeStackScreenProps } from '../navigation';
import { playSound } from '../services/sound';
import { Component } from '../components/Component';
import { AnotherComponent } from '../components/AnotherComponent';


export const HomeScreen = ({
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
