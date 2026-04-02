// app/(app)/_layout.tsx
import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e3a8a", // deep blue
        tabBarInactiveTintColor: "#6b7280", // gray
        tabBarStyle: {
          backgroundColor: "#f9fafb", // light gray/white
          borderTopWidth: 0,
          elevation: 5,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          marginTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="golf"
        options={{
          title: "Golf",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="golf-course" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Rankings"
        options={{
          title: "Rankings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
