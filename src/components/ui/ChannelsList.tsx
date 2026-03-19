import { View, Text, ActivityIndicator, Pressable, Alert } from 'react-native'
import React from 'react'
import { db } from '@/utils'

export default function ChannelsList() {
  const { isLoading, error, data } = db.useQuery({
    channels: {},
  })

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={'blue'} />
  }

  if (error) {
    return <Text>Error...</Text>
  }

  return (
    <View className=" border-2 p-8 border-gray-400 m-2">
      <Text className=" font-bold text-2xl">Available Channels</Text>
      <View className=" mt-4">
        {data?.channels.map((channel) => {
          return (
            <Pressable
              key={channel.id}
              className=" p-1 bg-green-400 border rounded-lg"
              onPress={() =>
                Alert.alert(`Welcome to the ${channel.name} Channel `)
              }
            >
              <Text className=" font-semibold text-lg">{channel.name}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
