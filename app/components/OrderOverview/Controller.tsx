import * as React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Color } from "app/core/color";
import { AddressSelect } from "app/components/AddressSelect";
import { PaymentSelect } from "app/components/PaymentSelect";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";
import { ButtonColor, PtButton } from "app/components/Button";

interface Props {
  token: string;
}

export const Controller: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  if (!props.token) {
    navigation.navigate("Login");
    return;
  }

  return <View style={styles.main}></View>;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.White,
  },

  list: {
    backgroundColor: Color.White,
    paddingHorizontal: SpaceSize.Size12,
    paddingTop: SpaceSize.Size6,
    paddingBottom: SpaceSize.Size24,
  },
});
