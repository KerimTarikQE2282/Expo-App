import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../Components/SearchInputs'
const Home = () => {
  return (
    <SafeAreaView className='bg-primary'>
      <FlatList
      data=
      {[{id:1},{id:2},{id:3}]}
      
      keyExtractor={(item:any)=>item.$id}
      renderItem={({item})=>(
        <Text className='text-3xl'>{item.id}</Text>
      )}
      ListHeaderComponent={()=>(
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between item-start flex-col mb-6'>
          <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
          <Text className='text-2xl font-psemibold text-white '>JSMAstery</Text>
          </View>
          <View className='mt-1.5'>
            <Image
            source={images.logoSmall}
            className='"w-9 h-10'
            resizeMode='contain'
            />

          </View>
          <SearchInput />
        </View>
      )}
      />
    </SafeAreaView>
  )
}

export default Home