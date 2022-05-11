import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const Component = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'steelblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>The text is immediately rendered!</Text>
      <StatusBar style="auto" />
    </View>
  );
};
