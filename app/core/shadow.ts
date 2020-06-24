import { StyleSheet } from "react-native";
import { Color } from "./color";

export const Shadow = StyleSheet.create({
  Dark: {
    shadowOpacity: 0.08,
    shadowColor: Color.Grey9,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  Light: {
    shadowOpacity: 0.08,
    shadowColor: Color.Grey9,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
