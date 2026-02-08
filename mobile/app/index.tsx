import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/clarify-big-logo.png")}
          style={styles.logo}
        />

        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.push("/onboarding")}
        >
          <Text style={styles.primaryBtnText}>Get started</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.secondaryText}>Start scanning now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3fff0",
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 600,
  },
  tagline: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    color: "#143d1f",
  },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: "#143d1f",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16,
  },
  secondaryText: {
    marginTop: 14,
    fontWeight: "800",
    color: "#143d1f",
    opacity: 0.75,
  },
});
