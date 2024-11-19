import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../Components/FormField'
import CustomButton from '@/Components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'


const SignIn = () => {
  const [form,setForm]=React.useState({
    Email:'',
    Password:''
  })
  const [isLoading,setIsLoading]=React.useState(false)
  const handleSubmit=async () => {
    
    try {
      if(!form.Email|| !form.Password ){
        Alert.alert("Error","please provide both email and password")
      }
      const user=await signIn(form.Email,form.Password)
      if(!user){
        Alert.alert("please provide valid values")
      }
      router.replace('../(tabs)/Home')
    } catch (error:any) {
      
      Alert.alert("Error",error.message)

    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
    <ScrollView>
      <View className='w-full justify-center min-h-[90vh] px-4 my-6'>
    <Image
    source={images.logo}
    resizeMode='contain'
    className='w-[115px] h-[35px]'
    />
    <Text className='text-2xl text-white font-semibold mt-10 font-psemibold '>Sign In to Auora</Text>

    <FormField
    title='Email'
    value={form.Email}
    onChange={(e:string) => setForm({...form,Email:e})}
    otherStyles="mt-7"
    keyBoardType='email-address'
    placeholder='enter your Email'
    />
  
       <FormField
    title='Password'
    value={form.Password}
    onChange={(e:string) => setForm({...form,Password:e})}
    otherStyles="mt-7"
    keyBoardType='password'
    placeholder='enter your Password'

    
    />
    <CustomButton color='secondary-200' title='Sign In' handlepress={handleSubmit} 
    containedStyles='relative top-[7vh] w-[80vw]'
    isLoading={isLoading}
    />
    <View className='justify-center items-center p-5 flex-row gap-2'>
      <Text className='mt-[10vh] text-lg text-gray-100 ml-[5vw]'>
Dont have an account?      </Text>
<Link href="./SignUp" className='text-lg font-psemibold text-secondary-100 mt-[10vh]'  >
Sign Up
</Link>
    </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn