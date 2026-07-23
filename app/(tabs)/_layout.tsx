import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // insets.bottom is the home-indicator strip (0 on older, ~34 on notched
  // devices). Pad above it so labels clear the bar without crowding the
  // swipe-up indicator.
  const BAR_PADDING_TOP = 10;
  const BAR_PADDING_BOTTOM = 8;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#18181b",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarLabelStyle: { fontSize: 11, fontFamily: "Outfit_500Medium" },
        tabBarItemStyle: { paddingTop: 4 },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0.5,
          borderTopColor: "#e4e4e7",
          height: 56 + insets.bottom + BAR_PADDING_TOP,
          paddingTop: BAR_PADDING_TOP,
          paddingBottom: insets.bottom + BAR_PADDING_BOTTOM,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
