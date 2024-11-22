import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'
import *  as Animatable from 'react-native-animatable'
interface trendingProps{
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

export const TrendingItem=({posts,activeItem}:any) => {
  console.log("🚀 ==> file: Trending.tsx:37 ==> TrendingItem component==> posts:", posts);
  console.log("trial trial trial")
  const [play,setPlay]=React.useState(false)
  return(
    <Animatable.View 
    className='mr-5'
    animation={activeItem[0] === activeItem[0] ? zoomIn :zoomOut}
    duration={500}
    >
      {
        play?(
          <Text className='text-white '>Playing</Text>
        ):(
          <TouchableOpacity className='relative justify-center items-center ' activeOpacity={0.7} onPress={()=>setPlay(!play)}>
            <ImageBackground
            source={{ uri: posts.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            />
              <Text className='text-lg font-bold text-white '>{posts.title}</Text>
          </TouchableOpacity>
        )
      }
    </Animatable.View>
   
  )
}

const Trending :React.FC<{posts:trendingProps[]}> = ({posts}) => {

  const [activeItem,setActiveItem]=React.useState([0])
  return (
    <FlatList
    data={posts}
    keyExtractor={(item)=>item.video}
    renderItem={({item})=>(<TrendingItem  posts={item} activeItem={activeItem}/> )}
    horizontal
 
    >


    </FlatList>
  )
}

export default Trending