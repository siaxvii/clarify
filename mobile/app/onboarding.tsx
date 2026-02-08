import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Meet Clarify ✨</Text>
      <Text style={styles.subtitle}>Your clean, friendly way to decode skincare.</Text>

      {/* Feature Cards */}
      <View style={styles.card}>
        <Ionicons name="barcode-outline" size={28} color="#143d1f" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Scan anything</Text>
          <Text style={styles.cardText}>Instant ingredient + safety breakdowns.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="leaf-outline" size={28} color="#143d1f" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Know what’s inside</Text>
          <Text style={styles.cardText}>Clean vs flagged—made super simple.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="sparkles-outline" size={28} color="#143d1f" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Quick safety meter</Text>
          <Text style={styles.cardText}>A cute score ring for instant clarity.</Text>
        </View>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Primary Button */}
      <Pressable style={styles.primaryBtn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.primaryBtnText}>Start scanning</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
         <Text style={styles.secondaryText}>Back</Text>
       </Pressable>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5E8D4", // soft sage
    padding: 28,
    paddingTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#143d1f",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#143d1f",
    opacity: 0.7,
    marginBottom: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 22,
    padding: 18,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  cardTitle: {
    fontWeight: "900",
    fontSize: 16,
    color: "#143d1f",
  },

  cardText: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 18,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 999,
  },
  dotActive: {
    opacity: 1,
  },

  primaryBtn: {
    backgroundColor: "#143d1f",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },

  primaryBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16,
  },
  
  secondaryText: {
     textAlign: "center",
     fontWeight: "800",
     color: "#143d1f",
     opacity: 0.75,
     marginBottom: 40,
   },
});
