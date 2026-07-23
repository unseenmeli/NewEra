import { Feather } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthGate } from "@/components/AuthGate";
import { Map } from "@/components/Map";

export default function HomeScreen() {
  return (
    <AuthGate>
      {() => (
        // Only the top edge is inset — the map runs off the bottom so the
        // tab bar crops it instead of leaving a gap.
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
          {/* Fixed height so resizing the logo never shifts the map below. */}
          <View className="-ml-6 pt-0" style={{ height: 88 }}>
            <Image
              source={require("../../assets/newera.png")}
              style={{ width: 240, height: 64 }}
              resizeMode="contain"
              accessibilityLabel="NewEra"
            />
          </View>

          {/* Bleeds ~16px past each side so the side rounding is cropped
              off-screen — only the top corners read as rounded. */}
          <View className="-mx-4 flex-1 overflow-hidden rounded-t-[66px]">
            <Map />

            {/* Inset from the right to clear the rounded corner and the
                ~16px of map that bleeds off-screen on each side. */}
            <Pressable
              onPress={() => {
                // TODO: full-screen map mode
              }}
              accessibilityRole="button"
              accessibilityLabel="Full screen map"
              className="absolute right-11 top-9 h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm active:opacity-70"
            >
              <Feather name="maximize-2" size={17} color="#18181b" />
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </AuthGate>
  );
}
