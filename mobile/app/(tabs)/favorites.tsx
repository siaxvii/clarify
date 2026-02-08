import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { getFavorites, removeFavorite, Favorite } from "../../lib/favorites";

export default function FavoritesScreen() {
  const [items, setItems] = useState<Favorite[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const favs = await getFavorites();
        setItems(favs);
      })();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 140, backgroundColor: "#D5E8D4", flexGrow: 1 }}>
      <Text style={{ fontSize: 26, fontWeight: "900" }}>Favorites</Text>
      <Text style={{ marginTop: 6, opacity: 0.7 }}>Saved products you can revisit anytime.</Text>

      {items.length === 0 ? (
        <View style={{ marginTop: 20, padding: 16, backgroundColor: "white", borderRadius: 18 }}>
          <Text style={{ fontWeight: "800" }}>No favorites yet</Text>
          <Text style={{ marginTop: 6, opacity: 0.7 }}>Scan a product and tap “Save to Favorites”.</Text>
        </View>
      ) : (
        <View style={{ marginTop: 16, gap: 12 }}>
          {items.map((p) => (
            <View key={p.barcode} style={{ backgroundColor: "white", borderRadius: 18, padding: 14 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ width: 84, height: 84, borderRadius: 14, backgroundColor: "#F3F4F6", overflow: "hidden" }}>
                  {!!p.imageUrl && <Image source={{ uri: p.imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "900", fontSize: 16 }}>{p.name}</Text>
                  <Text style={{ marginTop: 2, opacity: 0.7 }}>{p.brand} • {p.category}</Text>
                  {typeof p.safetyScore === "number" && (
                    <Text style={{ marginTop: 6, fontWeight: "800" }}>Safety: {p.safetyScore}/100</Text>
                  )}
                </View>
              </View>

              <Pressable
                onPress={async () => {
                  const next = await removeFavorite(p.barcode);
                  setItems(next);
                }}
                style={{ marginTop: 12, backgroundColor: "#111827", padding: 10, borderRadius: 14, alignItems: "center" }}
              >
                <Text style={{ color: "white", fontWeight: "900" }}>Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}