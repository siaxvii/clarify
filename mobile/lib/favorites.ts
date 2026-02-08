import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "clarify:favorites:v1";

export type Favorite = {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  imageUrl?: string;
  safetyScore?: number;
};

export async function getFavorites(): Promise<Favorite[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function isFavorited(barcode: string): Promise<boolean> {
  const favs = await getFavorites();
  return favs.some((f) => f.barcode === barcode);
}

export async function addFavorite(item: Favorite) {
  const favs = await getFavorites();
  const next = [item, ...favs.filter((f) => f.barcode !== item.barcode)];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export async function removeFavorite(barcode: string) {
  const favs = await getFavorites();
  const next = favs.filter((f) => f.barcode !== barcode);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
