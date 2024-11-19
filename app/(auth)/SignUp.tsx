import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../Components/FormField'
import CustomButton from '@/Components/CustomButton'
import { Link, router } from 'expo-router'
import {createUser} from '../../lib/appwrite'

const SignUp = () => {
  const [form,setForm]=React.useState({
    UserName:'',
    email:'',
    Password:''
  })
  const [isLoading,setIsLoading]=React.useState(false)
  const handleSubmit=async () => {
    if(!form.UserName || !form.email || !form.Password ){
    Alert.alert("Error",'please fill in all the fields')
    }
    setIsLoading(true)
      try {
        console.log(form)
         const result=await createUser(form.email,form.UserName,form.Password )
            //set result to global State
            router.replace('../(tabs)/Home')
      } catch (error:any) {
        Alert.alert("Error",error.message)
      }
      finally{
        setIsLoading(false)
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
    <Text className='text-2xl text-white font-semibold mt-10 font-psemibold '>Sign up to Auora</Text>

    <FormField
    title='Email'
    value={form.email}
    onChange={(e:string) => setForm({...form,email:e})}
    otherStyles="mt-7"
    keyBoardType='email-address'
    placeholder='enter your Email'
    />
     <FormField
    title='Username'
    value={form.UserName}
    onChange={(e:string) => setForm({...form,UserName:e})}
    otherStyles="mt-7"
    placeholder='enter your Username'
    />
       <FormField
    title='Password'
    value={form.Password}
    onChange={(e:string) => setForm({...form,Password:e})}
    otherStyles="mt-7"
    keyBoardType='password'
    placeholder='enter your Password'

    
    />
    <CustomButton color='secondary-200' title='Sign Up' handlepress={handleSubmit} 
    containedStyles='relative top-[7vh] w-[80vw]'
    isLoading={isLoading}
    />
    <View className='justify-center items-center p-5 flex-row gap-2'>
      <Text className='mt-[10vh] text-lg text-gray-100 ml-[5vw]'>
        Already have an Account?
      </Text>
<Link href="./SignIn" className='text-lg font-psemibold text-secondary-100 mt-[10vh]'  >
Sign In
</Link>
    </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp