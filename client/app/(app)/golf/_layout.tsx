import { Stack } from "expo-router";

export default function GolfLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="courseInfo" options={{ headerShown: false }} />
      <Stack.Screen name="tournament" options={{ headerShown: false }} />
    </Stack>
  );
}
