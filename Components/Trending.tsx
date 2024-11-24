import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'
import *  as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import {Video,ResizeMode} from 'expo-av'
interface trendingProps{
  $id:string
  title:string,
  thumbnail:string,
  video:string,
  creator:{
    UserName?:string,
    avatar?:string
  }


}

interface TrendingItemProps{
  activeItem:number[],
  posts:trendingProps
}
const zoomIn={
  0:{
    scale:0.9
  },
  1:{
    scale:1
  }

}
const zoomOut={
  0:{
    scale:1
  },
  1:{
    scale:0.9
  }

}

export const TrendingItem :React.FC<{posts:trendingProps,activeItem:trendingProps[]}>=({posts,activeItem}:any) => {
  const [play,setPlay]=React.useState(false)
  return(
    <Animatable.View 
    className='mr-5'
    animation={activeItem.item?.$id ===posts.$id ? zoomIn :zoomOut}
    duration={500}
    >
      {
        play?(
          <View className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg bg-black shadow-black/40'>
          <Video
                 //fix the sources once ive upladed data 

       source={{ uri: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' }}
       useNativeControls
         style={{ width: 300, height: 400, backgroundColor: 'black', borderRadius: 20,position:'relative',bottom:70  }}
          shouldPlay={true}
        onError={(error) => console.log('Video Error:', error)}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status:any)=>{
          if(status.didJustFinish){
            setPlay(false)
          }
        }}
      />
      </View>
          
        ):(


        
          <TouchableOpacity className='relative justify-center items-center ' activeOpacity={0.7} onPress={()=>setPlay(!play)}>
            <ImageBackground
            source={{ uri: posts.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            />
            <Image 
            source={icons.play}
            className='w-12 h-12 absolute '
            resizeMode='contain'
            />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
   
  )
}

const Trending :React.FC<{posts:trendingProps[]}> = ({posts}) => {

  const [activeItem,setActiveItem]=React.useState(posts[0])
  const ViewableItemsChange=({viewableItems}:any) => {
   
    if(viewableItems.length>0){
      setActiveItem(viewableItems[0])
    }
  }
  return (
    <FlatList
    data={posts}
    keyExtractor={(item)=>item?.$id}
    renderItem={({item})=>(<TrendingItem  posts={item} activeItem={activeItem}/> )}
    horizontal
    onViewableItemsChanged={ViewableItemsChange}
    viewabilityConfig={{
      itemVisiblePercentThreshold:40
    }}
    contentOffset={{x:0,y:0}}

    >


    </FlatList>
  )
}

export default Trending