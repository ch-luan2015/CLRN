import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Button, colors } from "react-native-elements";
import { CartState } from "app/store/cart/types";
import { setCartItem, deleteCartItem } from "app/store/cart/actions";
import { Color } from "app/core/color";

import { Header } from "app/components/Header";
import { SpaceSize } from "app/core/size";
import { Item } from "./Item";

import { PtButton, ButtonColor } from "../Button";
import { useSafeArea } from "react-native-safe-area-context";
import { formatPrice } from "app/core/price";
import { getTotal } from "app/core/util";
import { TextStyle } from "app/core/font";
import { useNavigation } from "@react-navigation/native";

interface Props {
  cart: CartState;
  setCartItem: typeof setCartItem;
  deleteCartItem: typeof deleteCartItem;
}

export const Controller: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const checkOut = () => navigation.navigate("CheckOut");
  return (
    <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
      <ScrollView contentContainerStyle={[styles.list]}>
        {Object.values(props.cart.items).map((item) => (
          <Item
            key={item.product.id}
            setCartItem={props.setCartItem}
            deleteCartItem={props.deleteCartItem}
            item={item}
          />
        ))}

        <View style={styles.action}>
          <PtButton
            title="Đặt hàng"
            color={ButtonColor.Primary}
            onPress={checkOut}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  action: {
    padding: SpaceSize.Size12,
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

  main: {
    flex: 1,
    backgroundColor: Color.White,
  },

  list: {
    paddingBottom: SpaceSize.Size96,
  },
});
