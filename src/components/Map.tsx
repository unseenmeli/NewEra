import MapView from "react-native-maps";
import { Platform, Text, View } from "react-native";

// Tbilisi, Georgia
const INITIAL_REGION = {
  latitude: 41.7151,
  longitude: 44.8271,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

/**
 * Full-bleed map. Apple Maps on iOS, Google Maps on Android.
 * Native module — needs a development build, not Expo Go.
 */
export function Map() {
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-100">
        <Text className="text-sm text-zinc-500">Map is unavailable on web.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={INITIAL_REGION}
      showsUserLocation
    />
  );
}
