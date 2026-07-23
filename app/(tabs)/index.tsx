import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthGate } from "@/components/AuthGate";

export default function HomeScreen() {
  return (
    <AuthGate>
      {(user) => (
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-6 pt-4">
            <Text className="text-3xl font-semibold tracking-tight text-zinc-900">
              Home
            </Text>
            <Text className="mt-2 text-base text-zinc-500">
              Signed in as {user.email ?? "guest"}.
            </Text>
          </View>
        </SafeAreaView>
      )}
    </AuthGate>
  );
}
