import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";

import { UserState } from "app/store/user/types";
import { useNavigation } from "@react-navigation/native";
import { AddressInput } from "./Input";
import { Color } from "app/core/color";

interface Props {
  userState: UserState;
}

export const Controller: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  if (props.userState.info === null) {
    navigation.navigate("Login");
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={TextStyle.LargeTitle}>Chào bạn</Text>
            <View style={styles.helper}>
              <Text style={TextStyle.Body}>Hãy nhập địa chỉ</Text>
              <Text style={TextStyle.Body}>dùng để nhận hàng</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <AddressInput user={props.userState.info} />
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: "stretch",
    backgroundColor: Color.White,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    width: "100%",
  },

  helper: {
    alignItems: "center",
    paddingVertical: SpaceSize.Size32,
  },

  heading: {
    alignItems: "center",
    paddingTop: SpaceSize.Size32,
  },

  container: {
    paddingHorizontal: SpaceSize.Size24,
  },
});
