import { Button, Text, View } from 'react-native';

import { StackParamList, NativeStackScreenProps } from '../navigation';

export const SecondScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<StackParamList, 'SecondScreen'>) => {
  return (
    <View>
      <Text>{route.params.some} Hello</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};
