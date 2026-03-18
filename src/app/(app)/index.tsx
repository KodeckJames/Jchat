import { View, Text, Button } from 'react-native'
import React from 'react'
import { db } from '@/utils'

export default function App() {
  const {} = db.useAuth()
  return (
    <View>
      <Text className=' text-xl text-blue-500'>Yellow</Text>
      <Button title="Sign Out" onPress={() => db.auth.signOut()} />
    </View>
  )
}
