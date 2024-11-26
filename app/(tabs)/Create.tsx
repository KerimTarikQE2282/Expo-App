import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/Components/FormField'
import { Video,ResizeMode } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/Components/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/globalprovider'
const Create = () => {
  const {user}=useGlobalContext()
  const [isUploading,setIsUploading]=React.useState(false);
  const [form,setForm]=React.useState(
    {
      title:'',
      video:null,
      thumbnail:null,
      prompt:''
    }
  )

  const openPicker=async (selectType:any)=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:selectType ==='image'? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("🚀 ==> file: Create.tsx:25 ==> openPicker ==> result:", result);
    //TODO check the video comming when i get home 
    if(!result.canceled){
      console.log("🚀 ==> file: Create.tsx:23 ==> Create ==> form:", form);

      if(selectType==='image'){
        setForm({...form,thumbnail:result.assets[0]})
      }
      else if(selectType==='video'){
        setForm({...form,video:result.assets[0]})
        
      }
      
    }


  }
  const submit=async ()=>{
    
    if(!form.prompt || !form.thumbnail || !form.title || !form.video ){
     return Alert.alert('incomplete data','please provide all data ')
    }
    else{
      setIsUploading(true)
      try {
        await createVideo({
          ...form,
           userId:user.$id
        })
        Alert.alert('Success','post Uploaded Succesfully')

        router.push('/(tabs)/Home')
      } catch (error:any) {
        Alert.alert( 'Error',error.message)

      }
      finally{
        setForm(
          {
            title:'',
            video:null,
            thumbnail:null,
            prompt:''
          }
        )
        setIsUploading(false)
      }
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full w-full'>
    <ScrollView className='px-6 my-6'>
      <Text className='text-2xl text-white font-psemibold'>

        Upload Video
      </Text>
      <FormField
      title='Video Title'
      value={form.title}
      placeholder='give your video a catchy title ......'
      onChange={(e:any)=>{setForm({...form,title:e})}}
      otherStyles='mt-10'
      />
      <View className='mt-7 space-7-2'>
        <Text className='text-base text-gray-100 font-pmedium mb-3'>Upload video</Text>
        <TouchableOpacity
        onPress={()=>openPicker('video')}
        >
          {
            form.video
            ?
            (<Video
            source={{uri:form.video?.uri}}
            style={{ width: '100%', height: 200, backgroundColor: 'black', borderRadius: 20 }}
            resizeMode={ResizeMode.COVER}
            />) 
            :
            (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                  resizeMode='contain' 
                  source={icons.upload}
                  className='w-10 h-10'
                  />
                </View>

              </View>
            )
          }
        </TouchableOpacity>
      </View>
      <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium mb-3'>Thumbnail Image</Text>
      <TouchableOpacity
      onPress={()=>openPicker('image')}
      >
          {
            form.thumbnail
            ?
            (<Image
            source={{uri:form.thumbnail?.uri}}
            className='w-full h-64 rounded-2xl'
            
            resizeMode='cover'
            
            />) 
            :
            (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border border-2 border-black-200 flex-2 space-x-2'>
                  <Image
                  resizeMode='contain' 
                  source={icons.upload}
                  className='w-5 h-5'
                  />
                  <Text className='text-sm text-gray-100 front-pmedium'>Choose a file </Text>
 
              </View>
            )
          }
        </TouchableOpacity>

      </View>
      <FormField
      title='Video Prompt'
      value={form.prompt}
      placeholder=' prompt you used to create this video......'
      onChange={(e:any)=>{setForm({...form,prompt:e})}}
      otherStyles='mt-10'
      />
      <CustomButton
      title='Publish'
      handlepress={submit}
      containedStyles='mt-7'
      isLoading={isUploading}
      />
    </ScrollView>
    </SafeAreaView>
  )
}

export default Create