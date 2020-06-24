import * as React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Color } from "app/core/color";
import { AddressSelect } from "app/components/AddressSelect";
import { PaymentSelect } from "app/components/PaymentSelect";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";
import { Button, colors } from "react-native-elements";

interface Props {
  token: string;
}

export const Controller: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  if (!props.token) {
    navigation.navigate("Login");
    return null;
  }

  navigation.setOptions({
    headerRight: () => (
      <Button
        type="clear"
        title="Đặt hàng"
        titleStyle={[TextStyle.Subhead, { color: colors.primary }]}
      />
    ),
  });

  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.list}>
      <Text style={[TextStyle.Body, { marginBottom: SpaceSize.Size8 }]}>
        Chọn địa chỉ giao hàng
      </Text>
      <View style={{ marginBottom: SpaceSize.Size12 }}>
        <AddressSelect />
      </View>

      <Text style={[TextStyle.Body, { marginBottom: SpaceSize.Size8 }]}>
        Chọn hình thức thanh toán
      </Text>
      <PaymentSelect />
    </ScrollView>
  );
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
