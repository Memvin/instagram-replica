import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen 
        name="sign-in" 
        options={{ 
          headerShown: true,
          title: 'Sign In',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ 
          headerShown: true,
          title: 'Create Account',
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
}