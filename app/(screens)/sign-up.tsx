import { FormInput } from '@/src/components/FormInput';
import { useAuth } from '@/src/hooks/useAuth';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp, error, clearError } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
    
    // Clear auth error when user starts typing
    if (error) clearError();
  };

  const validateForm = (): boolean => {
    const errors = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Display Name validation
    if (!formData.displayName.trim()) {
      errors.displayName = 'Please enter your display name';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Password validation
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password, formData.displayName);
      
      // Show success message and redirect
      Alert.alert(
        'Account Created',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(screens)/feed'),
          },
        ]
      );
    } catch (err: any) {
      // Error is already handled in the hook, but we can add additional handling here if we want
      console.log('Sign up error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
              Create Account
            </Text>
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
              Sign up to start sharing your photos and videos
            </Text>
          </View>

          {/* Auth Error Message */}
          {error && (
            <View style={{ 
              backgroundColor: '#ffebee', 
              padding: 12, 
              borderRadius: 8, 
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: '#f44336'
            }}>
              <Text style={{ color: '#d32f2f', textAlign: 'center' }}>
                {error}
              </Text>
            </View>
          )}

          {/* Form */}
          <View style={{ gap: 16 }}>
            {/* Display Name Input */}
            <FormInput
              label="Display Name"
              placeholder="Enter your display name"
              value={formData.displayName}
              onChangeText={(text) => handleInputChange('displayName', text)}
              autoCapitalize="words"
              autoComplete="name"
              editable={!isSubmitting}
              error={formErrors.displayName}
            />

            {/* Email Input */}
            <FormInput
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!isSubmitting}
              error={formErrors.email}
            />

            {/* Password Input */}
            <FormInput
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoComplete="new-password"
              editable={!isSubmitting}
              error={formErrors.password}
            />
            <Text style={{ fontSize: 12, color: '#666', marginTop: -8, marginBottom: 8 }}>
              Must be at least 6 characters long
            </Text>

            {/* Confirm Password Input */}
            <FormInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
              autoComplete="new-password"
              editable={!isSubmitting}
              error={formErrors.confirmPassword}
            />

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#ccc' : '#0095f6',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {isSubmitting && <ActivityIndicator size="small" color="#fff" />}
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Terms Notice */}
            <Text style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 8 }}>
              By signing up, you agree to our Terms and Privacy Policy
            </Text>
          </View>

          {/* Sign In Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
            <Text style={{ color: '#666', marginRight: 5 }}>
              Already have an account?
            </Text>
            <Link href="/(screens)/sign-in" asChild>
              <TouchableOpacity disabled={isSubmitting}>
                <Text style={{ color: '#0095f6', fontWeight: '600' }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}