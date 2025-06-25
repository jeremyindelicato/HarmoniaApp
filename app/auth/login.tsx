import * as Google from 'expo-auth-session/providers/google'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../frontend/lib/supabase'

WebBrowser.maybeCompleteAuthSession()

const { width, height } = Dimensions.get('window')

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Le hook est bien à l'intérieur du composant maintenant
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '59179194857-0gd2p632rr89c50t78v8i4bue93n56il.apps.googleusercontent.com',
    iosClientId: '59179194857-0gd2p632rr89c50t78v8i4bue93n56il.apps.googleusercontent.com',
    androidClientId: '59179194857-0gd2p632rr89c50t78v8i4bue93n56il.apps.googleusercontent.com',
    webClientId: '59179194857-0gd2p632rr89c50t78v8i4bue93n56il.apps.googleusercontent.com',
  })

  // 🔁 Rediriger automatiquement si déjà connecté
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) router.replace('/home')
    }
    checkSession()
  }, [])

  // ✅ Gérer la réponse OAuth (Google)
  useEffect(() => {
    if (response?.type === 'success') {
      supabase.auth.signInWithOAuth({ provider: 'google' })
    }
  }, [response])

  const handleLogin = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) Alert.alert('Erreur', error.message)
    else router.replace('/home')
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await promptAsync()
    setIsLoading(false)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        {/* Fond avec dégradé */}
        <LinearGradient
          colors={['#1a1a1a', '#000000', '#1a1a1a']}
          style={styles.backgroundGradient}
        />
        
        {/* Éléments décoratifs */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.redAccent} />
        
        {/* Contenu principal */}
        <View style={styles.contentContainer}>
          {/* Logo/Titre */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>LOGO</Text>
            </View>
            <Text style={styles.welcomeText}>Bienvenue</Text>
            <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
          </View>

          {/* Formulaire */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="votre@email.com"
                placeholderTextColor="#666"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#666"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Bouton de connexion principal */}
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#FF0000', '#CC0000', '#990000']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Bouton Google */}
            <TouchableOpacity
              style={[styles.googleButton, (!request || isLoading) && styles.buttonDisabled]}
              onPress={handleGoogleLogin}
              disabled={!request || isLoading}
            >
              <View style={styles.googleButtonContent}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleButtonText}>Continuer avec Google</Text>
              </View>
            </TouchableOpacity>

            {/* Lien vers inscription */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text style={styles.signupLink}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    top: -100,
    right: -100,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    bottom: -75,
    left: -75,
  },
  redAccent: {
    position: 'absolute',
    width: 4,
    height: height * 0.6,
    backgroundColor: '#FF0000',
    left: 0,
    top: height * 0.2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    minHeight: 50,
  },
  primaryButton: {
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 15,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    backgroundColor: '#4285F4',
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderRadius: 12,
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
})