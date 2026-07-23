import { AppleMaps, GoogleMaps } from "expo-maps";
import { Platform, Text, View } from "react-native";

const INITIAL_CAMERA = {
  coordinates: { latitude: 37.7749, longitude: -122.4194 },
  zoom: 12,
};

/**
 * Full-bleed map. Apple Maps on iOS, Google Maps on Android.
 * Requires a development build — this native view is not in Expo Go.
 */
export function Map() {
  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={{ flex: 1 }}
        cameraPosition={INITIAL_CAMERA}
        properties={{ isMyLocationEnabled: true }}
      />
    );
  }

  if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={INITIAL_CAMERA}
        properties={{ isMyLocationEnabled: true }}
      />
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-zinc-100">
      <Text className="text-sm text-zinc-500">Map is unavailable on web.</Text>
    </View>
  );
}
