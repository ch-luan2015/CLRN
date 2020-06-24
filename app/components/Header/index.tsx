import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

import { BlurView } from "expo-blur";
import { SpaceSize } from "app/core/size";
import { useSafeArea } from "react-native-safe-area-context";
import { Color } from "app/core/color";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
  withSafeArea?: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const insets = useSafeArea();
  return (
    <BlurView style={[styles.main]} intensity={100} tint="default">
      <View
        style={[
          props.withSafeArea
            ? { paddingTop: insets.top }
            : { paddingTop: SpaceSize.Size8 },
        ]}
      >
        {props.left}
      </View>
      <View
        style={[
          styles.right,
          props.withSafeArea
            ? { paddingTop: insets.top }
            : { paddingTop: SpaceSize.Size8 },
        ]}
      >
        {props.right}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SpaceSize.Size12,
    paddingBottom: SpaceSize.Size4,
    backgroundColor: null,
  },
  right: {},
});
