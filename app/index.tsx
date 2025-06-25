// app/index.tsx
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/login')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ImageBackground
      source={require('../frontend/assets/images/theweekndhome.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Logo supprimé */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // logo supprimé
})
