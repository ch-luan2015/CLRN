import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  Image,
  ImageStyle,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";

import { FontFamily, FontSize, TextStyle } from "../core/font";
import { Color } from "../core/color";
import { SpaceSize } from "../core/size";

interface Props {
  active?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  large?: boolean;
  icon?: string;
  image?: string;
  prefix?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ToogleButton = (props: Props) => (
  <Button
    onPress={props.onPress}
    containerStyle={props.style}
    title={props.title}
    ViewComponent={
      ((() => (
        <View
          style={[
            styles.default.button,
            props.active ? styles.default.active : styles.default.inactive,
          ]}
        >
          {props.image && (
            <Image
              style={props.imageStyle}
              source={{ uri: props.image }}
              resizeMode="contain"
            />
          )}
          {props.icon && (
            <Icon
              type="material-community"
              color={styles.default.title.color}
              iconStyle={styles.default.iconContainer}
              name={props.icon}
              size={FontSize.Size18}
            />
          )}
          {props.prefix && (
            <Text style={styles.default.prefix}>{props.prefix}</Text>
          )}
          {props.title && (
            <Text style={styles.default.title}>{props.title}</Text>
          )}
        </View>
      )) as unknown) as React.ComponentClass
    }
    titleStyle={[
      styles.default.title,
      props.active ? styles.default.activeTitle : styles.default.inactiveTitle,
    ]}
    buttonStyle={[
      styles.default.button,
      props.active ? styles.default.active : styles.default.inactive,
    ]}
  />
);

const styles = {
  default: StyleSheet.create({
    iconContainer: {
      margin: 0,
    },

    prefix: {
      ...TextStyle.Subhead,
      textAlign: "center",
      color: Color.Grey8,
    },

    title: {
      ...TextStyle.Subhead,
      // fontFamily: FontFamily.IBMPlexSansRegular,
      color: Color.Grey9,
    },

    activeTitle: {},

    inactiveTitle: {
      // color: Color.Grey7,
    },

    button: {
      alignContent: "center",
      alignItems: "center",
      paddingHorizontal: SpaceSize.Size8,
      paddingVertical: SpaceSize.Size4,
      borderRadius: SpaceSize.Size6,
      borderWidth: 1,
      backgroundColor: null,
    },

    active: {
      borderColor: Color.Primary5,
      backgroundColor: Color.Primary1,
    },

    inactive: {
      borderColor: Color.Grey3,
      backgroundColor: Color.Grey0,
    },
  }),
};
