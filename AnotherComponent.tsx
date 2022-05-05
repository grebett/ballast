import { useState, useEffect, PropsWithChildren } from 'react';
import { apiSauce } from './services/api/api';
import { Button, StyleSheet, Text, View } from 'react-native';

export const AnotherComponent = () => {
  useEffect(() => {
    // API SAUCE
    (async () => {
      // apiSauce.setup();
      console.log(await (await apiSauce.api?.get('/book'))?.data);
    })();
  });

  return (
    <Text>Hello</Text>
  );
}
