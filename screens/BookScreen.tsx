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
import { useStores } from '../models/rootStore';

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
  const { pageStore } = useStores();
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => pageStore.increaseIndex());
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => pageStore.decreaseIndex());

  useEffect(() => {
    const getPages = async () => {
      await pageStore.getPages();
    };
    getPages();
  }, []);

  return (
    <GestureDetector gesture={Gesture.Race(flingLeft, flingRight)}>
      <View style={styles.view}>
        {pageStore.pages.length > 0 && (
          <Text style={styles.text}>
            {pageStore.pages[pageStore.index]?.text || ''}
          </Text>
        )}
        <Button title="back" onPress={() => navigation.goBack()} />
      </View>
    </GestureDetector>
  );
});
