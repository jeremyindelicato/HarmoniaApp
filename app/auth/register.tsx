// app/auth/register.tsx
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { supabase } from '../../frontend/lib/supabase'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) Alert.alert('Erreur', error.message)
    else {
      Alert.alert('Vérifie ton email pour confirmer ton compte.')
      router.replace('/auth/login')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
})
