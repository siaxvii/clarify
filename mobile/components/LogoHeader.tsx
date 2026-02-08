import { View, Image, Pressable } from "react-native";
import { router } from "expo-router";

const BRAND_BG = "#F3FFF0";   // your landing bg
const BRAND_GREEN = "#2FBF71"; // your logo green

export function LogoHeader() {
  return (
    <Pressable
      onPress={() => router.replace("/")} 
      style={{ flexDirection: "row", alignItems: "center" }}
      hitSlop={10}
    >
      <Image
        source={require("../assets/images/Clarify.png")} // <-- update this path
        style={{ width: 100, height: 100}}
        resizeMode="contain"
      />
    </Pressable>
  );
}
