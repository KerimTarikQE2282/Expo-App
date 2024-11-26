import { View, Text, TextStyle, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
interface FormFieldProps {
  title:string,
  value:string,
  onChange:(e:string) => void,
  otherStyles?:string,
  placeholder:string
  keyBoardType?:string

}



const formField:React.FC<FormFieldProps> = ({title,value,onChange,otherStyles,keyBoardType,placeholder,...props}) => {
  const [showPassword,setShowPassword]=React.useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className=' text-gray-100 font-pmedium mb-2 text-lg'>{title}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary  flex-row'>
      <TextInput
      className='flex-1 text-white font-psemibold text-base '
      value={value}
      placeholder={placeholder}
      placeholderTextColor='#7b7b8b'
      onChangeText={onChange}
      secureTextEntry={title==='Password' && !showPassword}
      />
      {title === 'Password' && (
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
          <Image 
          source={!showPassword? icons.eyeHide : icons.eye}
          className='w-6 h-6 mt-5'
          resizeMode='contain'
          
          />
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}

export default formField