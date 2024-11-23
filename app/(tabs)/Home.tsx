import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../Components/SearchInputs';
import Trending from '@/Components/Trending';
import EmptyState from '@/Components/EmptyState';
import { isLoading } from 'expo-font';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../Components/VideoCard'
const Home = () => {
  
  const [refresh, setRefresh] = useState(false)
  const {data:posts,loading,refetch}:any=useAppWrite(getAllPosts());
  const {posts:Latestdata,}:any=useAppWrite(getLatestPosts());




  const onrefresh=async ()=>{
    setRefresh(true)
    await refetch();
    setRefresh(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-col mb-6">
              <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
              <Text className="text-2xl font-psemibold text-white">JSMAstery</Text>
            </View>
            <View className="mt-1.5">
              <Image
                source={images.logoSmall}
                className="w-9 h-10 mb-5"
                resizeMode="contain"
              />
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-1">Latest Videos</Text>
            </View>
            <View className='mb-[4vh]'>
            <Trending posts={posts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first one to create"
          />
        )}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onrefresh}/> }
      />
    </SafeAreaView>
  );
};

export default Home;
