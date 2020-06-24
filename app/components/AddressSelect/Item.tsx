import * as React from "react";
import { View, StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import { Button } from "react-native-elements";
import { Address } from "app/resources/address";
import { SpaceSize } from "app/core/size";
import { Color } from "app/core/color";
import { TextStyle } from "app/core/font";

interface Props {
  address: Address;
  checked: boolean;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

export const AddressItem: React.FC<Props> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      ViewComponent={
        ((() => (
          <View
            style={[
              styles.main,
              props.checked ? styles.checked : styles.unchecked,
              props.style,
            ]}
          >
            <View style={styles.info}>
              {props.address.recipient && props.address.recipient.length && (
                <Text style={styles.recipient}>
                  {props.address.recipient} ·{" "}
                </Text>
              )}
              <Text style={styles.phone}>{props.address.phone}</Text>
            </View>
            <Text style={styles.fullAddress}>
              Địa chỉ: {props.address.ward}, {props.address.district},{" "}
              {props.address.province}
            </Text>
          </View>
        )) as unknown) as React.ComponentClass
      }
    />
  );
};

const styles = StyleSheet.create({
  checked: {
    borderColor: Color.Primary6,
    backgroundColor: Color.Primary1,
  },
  unchecked: {
    borderColor: Color.Grey2,
  },
  main: {
    padding: SpaceSize.Size12,
    borderWidth: 1,
    borderRadius: 5,
  },
  info: {
    flexDirection: "row",
  },
  recipient: {
    ...TextStyle.Body,
  },
  phone: {
    ...TextStyle.Body,
  },
  fullAddress: {
    ...TextStyle.Subhead,
    color: Color.Grey8,
  },
});
