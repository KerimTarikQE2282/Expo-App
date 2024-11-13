import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:"white"}}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Auora Home Screen from kerim</Text>
  </View>
  );
}
