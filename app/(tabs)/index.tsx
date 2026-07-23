import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthGate } from "@/components/AuthGate";
import { Map } from "@/components/Map";

export default function HomeScreen() {
  return (
    <AuthGate>
      {(user) => (
        // Only the top edge is inset — the map runs off the bottom so the
        // tab bar crops it instead of leaving a gap.
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
          <View className="px-6 pb-4 pt-2">
            <Text className="text-3xl font-semibold tracking-tight text-zinc-900">
              Home
            </Text>
            <Text className="mt-1 text-base text-zinc-500">
              Signed in as {user.email ?? "guest"}.
            </Text>
          </View>

          {/* Bleeds ~16px past each side so the side rounding is cropped
              off-screen — only the top corners read as rounded. */}
          <View className="-mx-4 flex-1 overflow-hidden rounded-t-[72px]">
            <Map />
          </View>
        </SafeAreaView>
      )}
    </AuthGate>
  );
}
