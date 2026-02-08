import { useEffect, useMemo, useRef, useState } from "react";
import { addFavorite, removeFavorite, isFavorited } from "../../lib/favorites";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  Modal,
  StyleSheet,
  
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

const API_BASE_URL = "https://overfunctioning-noncondensable-torie.ngrok-free.dev";
const { height: SCREEN_H } = Dimensions.get("window");

const SHEET_EXPANDED_Y = 50;              
const SHEET_COLLAPSED_Y = SCREEN_H - 420;   



export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [manualBarcode, setManualBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
  const backdropOpacity = useRef(new Animated.Value(0)).current; 
  const ingredientTranslateY = useRef(new Animated.Value(40)).current; 
  const scanLocked = useMemo(() => Boolean(scannedBarcode) || loading, [scannedBarcode, loading]);
  const sheetY = useRef(new Animated.Value(SHEET_COLLAPSED_Y)).current;
  const sheetYValue = useRef(SHEET_COLLAPSED_Y);

  const [favorited, setFavorited] = useState(false);


  useEffect(() => {
    const id = sheetY.addListener(({ value }) => {
      sheetYValue.current = value;
    });
    return () => sheetY.removeListener(id);
  }, [sheetY]);

  useEffect(() => {
    if (permission && !permission.granted) requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
  if (!ingredientOpen) return;

  backdropOpacity.setValue(0);
  ingredientTranslateY.setValue(40);

  Animated.parallel([
    Animated.timing(backdropOpacity, {
      toValue: 1,
      duration: 140,
      useNativeDriver: true,
    }),
    Animated.timing(ingredientTranslateY, {
      toValue: 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start();
}, [ingredientOpen]);



  function snapTo(toY: number) {
    Animated.timing(sheetY, {
      toValue: toY,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, 
    }).start();
  }

function closeIngredientModal() {
  Animated.parallel([
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }),
    Animated.timing(ingredientTranslateY, {
      toValue: 40,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start(() => {
    setIngredientOpen(false);
    setSelectedIngredient(null);
  });
}



  function resetScanner() {
    setScannedBarcode(null);
    setData(null);
    setError(null);
    setLoading(false);
    setManualBarcode("");
    snapTo(SHEET_COLLAPSED_Y);
  }

  async function lookup(code: string) {
    const cleaned = String(code ?? "").replace(/\D/g, "");
    if (!cleaned) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/lookup/${encodeURIComponent(cleaned)}`);
      const json = await res.json();
      
      setData(json);
      if (!res.ok) {
        setError("Product not found in demo database.");
        snapTo(SHEET_COLLAPSED_Y);
      } else {
        const isFav = await isFavorited(json.product.barcode);
        setFavorited(isFav);
        snapTo(SHEET_EXPANDED_Y);
      }
    } catch (err: any) {
      setError("Could not reach Clarify API. Check tunnel or API_BASE_URL.");
      snapTo(SHEET_COLLAPSED_Y);
    } finally {
      setLoading(false);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_, gesture) => {
        const next = sheetYValue.current + gesture.dy;
        const clamped = Math.max(SHEET_EXPANDED_Y, Math.min(SHEET_COLLAPSED_Y, next));
        sheetY.setValue(clamped);
      },
      onPanResponderRelease: (_, gesture) => {
        const endY = sheetYValue.current;
        const midpoint = (SHEET_EXPANDED_Y + SHEET_COLLAPSED_Y) / 2;


        if (gesture.vy < -0.6) return snapTo(SHEET_EXPANDED_Y);
        if (gesture.vy > 0.6) return snapTo(SHEET_COLLAPSED_Y);

        snapTo(endY < midpoint ? SHEET_EXPANDED_Y : SHEET_COLLAPSED_Y);
      },
    })
  ).current;

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Camera permission needed</Text>
        <Pressable onPress={requestPermission} style={{ marginTop: 16, backgroundColor: "black", padding: 12, borderRadius: 16 }}>
          <Text style={{ color: "white" }}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Camera BG */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "upc_a", "qr", "code128"] }}
        onBarcodeScanned={(result) => {
          if (scanLocked) return;
          setScannedBarcode(result.data);
          lookup(result.data);
        }}
      />

      {/* Scan overlay box */}
      {!scannedBarcode && (
        <View style={styles.scanOverlay} pointerEvents="none">
          <View style={styles.scanFrame}>
            <Text style={{ color: "white", fontWeight: "800" }}>Align the barcode inside the frame</Text>
          </View>
          <Text style={{ marginTop: 10, color: "white", opacity: 0.85, fontSize: 12 }}>
            Hold steady • Good lighting helps
          </Text>
        </View>
      )}

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            top: sheetY,
          },
        ]}
      >
        {/* draggable header */}
        <View style={styles.sheetHandleArea}>
          {/* Header row */}
          <View style={styles.headerRow}>
                      <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>
              {scannedBarcode ? `Scanned: ${scannedBarcode}` : "Ready to scan"}
            </Text>

            {data?.found && (
              <Text style={{ marginTop: 4, opacity: 0.7 }}>
                {data.product.ingredients.filter((i: any) => !i.safe).length} flagged ingredients •{" "}
                {data.product.recalls.length} recalls
              </Text>
            )}

            {loading && <Text style={{ marginTop: 4, opacity: 0.6 }}>Looking up product…</Text>}
            {error && <Text style={{ marginTop: 4, opacity: 0.8 }}>{error}</Text>}
          </View>

            {scannedBarcode && (
              <Pressable onPress={resetScanner} style={styles.scanAgainBtn}>
                <Text style={{ color: "white", fontWeight: "800" }}>Scan Again</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Content */}
        <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 230, gap: 12 }}
        showsVerticalScrollIndicator={false}
        >
          {/* If no scan yet, show manual lookup */}
          {!scannedBarcode && (
            <View style={styles.card}>
              <Text style={{ fontWeight: "700" }}>Manual Barcode</Text>
              <TextInput
                value={manualBarcode}
                onChangeText={setManualBarcode}
                placeholder="enter barcode"
                keyboardType="number-pad"
                style={styles.input}
              />
              <Pressable
                onPress={() => {
                  if (loading) return;
                  setScannedBarcode(manualBarcode);
                  lookup(manualBarcode);
                }}
                style={styles.lookupBtn}
              >
                <Text style={{ color: "white", fontWeight: "800" }}>Lookup</Text>
              </Pressable>
            </View>
          )}

          {loading && <ActivityIndicator />}

          {data && data.found && (
            
  <View style={{ marginTop: 16, marginHorizontal: 16, padding: 16, backgroundColor: "white", borderRadius: 24 }}>
    <ProductImage uri={data.product.imageUrl} />
    <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 4 , paddingTop:12}}>{data.product.name}</Text>
    <Text style={{ opacity: 0.6 }}>{data.product.brand} • {data.product.category}</Text>

    <Pressable
    onPress={async () => {
    const p = data.product;
    if (!favorited) {
      await addFavorite({
        barcode: p.barcode,
        name: p.name,
        brand: p.brand,
        category: p.category,
        imageUrl: p.imageUrl,
        safetyScore: p.safetyScore,
      });
      setFavorited(true);
    } else {
      await removeFavorite(p.barcode);
      setFavorited(false);
    }
  }}
  style={{
    marginTop: 12,
    alignSelf: "center",              
    flexDirection: "row",             
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    minWidth: 200,                   
  }}
>

  {!favorited && (
    <Ionicons
      name="bookmark"
      size={15}
      color="white"
    />
  )}

  <Text style={{ color: "white", fontWeight: "900" }}>
    {favorited ? "Saved ✓" : "Save to Favorites"}
  </Text>
</Pressable>



    {/* Score row */}
    {(() => {
  const total = data.product.ingredients.length;
  const flagged = data.product.ingredients.filter((i: any) => !i.safe).length;

  return (
    <View style={{ marginTop: 12 }}>
      <SafetyMeter
        score={data.product.safetyScore}
        flaggedCount={flagged}
        totalCount={total}
      />
    </View>
  );
})()}


    <Text style={{ marginTop: 12 }}>{data.product.description}</Text>

    {/* Ingredients */}
{(() => {
  const all = data.product.ingredients || [];
  const flagged = all.filter((i: any) => !i.safe);
  const clean = all.filter((i: any) => i.safe);

  const Chip = ({ ing }: { ing: any }) => {
    const bg = ing.safe ? "#ECFDF5" : "#FEF2F2";
    const border = ing.safe ? "#A7F3D0" : "#FECACA";
    const text = ing.safe ? "#065F46" : "#991B1B";

    return (
      <Pressable
        onPress={() => {
          setSelectedIngredient(ing);
          setIngredientOpen(true);
        }}
        style={{
          backgroundColor: bg,
          borderColor: border,
          borderWidth: 1,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 999,
          marginRight: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: text, fontWeight: "700" }}>{ing.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={{ marginTop: 14 }}>
      <Text style={{ fontWeight: "900", marginBottom: 8 }}>
        Flagged Ingredients ({flagged.length})
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {flagged.length === 0 ? (
          <Text style={{ opacity: 0.7 }}>No flagged ingredients in this demo.</Text>
        ) : (
          flagged.map((ing: any, idx: number) => <Chip key={`f-${idx}`} ing={ing} />)
        )}
      </View>

      <Text style={{ fontWeight: "900", marginTop: 14, marginBottom: 8 }}>
        Clean Ingredients ({clean.length})
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {clean.map((ing: any, idx: number) => <Chip key={`c-${idx}`} ing={ing} />)}
      </View>

      <Text style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
        Tap any ingredient to learn why it’s flagged or what it does.
      </Text>
    </View>
  );
})()}


    {/* Recalls */}
    <View style={{ marginTop: 14 }}>
      <Text style={{ fontWeight: "800" }}>Recalls</Text>
      {data.product.recalls.length === 0 ? (
        <Text style={{ marginTop: 6, opacity: 0.7 }}>No recalls.</Text>
      ) : (
        data.product.recalls.map((r: any, i: number) => (
          <View key={i} style={{ marginTop: 8, padding: 12, borderRadius: 16, backgroundColor: "#FFF7ED" }}>
            <Text style={{ fontWeight: "800" }}>{r.date}</Text>
            <Text style={{ marginTop: 4 }}>{r.reason}</Text>
            <Text style={{ marginTop: 4, opacity: 0.7 }}>Source: {r.source}</Text>
          </View>
        ))
      )}
    </View>
  </View>
)}
          {/* If scanned but not found */}
          {scannedBarcode && !loading && (error || (data && !data.found)) && (
            <View style={styles.card}>
              <Text style={{ fontWeight: "800" }}>No match</Text>
              <Text style={{ marginTop: 6, opacity: 0.7 }}>
                Try manually typing another barcode or tap “Scan Again”.
              </Text>
            </View>
          )}
        </Animated.ScrollView>
      </Animated.View>
      <Modal
  visible={ingredientOpen}
  transparent
  animationType="none"
  presentationStyle="overFullScreen"
  onRequestClose={closeIngredientModal}
>
  <View style={{ flex: 1, justifyContent: "flex-end" }}>

    {/* Backdrop - fades */}
    <Pressable
      onPress={closeIngredientModal}
      style={StyleSheet.absoluteFillObject}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          opacity: backdropOpacity, // <-- animated fade
        }}
      />
    </Pressable>

    {/* white sheet — slides */}
    <Animated.View
      style={{
        backgroundColor: "white",
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 16,
        transform: [{ translateY: ingredientTranslateY }], // <-- slide effect
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <View style={{ width: 44, height: 5, borderRadius: 999, backgroundColor: "#E5E7EB" }} />
      </View>

      <Text style={{ fontSize: 18, fontWeight: "900" }}>
        {selectedIngredient?.name ?? "Ingredient"}
      </Text>

      <View style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 14,
        backgroundColor: selectedIngredient?.safe ? "#ECFDF5" : "#FEF2F2"
      }}>
        <Text style={{
          fontWeight: "800",
          color: selectedIngredient?.safe ? "#065F46" : "#991B1B"
        }}>
          {selectedIngredient?.safe ? "Clean / Low concern" : "Flagged / Use caution"}
        </Text>
      </View>

      <Text style={{ marginTop: 12, opacity: 0.85, lineHeight: 20 }}>
        {selectedIngredient?.concern
          ? selectedIngredient.concern
          : "No additional notes for this ingredient in the demo dataset yet."}
      </Text>

      <Pressable
        onPress={closeIngredientModal}
        style={{
          marginTop: 16,
          backgroundColor: "black",
          padding: 12,
          borderRadius: 14,
          alignItems: "center"
        }} 
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Close</Text>
      </Pressable>
    </Animated.View>
  </View>
</Modal>
    </View>
  );
}



function ProductImage({ uri }: { uri?: string }) {
  if (!uri) {
    return (
      <View style={[styles.imageWrap, styles.imagePlaceholder]}>
        <Text style={{ opacity: 0.6, fontWeight: "700" }}>No image</Text>
      </View>
    );
  }

  return (
    <View style={styles.imageWrap}>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

function scoreMeta(score: number) {
  if (score >= 85) {
    return {
      label: "Clean",
      ring: "#16A34A",       
      bg: "#ECFDF5",         
      text: "#166534",
    };
  }
  if (score >= 65) {
    return {
      label: "Moderate",
      ring: "#F59E0B",       
      bg: "#FFFBEB",         
      text: "#92400E",
    };
  }
  return {
    label: "Caution",
    ring: "#EF4444",         
    bg: "#FEF2F2",           
    text: "#991B1B",
  };
}

function SafetyMeter({
  score,
  flaggedCount,
  totalCount,
}: {
  score: number; // 0-100
  flaggedCount: number;
  totalCount: number;
}) {
  const s = Math.max(0, Math.min(100, score));
  const meta = scoreMeta(s);


  const size = 52; 
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - s / 100);

  return (
    <View
      style={{
        backgroundColor: meta.bg,
        borderRadius: 18,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
      }}
    >
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {/* Track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(0,0,0,0.10)"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={meta.ring}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            rotation={-90}
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>

        {/* Score in the center */}
        <View
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          pointerEvents="none"
        >
          <Text style={{ fontWeight: "800", fontSize: 16, color: meta.text }}>{s}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "900", fontSize: 16, color: meta.text }}>{meta.label}</Text>
        <Text style={{ marginTop: 2, opacity: 0.7 }}>
          {flaggedCount} of {totalCount} ingredients flagged
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 150, 
  },
  scanFrame: {
    width: "82%",
    height: 170,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.95)",
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0, 
    height: SCREEN_H,
    backgroundColor: "#ebf0eb",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  sheetHandleArea: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "#D5E8D4",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handlePill: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D3D3D3",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scanAgainBtn: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
  },
  imageWrap: {
  width: "100%",
  aspectRatio: 16 / 9,
  borderRadius: 18,
  backgroundColor: "#F3F4F6",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
},
image: {
  width: "100%",
  height: "100%",
},
imagePlaceholder: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
},

  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 12,
    backgroundColor: "white",
  },
  lookupBtn: {
    marginTop: 12,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
});
