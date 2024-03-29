import { useEffect, useState, FC } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { useStores } from '../models/rootStore';
import { SoundService, READING_DIRECTIONS } from '../components/SoundService';
import { load, save } from '../services/storage';

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
  const [readingDirection, setReadingDirection] = useState<READING_DIRECTIONS>(
    READING_DIRECTIONS.INITIAL
  );

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      setReadingDirection(READING_DIRECTIONS.FORWARD);
      pageStore.increaseIndex();
      save('pageIndex', pageStore.index);
    });
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      setReadingDirection(READING_DIRECTIONS.BACKWARD);
      pageStore.decreaseIndex();
      save('pageIndex', pageStore.index);
    });

  useEffect(() => {
    const getPages = async () => {
      const storedPageIndex = await load('pageIndex');
      if (!isNaN(storedPageIndex)) {
        pageStore.setIndex(0);
      } 
      await pageStore.getPages();
    };
    getPages();
  }, []);

  return pageStore.pages.length > 0 ? (
    <GestureDetector gesture={Gesture.Race(flingLeft, flingRight)}>
      <View style={styles.view}>
        <Text style={styles.text}>
          {pageStore.pages[pageStore.index]?.text || ''}
        </Text>
        <Button title="back" onPress={() => navigation.goBack()} />
        <SoundService
          sounds={pageStore.pages[pageStore.index].sounds}
          ends={pageStore.pages[pageStore.index].ends}
          readingDirection={readingDirection}
        />
      </View>
    </GestureDetector>
  ) : (
    <></>
  );
});
