import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import {Video,ResizeMode} from 'expo-av'
import { Heart } from 'lucide-react-native';
import { useGlobalContext } from '@/context/globalprovider';
import {LikeVideos} from '@/lib/appwrite'
interface VideoProp{
  title:string,
  thumbnail:string,
  video:string
  creator:{
    UserName?:string,
    avatar?:string
  }
}



interface videoCardProps {
    video:VideoProp,
    
}


const VideoCard:React.FC<videoCardProps> = ({video}) => {
  const [play,setPlay]=React.useState(false);
  const [liked,setLiked]=React.useState(false)
  const {user}=useGlobalContext()
  console.log("🚀 ==> file: VideoCard.tsx:29 ==> user:", user);

  const changeLiked=()=>{
    setLiked(!liked);
    LikeVideos(user?.$id,video?.$id)
  }
  

  return (
    <View className='flex-col items-center px-4 relative bottom-20 mt-10'>
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
        </View>
        <View className='pt-2'>
          {
            liked ?
            (<TouchableOpacity onPress={()=>changeLiked()} className='w-10 h-10'><Heart fill="red" strokeWidth={0} strokeOpacity={0}/></TouchableOpacity>) :
           ( <TouchableOpacity onPress={()=>changeLiked()} className='w-10 h-10'><Heart fill='#161622' strokeWidth={1}/></TouchableOpacity>)
          }
        
        </View>
      </View>
      {
        play?(
          <Video
       
          source={{ uri: video?.video  }}
          useNativeControls
          //fix the sources once ive upladed data 
            style={{ width: 400, height: 230, backgroundColor: 'black', borderRadius: 20 ,marginTop:15}}
             shouldPlay={true}
           onError={(error) => console.log('Video Error:', error)}
           resizeMode={ResizeMode.CONTAIN}
           onPlaybackStatusUpdate={(status:any)=>{
             if(status.didJustFinish){
               setPlay(false)
             }
           }}
         />
        ): 
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