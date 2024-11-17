import { View, Text,Image } from 'react-native'
import React from 'react'
import {Tabs,Redirect} from 'expo-router'
import {icons } from '../../constants'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <>
     <Image
     source={icon}
     resizeMode='contain'
     tintColor={color}
     className='w-5 h-5'
     />
     <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-2 w-[15vw]`} style={{color:color}}>
      {name}

     </Text>
    </>
  );
};




export default function _layout() {
  return (
    <>
    <Tabs
    screenOptions={{
      tabBarShowLabel:false,
      tabBarActiveTintColor:'#FFA001',
      tabBarInactiveTintColor:'#CDCDE0',
      tabBarStyle:{
     backgroundColor:'#161622',
     borderTopWidth:1,
     borderTopColor:'#232533',
     height:84     
      }
    }}
    >
        <Tabs.Screen
        name='Home'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
                <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
                name="Home"/>
            ) 

        }
            
        }
        />
        <Tabs.Screen
        name='BookMarks'
        options={{
            title:'BookMarks',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
                <TabIcon
                icon={icons.eye}
                color={color}
                focused={focused}
                name="Book Marks"/>
            ) 

        }
            
        }
        />
        <Tabs.Screen
        name='Create'
        options={{
            title:'Create',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
                <TabIcon
                icon={icons.plus}
                color={color}
                focused={focused}
                name="Create"/>
            ) 

        }
            
        }
        />
        <Tabs.Screen
        name='profile'
        options={{
            title:'profile',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
                <TabIcon
                icon={icons.profile}
                color={color}
                focused={focused}
                name="Profile"/>
            ) 

        }
            
        }
        />
    </Tabs>
    </>
  )
}