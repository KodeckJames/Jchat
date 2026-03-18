import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { db } from '@/utils'

export default function AuthScreen() {
  const [sentEmail, setSentEmail] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const { user } = db.useAuth()

  if (!sentEmail) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Let's log you in!</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button
          title="Send Code"
          onPress={() => {
            setSentEmail(email)
            db.auth.sendMagicCode({ email }).catch((err) => {
              Alert.alert('Uh oh', err.body?.message)
              setSentEmail('')
            })
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your code</Text>
      <Text>
        We sent an email to {sentEmail}. Check your email, and enter the code
        you see.
      </Text>
      <TextInput
        placeholder="123456..."
        value={code}
        onChangeText={setCode}
        style={styles.input}
      />
      <Button
        title="Verify Code"
        onPress={() => {
          db.auth
            .signInWithMagicCode({ email: sentEmail, code })
            .catch((err) => {
              Alert.alert('Uh oh', err.body?.message)
              setCode('')
            })
        }}
      />
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
