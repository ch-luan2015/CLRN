import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

import SizeM from "./SizeM";
import SizeL from "./SizeL";

export enum IconName {
  SIZE_M,
  SIZE_L,
}

interface Props {
  icon: IconName;
  style?: StyleProp<ViewStyle>;
}

export const Icon = (props: Props) => {
  const Element = {
    [IconName.SIZE_M]: SizeM,
    [IconName.SIZE_L]: SizeL,
  }[props.icon];
  return <Element style={props.style} />;
};
