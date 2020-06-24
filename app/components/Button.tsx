import * as React from "react";
import { StyleSheet, StyleProp, View, ViewStyle } from "react-native";
import { Button } from "react-native-elements";

import { Color } from "app/core/color";
import { TextStyle } from "app/core/font";
import Icon from "react-native-vector-icons/Feather";
import { SpaceSize } from "app/core/size";

export enum ButtonColor {
  Primary,
  Secondary,
}

interface Props {
  onPress?: () => void;
  small?: boolean;
  color: ButtonColor;
  type?: "full";
  loading?: boolean;
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: string;
}

export const PtButton = (props: Props) => {
  return (
    <Button
      onPress={props.onPress}
      style={props.style}
      title={props.title}
      buttonStyle={[
        {
          height: props.small ? SpaceSize.Size24 : SpaceSize.Size48,
          borderRadius: props.small ? SpaceSize.Size2 : SpaceSize.Size8,
        },

        styles.default.button,
        styles[props.color].button,
      ]}
      disabled={props.disabled || props.loading}
      loading={props.loading}
      loadingProps={{ color: Color.Grey8 }}
      disabledStyle={{ backgroundColor: Color.Grey1 }}
      disabledTitleStyle={{ color: Color.Grey5 }}
      // disabled
      titleStyle={[
        props.small ? TextStyle.Caption1 : TextStyle.Heading,
        styles[props.color].title,
      ]}
    />
  );
};

const styles = {
  default: StyleSheet.create({
    button: {
      margin: 0,
      paddingVertical: 0,
    },
  }),

  [ButtonColor.Primary]: StyleSheet.create({
    button: {
      backgroundColor: Color.Primary5,
    },

    title: {
      fontWeight: "600",
      color: Color.Grey9,
    },
  }),

  [ButtonColor.Secondary]: StyleSheet.create({
    button: {
      backgroundColor: Color.Grey3,
    },

    title: {
      color: Color.Grey8,
    },
  }),
};
