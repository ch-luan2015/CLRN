import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Button,
  InputAccessoryView,
  Alert,
} from "react-native";
import { Input, colors } from "react-native-elements";

import { Color } from "app/core/color";
import { TextStyle } from "app/core/font";
import { SpaceSize } from "app/core/size";

interface Props {
  value: number;
  setValue: (value: number) => void;
  style: StyleProp<ViewStyle>;
}

export const Quantity: React.FC<Props> = (props) => {
  const [text, setText] = React.useState((props.value || 0).toString());
  const refine = (value: number) => {
    if (Number.isNaN(value) || value < 1) return 1;
    if (value > 20) return 20;
    return value;
  };
  const setQuantity = (text: string) => {
    setText(text);
    const value = refine(Number(text));
    props.setValue(value);
  };
  const onBlur = () => {
    const value = refine(Number(text));
    props.setValue(value);
    setText(value.toString());
  };

  const inputAccessoryViewID = "helper";

  return (
    <View style={[props.style, styles.main]}>
      <Text style={[styles.sign, TextStyle.Body, { color: Color.Grey5 }]}>
        &times;
      </Text>
      <Input
        onBlur={onBlur}
        keyboardType="number-pad"
        value={text}
        inputStyle={styles.input}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        onChangeText={setQuantity}
        inputAccessoryViewID={inputAccessoryViewID}
      />

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.helper}>
          <Text style={styles.helperText}>
            Bạn có thể mua từ 1 đến 20 sản phẩm
          </Text>
        </View>
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: SpaceSize.Size64,
    paddingLeft: SpaceSize.Size12,
    // backgroundColor: Color.Grey1,
    borderWidth: 1,
    borderColor: Color.Grey1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: SpaceSize.Size4,
  },

  helper: {
    paddingVertical: SpaceSize.Size8,
    alignItems: "center",
    shadowOpacity: 0.16,
    backgroundColor: Color.Grey0,
    shadowColor: Color.Grey9,
    shadowRadius: SpaceSize.Size16,
  },

  helperText: {
    ...TextStyle.Subhead,
    color: Color.Grey9,
  },

  sign: {
    // borderWidth: 1,
  },

  input: {
    ...TextStyle.Callout,
  },

  container: {
    paddingLeft: SpaceSize.Size4,
  },

  inputContainer: {
    borderBottomWidth: 0,
  },

  button: {
    padding: SpaceSize.Size8,
  },
});
