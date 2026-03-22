import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db, useProfile } from '@/utils'
import { id, InstaQLEntity } from '@instantdb/react-native'
import { AppSchema } from '@/instant.schema'
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller'
import { SymbolView } from 'expo-symbols'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ChannelScreenProps {
  channel: string
}
type Message = InstaQLEntity<AppSchema, 'messages'>
type Author = InstaQLEntity<AppSchema, '$users'>

interface MessageContainerProps {
  id: Message['id']
  content: Message['content']
  timestamp: Message['timestamp']
  author?: {
    id: string
    displayName: string
    user?: Author
  }
}

export function ChannelScreen({ channel }: ChannelScreenProps) {
  const { bottom } = useSafeAreaInsets()
  const [message, setMessage] = useState('')
  const { id: userId } = db.useUser()
  const { profile } = useProfile()

  if (!channel) {
    return <Text className=" text-red-600">No Channel!!!</Text>
  }
  const { data, isLoading, error } = db.useQuery({
    messages: {
      $: {
        where: { channel: channel as string },
        order: { timestamp: 'asc' },
      },
      author: {
        user: {},
      },
    },
  })

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={'blue'} />
  }

  const handleSendMessage = () => {
    setMessage('')
    Keyboard.dismiss()
    const messageId = id()
    const messageTx = db.tx.messages[messageId]
      .create({
        content: message,
        timestamp: Date.now(),
      })
      .link({ author: profile?.id })
      .link({ channel: channel })
    db.transact(messageTx)
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <>
      <FlatList
        data={data.messages}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => <MessageContainer {...item} />}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
        <View className=" flex flex-row items-center px-4 gap-2">
          <TextInput
            className="rounded-full p-2 text-black flex-1"
            placeholderTextColor={'grey'}
            placeholder="Chat..."
            keyboardType="default"
            onSubmitEditing={handleSendMessage}
            autoFocus
            multiline
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <Pressable
            onPress={handleSendMessage}
            className=" bg-purple-300 rounded-xl p-1"
          >
            <SymbolView
              name={{
                ios: 'arrow.up',
                android: 'arrow_upward',
              }}
              size={30}
              tintColor={'blue'}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

const MessageContainer = ({
  content,
  id,
  timestamp,
  author,
}: MessageContainerProps) => {
  const { id: userId } = db.useUser()
  const isMe = author?.user?.id === userId
  return (
    <View
      className={`p-4 border rounded-lg ${isMe ? 'ml-auto bg-purple-600' : ' bg-yellow-500'}`}
    >
      <Text>{content}</Text>
      <Text>{author?.displayName}</Text>
      <Text>{timestamp.toLocaleString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
})
