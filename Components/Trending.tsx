import { View, Text, FlatList } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'

const Trending = ({posts}:any) => {
  return (
    <FlatList
    data={posts}
    keyExtractor={(item)=>item.$id}
    renderItem={({item})=>(
        <Text className='text-3xl text-white'>{item.id}</Text>
    )}
    horizontal
    ListEmptyComponent={()=>(
        <EmptyState title="no videso found " subtitle="Be the first one to uplad a video"/>
      )}
    >


    </FlatList>
  )
}

export default Trending