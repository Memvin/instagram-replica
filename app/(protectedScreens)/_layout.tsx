import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          headerShown: true,
          title: 'Edit Profile',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="post-detail" 
        options={{ 
          headerShown: true,
          title: 'Post',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="contact" 
        options={{ 
          headerShown: true,
          title: 'Contact',
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
}