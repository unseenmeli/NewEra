import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthGate } from "@/components/AuthGate";
import { db } from "@/lib/db";

export default function ProfileScreen() {
  return (
    <AuthGate>
      {(user) => (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-6 pt-4">
            <Text className="text-3xl font-semibold tracking-tight text-zinc-900">
              Profile
            </Text>

            <View className="mt-6 gap-4">
              <Field label="Email" value={user.email ?? "—"} />
              <Field label="User ID" value={user.id} mono />
            </View>

            <Pressable
              onPress={() => db.auth.signOut()}
              className="mt-8 items-center rounded-xl border border-zinc-300 px-4 py-3.5 active:opacity-70"
            >
              <Text className="text-base font-medium text-zinc-900">
                Sign out
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </AuthGate>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <View className="gap-1 border-b border-zinc-200 pb-3">
      <Text className="text-sm text-zinc-500">{label}</Text>
      <Text
        className={`text-base text-zinc-900 ${mono ? "font-mono text-xs" : ""}`}
        selectable
      >
        {value}
      </Text>
    </View>
  );
}
