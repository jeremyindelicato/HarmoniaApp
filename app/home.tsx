// app/home.tsx
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { supabase } from '../frontend/lib/supabase'

export default function Home() {
  const router = useRouter()
  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/auth/login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur Harmonia 🎶</Text>
      <Button title="Se déconnecter" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
})
