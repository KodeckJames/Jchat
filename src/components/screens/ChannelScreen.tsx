import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from '@/utils'
import { InstaQLEntity } from '@instantdb/react-native'
import { AppSchema } from '@/instant.schema'

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

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <FlatList
      data={data.messages}
      keyExtractor={({ id }) => id}
      contentContainerStyle={{ padding: 16, gap: 16 }}
      renderItem={({ item }) => <MessageContainer {...item} />}
    />
  )
}

const MessageContainer = ({
  content,
  id,
  timestamp,
  author,
}: MessageContainerProps) => {
  const { id: userId } = db.useUser();
  const isMe = author?.user?.id === userId;
  return (
    <View className={`p-4 border rounded-lg ${isMe ? 'ml-auto bg-purple-600' : ' bg-yellow-500'}`}>
      <Text>{content}</Text>
      <Text>{author?.displayName}</Text>
      <Text>{timestamp.toLocaleString()}</Text>
    </View>
  )
}
