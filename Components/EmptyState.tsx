import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title,subtitle}:any) => {
  return (
    <View className='justify-center items-center px-4 ml-[10vw]' >
      <Image 
      source={images.empty}
      className='w-[270px] h-[215px]'
      resizeMode='contain'/>
            <Text className='text-2xl font-psemibold  text-white'>{title}</Text>

      <Text className='font-pmedium text-gray-100 text-sm'>{subtitle}</Text>
        <CustomButton
        title="Create Video"
        handlepress={()=>router.push('./create')}
        containedStyles="w-[50vw] "
        
        />
        
    </View>
  )
}

export default EmptyState