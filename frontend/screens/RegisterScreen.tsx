import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) Alert.alert('Erreur', error.message)
    else Alert.alert('Succès', 'Vérifie ton email pour confirmer ton compte.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 }
})
