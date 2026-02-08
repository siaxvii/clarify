import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { products } from "../../lib/products"; 

const BRAND_GREEN = "#257015"; 

function normalize(s: string) {
  return (s ?? "").toLowerCase().trim();
}

export default function SearchScreen() {
  const [q, setQ] = useState("");

  // Turn your record into an array
  const allProducts = useMemo(() => Object.values(products), []);

  const results = useMemo(() => {
    const query = normalize(q);
    if (!query) return allProducts;

    return allProducts.filter((p) => {
      const hay = normalize(`${p.name} ${p.brand} ${p.category} ${p.barcode}`);
      return hay.includes(query);
    });
  }, [q, allProducts]);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Search catalog (name, brand, barcode)</Text>

      <View style={styles.searchBox}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Try: 'Burt', 'NYX', 'Champagne', '6676'..."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!q && (
          <Pressable onPress={() => setQ("")} style={styles.clearBtn}>
            <Text style={{ color: "white", fontWeight: "900" }}>×</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.barcode}
        contentContainerStyle={{ paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                router.push("/(tabs)");
              }}
              style={styles.card}
            >
              <View style={styles.row}>
                <View style={styles.thumb}>
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.thumbPlaceholder}>
                      <Text style={{ fontWeight: "800", color: "#6B7280" }}>No image</Text>
                    </View>
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.meta} numberOfLines={1}>
                    {item.brand} • {item.category}
                  </Text>

                  <View style={styles.pillRow}>
                    <View
                      style={[
                        styles.pill,
                        { backgroundColor: item.safetyScore >= 85 ? "#ECFDF5" : item.safetyScore >= 65 ? "#FFFBEB" : "#FEF2F2" },
                        { borderColor: item.safetyScore >= 85 ? "#A7F3D0" : item.safetyScore >= 65 ? "#FDE68A" : "#FECACA" },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: "900",
                          color: item.safetyScore >= 85 ? "#065F46" : item.safetyScore >= 65 ? "#92400E" : "#991B1B",
                        }}
                      >
                        {item.safetyScore}/100
                      </Text>
                    </View>

                    <Text style={styles.barcode}>Barcode: {item.barcode}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.ctaRow}>
                <Text style={{ color: BRAND_GREEN, fontWeight: "900" }}>
                  View in Scanner →
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#D5E8D4", padding: 16},
  title: { fontSize: 28, fontWeight: "900", color: "#111827" },
  subtitle: { marginTop: 6, color: "#374151", opacity: 0.8 },

  searchBox: {
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: { flex: 1, fontSize: 16, color: "#111827" },
  clearBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  thumb: { width: 64, height: 64, borderRadius: 14, overflow: "hidden", backgroundColor: "#F3F4F6" },
  thumbPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center" },

  name: { fontSize: 16, fontWeight: "900", color: "#111827" },
  meta: { marginTop: 2, color: "#6B7280", fontWeight: "700" },

  pillRow: { marginTop: 8, flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  barcode: { color: "#6B7280", fontWeight: "700" },

  ctaRow: { marginTop: 10, alignItems: "flex-end" },
});
