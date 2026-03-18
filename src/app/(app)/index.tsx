import { View, Text, Button } from 'react-native'
import React from 'react'
import { db } from '@/utils'
import HomeScreen from '@/components/screens/HomeScreen'

export default function App() {
  const {} = db.useAuth()
  return (
    <HomeScreen/>
  )
}
