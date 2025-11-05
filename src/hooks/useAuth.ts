import { getFirebaseAuth } from '@/src/services/firebase';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';

// Types for our authentication system
interface AuthUser extends User {}
// interface AuthErrorType extends AuthError {}

interface UseAuthReturn {
  // State
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Clear error message
  const clearError = () => setError(null);

  // Authentication methods
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      const auth = getFirebaseAuth();
      //console.log(' Attempting to sign-in user with:', { email, password });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      const auth = getFirebaseAuth();
      // console.log('Attempting to create user with:', { email, displayName });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    try {
      if (!user) throw new Error('No user logged in');
      
      setIsLoading(true);
      clearError();
      await updateProfile(user, {
        displayName,
        photoURL: photoURL || null,
      });
      
      // Update local user state
      setUser({
        ...user,
        displayName,
        photoURL: photoURL || user.photoURL,
      });
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Auth state listener
  useEffect(() => {
    const auth = getFirebaseAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return {
    // State
    user,
    isLoading,
    isAuthenticated: !!user,
    
    // Methods
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    
    // Error handling
    error,
    clearError,
  };
}

// Helper function to convert Firebase error codes to user-friendly messages
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please try again later.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to perform this action.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}