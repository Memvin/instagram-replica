import { useAuth } from '@/src/hooks/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Feed = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect after logout
      router.replace('/(screens)/welcome');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text>Feed</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
};

export default Feed;