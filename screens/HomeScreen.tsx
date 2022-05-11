import { useEffect, FC } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { playSound } from '../services/sound';
import { Component } from '../components/Component';
import { AnotherComponent } from '../components/AnotherComponent';
import { useStores } from '../models/rootStore';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
});

export const HomeScreen: FC<
  NativeStackScreenProps<StackParamList, 'HomeScreen'>
> = observer(({ navigation }) => {
  // TEMP: Fling gesture
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());

  const { bookStore } = useStores();

  useEffect(() => {
    const getBooks = async () => {
      await bookStore.getBooks();
    };
    getBooks();
  }, []);

  return (
    <GestureDetector gesture={fling}>
      <View style={styles.view}>
        <Text>Choisissez un livre</Text>
        {bookStore.books.map((book) => (
          <Button
            key={book.id}
            color="white"
            title={book.title}
            onPress={() =>
              navigation.navigate('SecondScreen', { some: 'param' })
            }
          />
        ))}
      </View>
    </GestureDetector>
  );
});
