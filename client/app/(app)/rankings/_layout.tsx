import { Stack } from "expo-router";

export default function RankingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otherRankings" options={{ headerShown: false }} />
    </Stack>
  );
}
