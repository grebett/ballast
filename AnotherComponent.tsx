import { useState, useEffect, PropsWithChildren } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useStores } from './models/rootStore';

export const AnotherComponent = () => {
  const { bookStore } = useStores();
  bookStore.getBooks().then(console.log);

  return <Text>Hello</Text>;
};
