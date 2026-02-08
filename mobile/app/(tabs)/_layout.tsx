
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LogoHeader } from "@/components/LogoHeader";

const BRAND_BG = "#D5E8D4";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <LogoHeader />,
        headerStyle: { backgroundColor: BRAND_BG },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#008000",
      }}
    >

      <Tabs.Screen name="landing" options={{ headerShown: false }} />
      <Tabs.Screen
        name="index"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
