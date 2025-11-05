import { Link } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instagram Clone</Text>
      <Text style={styles.subtitle}>Welcome to the app</Text>

      <View style={styles.buttonContainer}>
        <Link href="/(authScreens)/sign-in" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </Link>

        <Link href="/(authScreens)/sign-up" asChild>
          <Pressable style={styles.outlineButton}>
            <Text style={[styles.buttonText, styles.outlineButtonText]}>
              Sign Up
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    backgroundColor: "#0095f6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  outlineButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#0095f6",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  outlineButtonText: {
    color: "#0095f6",
  },
});
