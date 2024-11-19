import { Image, SafeAreaView, StyleSheet, ScrollView, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Redirect,router } from 'expo-router'
import images from '../constants/images'
import CustomButton from '../Components/CustomButton'
import { useGlobalContext } from '@/context/globalprovider'
const Index = () => {
  const {isLoading,isLoggedIn} =useGlobalContext()
  console.log("🚀 ==> file: index.tsx:9 ==> Index ==> isLoading,isLoggedin:", isLoading,isLoggedIn);
  
    if(!isLoading && isLoggedIn){
      router.replace('/(tabs)/Home')
      return null
    }
  
 
  return (
    <SafeAreaView className='bg-primary h-full' >
     <ScrollView contentContainerStyle={{height:'100%'}}>

        <View className='  w-full mt-[10vh] item-center h-full px-4'>
          <Image
          source={images.logo}
          className='w-[130px] h-[84px] relative left-[30vw]  bottom-[10vh]'
          resizeMode='contain'
          />
          <Image 
          source={images.cards}
          className='w-[90vw] h-[60vh] relative bottom-[15vh]'
          resizeMode="contain"/>
          <View className='relative'>
            <Text className='text-4xl text-white font-bold text-center relative bottom-[25vh]'>
              Discover Endless Possibilities with {' '}
              <Text className='text-secondary-200'>Auora</Text>
            </Text>
         <Image 
         source={images.path}
         className='w-[136px] h-[15px] relative bottom-[25vh] left-[38vw]'
         resizeMode='contain'
         />
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center bottom-[25vh]'>Where Creativity meets innovation: embark on a journey of limitless explorations with Auora</Text>
          <CustomButton 
          title="Get Started with email"
          handlepress={() => router.push('/(auth)/SignIn')}
          color='secondary-200 '
          containedStyles='w-[80vw]'
         
          
          
          />
          </View>
         
        </View>
      
     </ScrollView>
     <StatusBar  />
   </SafeAreaView>
  )
}



export default Index
