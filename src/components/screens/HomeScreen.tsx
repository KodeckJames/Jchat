import { View, Text, Button } from 'react-native'
import React from 'react'
import { db } from '@/utils'

export default function HomeScreen() {
  const { user } = db.useAuth()
  const { isGuest } = db.useUser()
  return (
    <View className=" min-h-screen">
      <Text>{isGuest ? `Hello Guest ` : `Hello ${user?.email}`}</Text>
      <View className=" absolute bottom-10 left-40">
        <Button title="Log Out" onPress={() => db.auth.signOut()} />
      </View>
    </View>
  )
}
