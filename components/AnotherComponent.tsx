import { Text } from 'react-native';
import { useStores } from '../models/rootStore';

export const AnotherComponent = () => {
  const { bookStore } = useStores();
  bookStore.getBooks().then(console.log);

  return <Text>Hello</Text>;
};
