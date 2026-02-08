import { useState } from "react";
import { View, Text, Switch, Pressable, StyleSheet } from "react-native";

const BRAND_GREEN = "#2FBF71"; 

export default function ProfileScreen() {
  const [haptics, setHaptics] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Preferences for your Clarify account</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scanning</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Haptics</Text>
            <Text style={styles.rowSub}>Vibrate when a barcode is detected</Text>
          </View>
          <Switch
            value={haptics}
            onValueChange={setHaptics}
            trackColor={{ false: "#E5E7EB", true: "#BFF1D1" }}
            thumbColor={haptics ? BRAND_GREEN : "#9CA3AF"}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Save scan history</Text>
            <Text style={styles.rowSub}>Keep a local record of scanned barcodes</Text>
          </View>
          <Switch
            value={saveHistory}
            onValueChange={setSaveHistory}
            trackColor={{ false: "#E5E7EB", true: "#BFF1D1" }}
            thumbColor={saveHistory ? BRAND_GREEN : "#9CA3AF"}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Text style={styles.rowSub}>Reminder nudges about saved items</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#E5E7EB", true: "#BFF1D1" }}
            thumbColor={notifications ? BRAND_GREEN : "#9CA3AF"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: "900", color: "#111827" }}>Clarify</Text>
          <Text style={{ marginTop: 6, color: "#374151" }}>
            Clarify what’s in your skincare and cosmetics.
          </Text>

          <View style={{ marginTop: 12, gap: 10 }}>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Privacy policy</Text>
            </Pressable>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Data sources</Text>
            </Pressable>
            <Pressable style={[styles.btn, { borderColor: "#FECACA" }]}>
              <Text style={[styles.btnText, { color: "#991B1B" }]}>Clear local data</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#D5E8D4", padding: 16},
  title: { fontSize: 28, fontWeight: "900", color: "#111827" },
  subtitle: { marginTop: 6, color: "#374151", opacity: 0.8 },

  section: { marginTop: 16 },
  sectionTitle: { fontWeight: "900", marginBottom: 10, color: "#111827" },

  row: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  rowTitle: { fontWeight: "900", color: "#111827" },
  rowSub: { marginTop: 4, color: "#6B7280", fontWeight: "700" },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  btn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  btnText: { fontWeight: "900", color: "#111827", textAlign: "center" },
});
