import { useEffect, FC } from 'react';
import { StyleSheet, Text, Button, Image, View } from 'react-native';

import { observer } from 'mobx-react-lite';
import { Dimensions } from 'react-native';

import { StackParamList, NativeStackScreenProps } from '../navigation';
import { useStores } from '../models/rootStore';

import DefaultImage from '../assets/test.png';
import DefaultVideo from '../assets/test.mp4';

import { Video, AVPlaybackStatus } from 'expo-av';

// temp text
const text = `L’année 1866 fut marquée par un événement bizarre, un phénomène inexpliqué et inexplicable que personne n’a sans doute oublié. Sans parler des rumeurs qui agitaient les populations des ports et surexcitaient l’esprit public à l’intérieur des continents, les gens de mer furent particulièrement émus. Les négociants, armateurs, capitaines de navires, skippers et masters de l’Europe et de l’Amérique, officiers des marines militaires de tous pays, et, après eux, les gouvernements des divers États des deux continents, se préoccupèrent de ce fait au plus haut point.`;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  text: {
    // display: 'none',
    position: 'absolute',
    zIndex: 2,
    color: 'white',
    width: '100%',
    textAlign: 'left',
    top: 150,
    paddingTop: 50,
    paddingRight: 60,
    paddingLeft: 60,
    paddingBottom: 50,
    fontFamily: 'Futura',
    fontSize: 17,
    fontWeight: '100',
  },
  image: {
    display: 'flex',
    position: 'absolute',
    top: 300,
    left: 72,
    zIndex: 2,
    width: 500 / 2,
    height: 400 / 2,
    borderColor: 'white',
    borderWidth: 1,
  },
  video: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
});

export const HomeScreen: FC<
  NativeStackScreenProps<StackParamList, 'HomeScreen'>
> = observer(({ navigation }) => {
  const { bookStore } = useStores();

  useEffect(() => {
    // const getBooks = async () => {
    //   await bookStore.getBooks();
    // };
    // getBooks();
  }, []);

  return (
    <View style={styles.view}>
      {/* <Text style={styles.text}>{text}</Text> */}
      <Image style={styles.image} source={{uri: Image.resolveAssetSource(DefaultImage).uri}} />
      {/* <Video
        style={styles.video}
        source={{uri: Image.resolveAssetSource(DefaultVideo).uri}}
        resizeMode="contain"
        isLooping={false}
        isMuted
        shouldPlay
      /> */}
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
