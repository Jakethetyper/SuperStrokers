import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";

import { styles } from "../../styles/aust.styles";

export default function SignupScreen() {
  const { signup } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Start tracking your golf game</Text>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <TextInput
              placeholder="First name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />

            <TextInput
              placeholder="Last name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />

            <TextInput
              placeholder="Username"
              placeholderTextColor="#999"
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Button */}
          <Pressable
            style={styles.button}
            onPress={() =>
              signup(firstName, lastName, email, password, userName)
            }
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text style={styles.footerLink}>Log in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
