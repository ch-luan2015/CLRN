import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { loadAllAddresses, Address } from "app/resources/address";
import { PaymentItem } from "./Item";
import { useNavigation } from "@react-navigation/native";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";

import { Color } from "app/core/color";
import { PtButton, ButtonColor } from "../Button";
import { CartState } from "app/store/cart/types";
import { computePaymentOptions, PaymentMethod } from "app/resources/payment";

interface Props {
  cart: CartState;
}

export const Controller: React.FC<Props> = (props) => {
  const paymentOptions = computePaymentOptions(props.cart);
  const [selected, setSelected] = React.useState(PaymentMethod.COD);
  return (
    <View style={styles.main}>
      {paymentOptions.map((option) => (
        <PaymentItem
          style={styles.item}
          option={option}
          checked={selected === option.method}
          onPress={() => setSelected(option.method)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.White,
    flex: 1,
  },

  item: {
    marginBottom: SpaceSize.Size12,
  },

  list: {
    paddingBottom: SpaceSize.Size96,
    paddingHorizontal: SpaceSize.Size12,
  },

  left: {
    alignItems: "center",
    flexDirection: "row",
  },

  title: {
    ...TextStyle.Heading,
  },

  total: {
    ...TextStyle.Body,
    color: Color.Grey8,
  },

  helper: {
    alignItems: "center",
    paddingVertical: SpaceSize.Size32,
  },

  heading: {
    alignItems: "center",
    paddingTop: SpaceSize.Size12,
  },
});
