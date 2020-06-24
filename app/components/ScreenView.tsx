import * as React from "react";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { SpaceSize } from "app/core/size";

interface Props {
  style: StyleProp<ViewStyle>;
}

export const ScreenView: React.FC<Props> = (props) => {
  return <View style={[styles.main, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  main: {
    paddingTop: SpaceSize.Size64,
    position: "relative",
  },
});
