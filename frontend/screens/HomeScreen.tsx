import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur Harmonia 🎶</Text>
      <Button title="Se déconnecter" onPress={() => supabase.auth.signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 }
})
