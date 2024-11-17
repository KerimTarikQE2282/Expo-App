import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface propsStyle {
  title:string,
  handlepress:(e:any) => void,
  containedStyles?:string,
  testStyles?:string,
  isLoading?:boolean
  color:string
}


export default function CustomButton({title,handlepress,containedStyles,testStyles,isLoading,color}:propsStyle) {
  return (
    <TouchableOpacity 
    className={`bg-${color} rounded-xl p-4 py-5 relative bottom-[20vh]  ml-10 ${containedStyles} ${isLoading ? 'opacity-50' : ''}`}
    onPress={handlepress}
    activeOpacity={0.7}
    disabled={isLoading}

    >
      <Text className=" text-center text-primary font-psemibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}
