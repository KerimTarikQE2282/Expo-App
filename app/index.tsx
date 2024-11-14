import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
  return (
    <View style={styles.container}>
      <Text className=' font-pblack text-3xl'  >Auora </Text>
      <Link href="/Home" style={styles.profile}> Home page</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:"bold"
  },
  text: {
    fontSize: 24,
  },
  profile:{
    color:"blue"
  }
})

export default Index
