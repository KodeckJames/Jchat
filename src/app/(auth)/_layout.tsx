import { Text, View } from 'react-native'
import { db } from '@/utils'
import { Redirect, Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <>
      <db.SignedOut>
        <Stack />
      </db.SignedOut>
      <db.SignedIn>
        <Redirect href="/(app)/index" />
      </db.SignedIn>
    </>
  )
}
