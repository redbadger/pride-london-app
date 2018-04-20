// @flow
import { AsyncStorage } from "react-native";

const DATA_KEY = "@FavouritesStore:data";
type Favourites = Set<string>;

export const load = async () => {
  const data = await AsyncStorage.getItem(DATA_KEY);
  return new Set(JSON.parse(data));
};
export const save = async (data: Favourites) => {
  await AsyncStorage.setItem(
    DATA_KEY,
    JSON.stringify(Array.from(data.values()))
  );
};
export const fav = (data: Favourites, id: string): Favourites => data.add(id);
export const unFav = (data: Favourites, id: string): boolean => data.delete(id);
export const isFav = (data: Favourites, id: string): boolean => data.has(id);
