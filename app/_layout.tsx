// app/_layout.tsx
import { Slot } from 'expo-router'
import React from 'react'
import { AuthProvider } from '../frontend/contexts/AuthContext'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
