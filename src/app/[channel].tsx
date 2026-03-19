import { View, Text } from 'react-native'
import React from 'react'
import { ChannelScreen } from '@/components/screens/ChannelScreen'
import { useLocalSearchParams } from 'expo-router'

export default function Channel() {
  const { channel } = useLocalSearchParams()

  if (!channel) {
    return <Text>Channel not Found!!!</Text>
  }

  return <ChannelScreen channel={channel as string} />
}
