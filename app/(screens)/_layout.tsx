import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Welcome'
          }} 
        />
        <Stack.Screen 
          name="splash" 
          options={{ 
            headerShown: false,
            title: 'Splash'
          }} 
        />
        <Stack.Screen 
          name="welcome" 
          options={{ 
            headerShown: false,
            title: 'Welcome'
          }} 
        />
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
            title: 'Sign Up',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="feed" 
          options={{ 
            headerShown: true,
            title: 'Feed',
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
          name="create-post" 
          options={{ 
            headerShown: true,
            title: 'Create Post',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: true,
            title: 'Profile',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="edit-profile" 
          options={{ 
            headerShown: true,
            title: 'Edit Profile',
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
    </GestureHandlerRootView>
  );
}