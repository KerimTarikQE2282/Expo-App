import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useAppWrite from '@/lib/useAppWrite'
import GlobalProvider, { useGlobalContext } from '@/context/globalprovider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchVideoCard from '@/Components/SearchVideoCard'
import EmptyState from '@/Components/EmptyState'
import { icons } from '@/constants'
import InfoBox from '@/Components/InfoBox'
import { router } from 'expo-router'

const profile = () => {
  const {user,setUser,setIsLoggedIn}=useGlobalContext()
  console.log("🚀 ==> file: profile.tsx:8 ==> profile ==> user:", user);
  const {data:posts}=useAppWrite(getUserPosts(user?.$id))
  console.log("🚀 ==> file: profile.tsx:11 ==> profile ==> data:", posts);
  const logOut=async ()=>{
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/')
  }
  
  return (
   <SafeAreaView className='bg-primary h-full w-full'>
    

    <FlatList
    data={posts}
    keyExtractor={(item:any)=>(item?.$id)}
    renderItem={
      ({item})=>(<SearchVideoCard video={item}/>)
    }
    ListHeaderComponent={()=>(
      <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
        <TouchableOpacity className='items-end w-full mb-10'
        onPress={logOut}
        >
          <Image
           source={icons.logout}
           resizeMode="contain"
           className='w-6 h-6'
          />
        </TouchableOpacity>
        <View className='  w-16 h-16 rounded-lg justify-center items-center'>
          <Image
            source={{uri:user?.avatar}}
            className='w-[90%] h-[90%] rouded-lg relative top-14 rounded-lg'
            resizeMode='cover'
            />
            <View className='relative top-10'>
            <InfoBox title={user?.UserName} containerStyles='mt-5' titleStyle='text-lg' />
            <View className='flex flex-row'>
            <InfoBox title={(posts?.length).toString() || '0'} subtitile='posts' containerStyles='mr-10' titleStyle='text-xl' />
            <InfoBox title='1.2k' subtitile='Followers'  titleStyle='text-xl' />

            </View>
            </View>
        </View>

      </View>
  )}
    ListEmptyComponent={()=>(
      <EmptyState
            title="No Videos found"
            subtitle="Be the first one to create"
          />
    )}
    />

   </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})