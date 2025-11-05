import { useAuth } from '@/src/hooks/useAuth';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, clearError } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      // Navigation after successful sign in
      router.replace('/(tabs)/feed');
    } catch (err) {
      // Error is already handled in the hook, so we can just log it here if needed
      console.log('Sign in error:', err);
    }
  };

  // Clear error when user starts typing
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) clearError();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (error) clearError();
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
        Sign In
      </Text>
      
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {error}
        </Text>
      )}
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8 }}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 20, borderRadius: 8 }}
      />
      
      <TouchableOpacity 
        onPress={handleSignIn}
        disabled={isLoading}
        style={{ 
          backgroundColor: isLoading ? '#ccc' : '#0095f6', 
          padding: 15, 
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
      
      <Link href="/(authScreens)/sign-up" asChild>
        <TouchableOpacity style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={{ color: '#0095f6' }}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}