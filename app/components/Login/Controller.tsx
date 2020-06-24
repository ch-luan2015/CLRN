import * as React from "react";
import Icon from "react-native-vector-icons/Feather";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";

import { Color } from "app/core/color";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";

import { PtInput } from "app/components/PtInput";
import { PtButton, ButtonColor } from "app/components/Button";
import { login, User } from "app/resources/user";
import { setUser } from "app/store/user/actions";
import { UserState } from "app/store/user/types";
import { useNavigation } from "@react-navigation/native";
import { Header } from "app/components/Header";
import { Button } from "react-native-elements";

const IsPhoneValid = (value: string) => {
  return value.length >= 10;
};

interface Props {
  setUser: typeof setUser;
  user: UserState;
}

export const Controller: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  React.useEffect(() => {
    StatusBar.setBarStyle("light-content");
    return () => StatusBar.setBarStyle("dark-content");
  });

  const notify = () =>
    Alert.alert(
      "Số điện thoại chưa đúng",
      "Bạn vui lòng kiểm tra lại",
      [
        {
          text: "Đồng ý",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const submit = async () => {
    if (!IsPhoneValid(value)) {
      notify();
      return;
    }

    try {
      setLoading(true);
      const response = await login(value);
      props.setUser(response);
      navigation.goBack();
    } catch (error) {
      notify();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.safeAreaView]}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={TextStyle.LargeTitle}>Thông tin giao hàng</Text>
          <View style={styles.helper}>
            <Text style={TextStyle.Body}>Nhập số điện thoại</Text>
            <Text style={TextStyle.Body}>của bạn để nhận hàng</Text>
          </View>
        </View>

        <PtInput
          autoFocus
          type="phone-pad"
          valid={value.length >= 10 ? true : undefined}
          label="Số điện thoại"
          placeholder="Nhập số của bạn"
          value={value}
          onValueChange={setValue}
        />

        <PtButton
          loading={loading}
          onPress={submit}
          style={{ marginTop: SpaceSize.Size32 }}
          title="Đồng ý"
          color={ButtonColor.Primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.White,
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
    // paddingHorizontal: SpaceSize.Size24,
  },
});
