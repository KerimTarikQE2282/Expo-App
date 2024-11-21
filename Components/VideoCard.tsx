import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

interface Video{
  title:string,
  thumbnail:string,
  video:string
  creator:{
    UserName?:string,
    avatar?:string
  }
}



interface videoCardProps {
    video:Video,
    
}


const VideoCard:React.FC<videoCardProps> = ({video}) => {
console.log("🚀 ==> file: VideoCard.tsx:23 ==> video:", video);
const [play,setPlay]=React.useState(false);


  return (
    <View className='flex-col items-center px-4 relative bottom-20'>
      <View className='flex-row gap-3 items-start '>
        <View className='justify-center item-center flex-row flex-1 '>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
          <Image
          source={{ uri: video.creator?.avatar || 'default_avatar_url' }}
          style={{ width: 46, height: 46, borderRadius: 8 }}
          />
                  
            </View>
     
            <View className='justify-center flex-1 ml-3 gap-y-1'>
                  <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
                    {video.title}
                  </Text>
                  <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{video?.creator?.UserName}</Text>
                  </View> 
        </View>\
        <View className='pt-2'>
          <Image
            source={icons.menu}
            className='w-5 h-5 '
            resizeMode='contain'
            />
        </View>
      </View>
      {
        play?<Text>Playing</Text>: 
        <TouchableOpacity
        className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
        activeOpacity={0.7}
        onPress={()=>setPlay(!play)}
        >

          <Image
          source={{uri:video.thumbnail}}
          className='w-full h-full rounded-xl mt-10'
          resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-10 h-10 relative bottom-[13vh]'
            resizeMode='contain'
            />
        </TouchableOpacity>
      }
    </View>
  )
}

export default VideoCard