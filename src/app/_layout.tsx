import '../../global.css';
import { Stack } from 'expo-router'
import { db } from '@/utils'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  const { isLoading } = db.useAuth()
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'orange'} />
      </View>
    )
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar backgroundColor='orange' animated />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
