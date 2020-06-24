import { AsyncStorage } from "react-native";
const EXPIRED_DURATION = 7 * 24 * 3600 * 1000;

const isExpired = (createdAt: string) => {
  const expiredTime = new Date(createdAt).getTime() + EXPIRED_DURATION;
  const currentTime = new Date().getTime();
  if (currentTime > expiredTime) return true;
  return false;
};

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const { createdAt, state } = JSON.parse(serializedState);
    if (!createdAt || isExpired(createdAt) || !state) {
      return undefined;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: {}) => {
  try {
    AsyncStorage.setItem(
      "state",
      JSON.stringify({
        state,
        createdAt: new Date(),
      })
    );
  } catch {
    // ignore write errors
  }
};
