import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { loadAllAddresses, Address } from "app/resources/address";
import { AddressItem } from "./Item";
import { useNavigation } from "@react-navigation/native";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";

import { Color } from "app/core/color";
import { PtButton, ButtonColor } from "../Button";

interface Props {
  token: string;
}

export const Controller: React.FC<Props> = (props) => {
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [selected, setSelected] = React.useState<number>();
  const navigation = useNavigation();

  React.useEffect(() => {
    const load = async () => {
      if (!props.token) {
        navigation.navigate("Login");
        return;
      }

      const addresses = await loadAllAddresses(props.token);
      setAddresses(addresses);
      if (addresses.length === 0) {
        navigation.navigate("AddressInput");
        return;
      } else {
        setSelected(addresses.length && addresses[0].id);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.main}>
      {addresses.map((address) => (
        <AddressItem
          style={styles.item}
          address={address}
          checked={selected === address.id}
          onPress={() => setSelected(address.id)}
        />
      ))}
      <PtButton
        color={ButtonColor.Secondary}
        title="Tạo địa chỉ mới"
        onPress={() => navigation.navigate("AddressInput")}
      />
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
