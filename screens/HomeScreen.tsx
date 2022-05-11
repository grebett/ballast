import { useEffect, FC } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { useStores } from '../models/rootStore';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
  text: {
    backgroundColor: 'red',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
});

export const HomeScreen: FC<
  NativeStackScreenProps<StackParamList, 'HomeScreen'>
> = observer(({ navigation }) => {
  const { bookStore } = useStores();

  useEffect(() => {
    const getBooks = async () => {
      await bookStore.getBooks();
    };
    getBooks();
  }, []);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>LISTE DE LIVRES</Text>
      {bookStore.books.map((book) => (
        <Button
          key={book.id}
          color="white"
          title={`+ ${book.title}`}
          onPress={() => navigation.navigate('BookScreen', { some: 'param' })}
        />
      ))}
    </View>
  );
});
