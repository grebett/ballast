// TODO: NAVIGATION SHOULD BE TACKLED NEXT
// https://reactnavigation.org/docs/typescript/
// Should we handle the back button of android?
// see https://docs.expo.dev/versions/latest/react-native/backhandler/ and navigation-utilities in oldApp
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeScreen: undefined;
  BookScreen: { some: string };
};

export { NativeStackScreenProps } from '@react-navigation/native-stack';

export const createNavigationStack = () =>
  createNativeStackNavigator<StackParamList>();
