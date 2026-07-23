import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthGate } from "@/components/AuthGate";
import { db } from "@/lib/db";

// Placeholder until we wire this to the signed-in user.
const USERNAME = "Unseenmeli";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-baseline gap-2">
      {/* Fixed width so every label starts at the same x, whatever the count. */}
      <Text
        className="text-right text-lg font-outfit-semibold text-zinc-900"
        style={{ width: 28 }}
      >
        {value}
      </Text>
      <Text className="text-lg text-zinc-900 font-outfit">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <AuthGate>
      {() => (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-6 pt-4">
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => {
                  // TODO: account switcher / menu
                }}
                accessibilityRole="button"
                className="flex-row items-center gap-2 active:opacity-60"
              >
                <Text className="text-3xl font-outfit-semibold tracking-tight text-zinc-900">
                  {USERNAME}
                </Text>
                <Feather name="chevron-down" size={22} color="#18181b" />
              </Pressable>

              <Pressable
                onPress={() => {
                  // TODO: settings screen
                }}
                accessibilityRole="button"
                accessibilityLabel="Settings"
                hitSlop={8}
                className="active:opacity-60"
              >
                <Feather name="settings" size={24} color="#18181b" />
              </Pressable>
            </View>

            <View className="mt-5 flex-row items-center justify-between">
              {/* overflow-hidden clips the square image into the circle. */}
              <View className="h-44 w-44 overflow-hidden rounded-full bg-zinc-100">
                <Image
                  source={require("../../assets/davitasi.jpeg")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  accessibilityLabel={`${USERNAME} profile photo`}
                />
              </View>

              <View className="items-start gap-7">
                <Stat label="Connections" value="0" />
                <Stat label="Pictures" value="0" />
                <Stat label="Streak" value="0" />
              </View>
            </View>

            <Pressable
              onPress={() => db.auth.signOut()}
              className="mt-8 items-center rounded-xl border border-zinc-300 px-4 py-3.5 active:opacity-70"
            >
              <Text className="text-base font-outfit-medium text-zinc-900">
                Sign out
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </AuthGate>
  );
}
