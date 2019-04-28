import { AsyncStorage } from "react-native";

const get = (key, callback) => {
  return AsyncStorage.getItem(key, callback);
};

const set = (key, value, callback) => {
  return AsyncStorage.setItem(key, value, callback);
};

const remove = (key, callback) => {
  return AsyncStorage.removeItem(key);
};

export default {
  get, set, remove
};