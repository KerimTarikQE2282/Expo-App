import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';

const RoolLayout = () => {
  return (
    <>
      <Text>Header</Text>
      <Slot />
      <Text>footer</Text>
    </>
  );
};

export default RoolLayout;
