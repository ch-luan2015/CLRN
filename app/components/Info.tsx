import * as React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { formatPrice } from "../core/price";
import { FontSize, FontFamily, TextStyle } from "../core/font";
import { Color } from "../core/color";
import { ProductOption } from "app/resources/product";

interface Props {
  name: string;
  price: number;
  options: ProductOption[];
  style: StyleProp<ViewStyle>;
}

export const Info = (props: Props) => (
  <View style={props.style}>
    <Text style={styles.name}>{props.name}</Text>
    <Text style={styles.price}>{formatPrice(props.price)}</Text>
    <View style={styles.options}>
      {props.options
        .filter((option) => option.is_none === false)
        .map((option, index) => (
          <View key={option.id} style={styles.option}>
            {index > 0 && <Text style={styles.optionText}> · </Text>}
            <Text style={styles.optionText}>{option.name}</Text>
          </View>
        ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  name: {
    ...TextStyle.Body,
    color: Color.Grey9,
  },

  price: {
    ...TextStyle.Title2,
    color: Color.Grey9,
  },

  options: {
    flexDirection: "row",
  },

  option: {
    flexDirection: "row",
  },

  optionText: {
    ...TextStyle.Subhead,
    color: Color.Grey7,
  },
});
