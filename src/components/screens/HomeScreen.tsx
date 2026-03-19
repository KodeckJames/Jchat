import { View, Text, Button } from 'react-native'
import React from 'react'
import { db } from '@/utils'
import ChannelsList from '@/components/ui/ChannelsList'

export default function HomeScreen() {
  const { user } = db.useAuth()
  const { isGuest } = db.useUser()
  return (
    <View className=" min-h-screen">
      <Text className=' text-xl text-center p-4'>{isGuest ? `Hello Guest to JChat` : `Hello ${user?.email}, Welcome to JChat😊`}</Text>
      <ChannelsList />
      <View className=" absolute bottom-10 left-40">
        <Button title="Log Out" onPress={() => db.auth.signOut()} />
      </View>
    </View>
  )
}
