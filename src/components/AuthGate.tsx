import type { User } from "@instantdb/react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { db } from "@/lib/db";

/**
 * Renders children only for a signed-in user, otherwise redirects to /login.
 */
export function AuthGate({
  children,
}: {
  children: (user: User) => React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading, error, user } = db.useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-center text-red-600">{error.message}</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children(user)}</>;
}
