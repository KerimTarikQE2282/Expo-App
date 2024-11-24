import { View, Text, TextStyle, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'
interface SearchFieldProps {
  title:string,
  value:string,
  onChange:(e:string) => void,
  otherStyles?:string,
  placeholder:string
  keyBoardType?:string

}



const SearchField:React.FC<SearchFieldProps> = ({title,value,onChange,otherStyles,keyBoardType,placeholder,...props}) => {
  const pathname=usePathname();
  const [query,setQuery]=React.useState('');

  return (

      <View className='border border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary  flex-row space-x-4 py-5'>
      <TextInput
      className='text-base mt-0.5 text-white flex-1 font-pregular '
      value={query}
      placeholder='Search of a Video Topic'
      placeholderTextColor='#7b7b8b'
      onChangeText={e=>{setQuery(e)}}
      />
     <TouchableOpacity
      onPress={()=>{
        if(!query){
          return Alert.alert('Missin Query','please input some thing to search for ')
        }
        if(pathname.startsWith('/search'))router.setParams({query})
          else router.push(`/search/${query}`)
      }}
      className='w-[10vw] h-[4vh] rounded-lg px-5 '
      
     >
      <Image 
      source={icons.search}
      className='w-5 h-5 '
      resizeMode='contain'/>
     </TouchableOpacity>
      </View>
   
  )
}

export default SearchField