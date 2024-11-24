import { View, Text } from 'react-native'
import React from 'react'

interface infoBoxProps{
    title:string ,
    containerStyles?:string,
    titleStyle?:string,
    subtitile?:string,

}

const InfoBox:React.FC<infoBoxProps> = (props) => {
  return (
    <View className={props.containerStyles}>
        <Text className={`text-white text-center font-psemibold ${props.titleStyle}`}>{props.title}</Text>
        <Text className='text-sm text-gray-100 text-center font-pregular'>{props.subtitile}</Text>
    </View>
  )
}

export default InfoBox