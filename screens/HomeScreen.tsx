import { StyleSheet, Text, Button, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { playSound } from '../services/sound';
import { Component } from '../components/Component';
import { AnotherComponent } from '../components/AnotherComponent';
import { useStores } from '../models/rootStore';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
});

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'HomeScreen'>) => {
  // TEMP: Fling gesture
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());

  const { bookStore } = useStores();
  const [books, setBooks] = useState<typeof bookStore.books>();

  useEffect(() => {
    const getBooks = async () => {
      await bookStore.getBooks();
      setBooks(bookStore.books);
    };
    getBooks();
  }, []);

  return (
    <GestureDetector gesture={fling}>
      <View style={styles.view}>
        <Text>Choisissez un livre</Text>
        {books?.map((book) => (
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
};
