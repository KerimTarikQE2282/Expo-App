import { View, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants'
import useAppWrite from '@/lib/useAppWrite'
import {searchPosts} from '../../lib/appwrite'
import SearchVideoCard from '@/Components/SearchVideoCard'
import EmptyState from '@/Components/EmptyState'
const Search = () => {

  var Searchedquery=useLocalSearchParams();
  const [query,setquery]=React.useState(Searchedquery?.query || '');
  const {data:post,loading,refetch}=useAppWrite(searchPosts(query))


  React.useEffect(()=>{
  refetch()
  },[query])

  return (
    <SafeAreaView className='bg-primary h-full px-3'>
      <View className='mt-10 flex flex-col gap-3'>
      <Text className='text-xl text-white ml-5'>Search results </Text>
      <Text className='text-4xl text-white font-bold ml-5'> {query}</Text>
      </View>
      <View className='bg-black-100 h-[8vh] mt-10 w-[90vw] ml-5 rounded-xl text-white'> 
        <TextInput
        value={query}
        placeholder={Searchedquery.query}
        placeholderTextColor='#7b7b8b'
        onChangeText={e=>{setquery(e)}}
        className='relative top-7 left-6 text-2xl text-white font-bold'
        />

       <TouchableOpacity
       onPress={()=>{
        if(!query){
          return Alert.alert('missing query','please provide a query')
        }
        else{
          
          router.push(`/search/${query}`)
        }
       }
        
       }
       className='  relative left-[70vw] w-[15vw] h-[7vh] bottom-4'
       >

        <Image
        className=' w-5 h-5 relative left-[5vw] top-5'
        source={icons.search}
        />

       </TouchableOpacity>
      </View>
      <View >
     { 
      post?.length===0 ? 
      <EmptyState
      title="No Videos found"
      subtitle="Be the first one to create"
    />

      :
      
      <FlatList
      
      data={post}
      keyExtractor={(item:any)=>(item?.$id)}
      
        renderItem={({ item })=>
          (
            <SearchVideoCard video={item}/>
          )}

       
        >
      </FlatList>}
      </View>
    </SafeAreaView>
  )
}

export default Search