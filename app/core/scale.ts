import { Dimensions, Platform, PixelRatio } from "react-native";

const window = Dimensions.get("window");
const scale = window.width / 400;

export function normalize(size: number) {
  const newSize = (size * scale) / window.fontScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
